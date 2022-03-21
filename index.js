const express = require("express");
const connectDB = require("./configs/db.js");
const router = require("./routes/router.js");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

connectDB();

router(app);

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
