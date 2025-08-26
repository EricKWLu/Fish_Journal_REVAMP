import express from "express";
const app = express();
import cors from "cors";
const corsOptions = {
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"]
};

app.use(cors(corsOptions));

app.get("/api", (req, res) => {
    res.json({"test": "test1"});
});

app.listen(8080, () => {
    console.log("Server started on port 8080");
});
