const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:505",
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(
    express.urlencoded({ extended: true })
);

const databaseConnection = require("./app/models");
databaseConnection.mongoose
    .connect(databaseConnection.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch((err) => {
        console.log("Failed to connect to the database!", err);
        process.exit();
    });


app.get("/", (req, res) => {
    res.json({ message: "welcome to Electricity Token selling App" });
});

require("./app/routes/meter.routes")(app);
require("./app/routes/token.routes")(app);

module.exports = app;
