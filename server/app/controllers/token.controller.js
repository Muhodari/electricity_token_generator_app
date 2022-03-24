const db = require("../models");
const { validateTokenPayload, Token } = require("../models/token.model");
const { Meter } = require("../models/meter.model");
const { v4: uuidv4 } = require("uuid");
const { getTokenExpirationDate } = require("../utils/imports");


// create token

exports.create = async (req, res) => {
  const { error } = validateTokenPayload(req.body);
  if (error) {
    res.status(400).send({ message: error.details[0].message });
    return;
  } else if (req.body.amount % 100)
    return res
      .status(400)
      .send({ message: "the mimimum amount is 100" });

  const meter = await Meter.findOne({ code: req.body.meter_number });

  if (!meter)
    return res.status(404).send({
      message: "Meter Not Found",
    });

  Token.create({
    code: uuidv4(), 
    meter_number: req.body.meter_number,
    amount: req.body.amount,
    status: "unused",
  })
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "error occured",
      });
    });
};



exports.findOne = (req, res) => {
  const code = req.params.code;

  Token.findOne({ code })
    .then((data) => {
      if (!data)
        res.status(404).send({
          message: "no token found ",
        });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "error occured" ,
      });
    });
};
