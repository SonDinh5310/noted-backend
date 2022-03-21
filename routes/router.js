const userRouter = require("./userRoutes.js");

const router = (app) => {
    app.get("/", (req, res) => res.send("Hello World"));
    app.use("/api/user", userRouter);
};

module.exports = router;
