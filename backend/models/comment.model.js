import { Schema } from "mongoose"
import mongoose from "mongoose"

const commentSchema = new Schema(
    {
        desc: {
            type:String,
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Comment", commentSchema);