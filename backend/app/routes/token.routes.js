module.exports = (app) => {
    const token = require("../controllers/token.controller.js");

    var router = require("express").Router();

    // Create a new Token
    router.post("/", token.create);

    // Retrieve a single Token with id
    router.get("/:code", token.findOne);

    app.use("/api/token", router);
};
