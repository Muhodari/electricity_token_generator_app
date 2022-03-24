const databaseConnection = require("../models");

const {
  validateMeter,
  Meter,
  validateLoadToken,
} = require("../models/meter.model");
const { Token } = require("../models/token.model");
const {
  generateMeterNumber,
  getDaysDifference,
  validateUUID,
  getTokenExpirationDate,
} = require("../utils/imports");



// add new meter
exports.create = (req, res) => {

  const { error } = validateMeterNumberr(req.body);
  if (error) {
    res.status(400).send({ message: error.details[0].message });
    return;
  }


  Meter.create({
    code: generateMeterNumber(),
    meterOwnerLastName: req.body.meterOwnerLastName,
    meterOwnerLastName: req.body.meterOwnerLastName,
  })
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};



// Token loadind and verification if not used
exports.loadToken = async (req, res) => {
 
  const { error } = validateToken(req.body);
  if (error) {
    res.status(400).send({ message: error.details[0].message });
    return;
  }
  if (!validateUUID(req.body.token))
    return res.status(400).send({ message: "invalid token" });

  const meter = await Meter.findOne({ code: req.body.meter_number });
  if (!meter) return res.status(404).send({ message: "meter number does not exist" });

  const token = await Token.findOne({
    meter_number: req.body.meter_number,
    code: req.body.token,
  });
  if (token.status == "taken")
    return res.status(400).send({ message: "token has be used" });

  Token.findOneAndUpdate(
    {
      code: req.body.token,
      meter_number: req.body.meter_number,
      status: "available",
    },
    { status: "taken" },
    {
      useFindAndModify: false,
    }
  )
    .then(async (data) => {
      if (!data) {
        res.status(404).send({
          message: "token does not found !",
        });
        
        // add the duration count
      } else {
        await Meter.updateOne(
          { _id: meter._id },
          {
            tokenExpirationDate: getTokenExpirationDate(
              data.amount,
              meter.TokenExpirationDate
            ),
          }
        );

        const daysBefore = meter.tokenExpirationDate
            ? getDaysDifference(meter.tokenExpirationDate)
            : 0,
          added = data.total_amount / 100;

        res.send({
          message: `${added} days added, now you have ${
            daysBefore + added
          } days remanining`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};



exports.findOne = (req, res) => {
  const number = req.params.number;

  Meter.findOne({ code: number })
    .then((data) => {
      if (!data)
        res.status(404).send({
          message: "No meter  found with number " + number,
        });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error occured" + number,
      });
    });
};


exports.getMeterDetails = (req, res) => {
    const number = req.params.number;
  
    Meter.findOne({ code: number })
      .then((data) => {
        if (!data)
          res.status(404).send({
            message: "No  Meter found with number " + number,
          });
        else return res.send({message: `You have ${getDaysDifference(data.tokenExpirationDate)} days remaning`});
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error retrieving Meter with number=" + number,
        });
      });
  };


exports.update = (req, res) => {
  const { error } = validateMeter(req.body);
  if (error) {
    res.status(400).send({ message: error.deatails[0].message });
    return;
  }
  const number = req.params.number;

  Meter.findOneAndUpdate({ code: number }, req.body, {
    useFindAndModify: false,
  })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "meter not found",
        });
      } else res.send({ message: "updated successfully!" });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Meter with number=" + number,
      });
    });
};
