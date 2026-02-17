import { Schema } from "mongoose"
import mongoose from "mongoose"

const userSchema = new Schema(
    {
        clerkUserId: {
            type: String,
            required: true,
            unique: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        post: {
            type: Schema.Types.ObjectId,
            ref: "Post",            required: true,
        },
        username: {
            type:String,
            required: true,
            unique: true,
        },
        email: {
            type:String,
            required: true,
            unique: true,
        },
        img: {
            type:String,
        },
        savedPosts: {
            type: [String],
            default: [],
        },
    },
    { timestamps: true }
);

export default mongoose.model("User", userSchema);