module.exports = (app) => {
    const token = require("../controllers/token.controller.js");

    var router = require("express").Router();


    router.post("/", token.create);
    router.get("/:id", token.findOne);
    app.use("/api/token", router);
};
