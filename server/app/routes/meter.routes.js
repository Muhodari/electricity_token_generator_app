module.exports = (app) => {
  const Meters = require("../controllers/meter.controller.js");

  var router = require("express").Router();

  router.post("/", Meters.create);
  router.post("/loadToken", Meters.loadToken);
  router.get("/:meter", Meters.findOne);
  router.get("/:meter/details", Meters.getMeterDetails);
  router.put("/:meter", Meters.update);
  router.delete("/:meter", Meters.delete);
  app.use("/api/meter", router);
};
