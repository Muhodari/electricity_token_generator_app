const db = require("../models");
const { validateTokenPayload, Token } = require("../models/token.model");
const { Meter } = require("../models/meter.model");
const { v4: uuidv4 } = require("uuid");
const { getTokenExpirationDate } = require("../utils/imports");

// Create and Save a new Token
exports.create = async (req, res) => {
  // Validate request
  const { error } = validateTokenPayload(req.body);
  if (error) {
    res.status(400).send({ message: error.details[0].message });
    return;
  } else if (req.body.total_amount % 100)
    return res
      .status(400)
      .send({ message: "total amount should be a multiple of 100" });

  const meter = await Meter.findOne({ code: req.body.meter_number });

  if (!meter)
    return res.status(404).send({
      message: "Meter Not Found",
    });

  // Save Token in the database
  Token.create({
    code: uuidv4(), // new uuid
    meter_number: req.body.meter_number,
    total_amount: req.body.total_amount,
    status: "unused",
  })
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Token.",
      });
    });
};

// Find a single Token by code
exports.findOne = (req, res) => {
  const code = req.params.code;

  Token.findOne({ code })
    .then((data) => {
      if (!data)
        res.status(404).send({
          message: "Not found Token with code " + code,
        });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Token with code=" + code,
      });
    });
};
