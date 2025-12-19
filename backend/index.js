import express from "express"
import userRouter from "./routes/user.route.js"
import postRouter from "./routes/post.route.js"
import commentRouter from "./routes/comment.route.js"

const app = express()


app.use("/users", userRouter);
app.use("/comments", commentRouter);
app.use("/posts", postRouter);

app.listen(3000, () =>{
    console.log("Server is running")
})