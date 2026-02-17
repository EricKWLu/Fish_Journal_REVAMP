import User from "../models/user.model.js"
import Post from "../models/post.model.js"
import Comment from "../models/comment.model.js"
import { Webhook } from "svix";

export const clerkWebHook = async (req, res)=>{
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
        return res.status(500).json({ message: "Webhook secret needed" });
    }

    const payload = req.body.toString("utf8");
    const headers = req.headers;

    const wh = new Webhook(WEBHOOK_SECRET);
    let evt;
    try {
        console.log("raw body type:", typeof req.body, "isBuffer:", Buffer.isBuffer(req.body));

        evt = wh.verify(payload, headers);
    } catch (err) {
        return res.status(400).json({
            message: "Webhook verification failed",
        });
    }

    console.log(evt.data);

    if (evt.type === "user.created" || evt.type === "user.updated") {
        const primary =
            evt.data.email_addresses?.find(e => e.id === evt.data.primary_email_address_id)?.email_address;
        const email = primary ?? evt.data.email_addresses?.[0]?.email_address ?? null;

        await User.findOneAndUpdate(
            { clerkUserId: evt.data.id },
            {
            $set: {
                username: evt.data.username || email,
                email,
                img: evt.data.image_url || evt.data.profile_image_url,
            },
            $setOnInsert: { clerkUserId: evt.data.id },
            },
            { upsert: true, new: true }
        );

        console.log("Synced user");
    }


    if (evt.type === "user.deleted") {
        const deletedUser = await User.findOneAndDelete({ clerkUserId: evt.data.id });

        if (deletedUser) {
            await Promise.all([
            Post.deleteMany({ user: deletedUser._id }),
            Comment.deleteMany({ user: deletedUser._id }),
            ]);
        }

        console.log("Deleted user cleanup done");
    }


    return res.status(200).json({
        message: "Webhook received",
    });
}