
const mongoose = require("mongoose");
const Joi = require('joi')
var schema = mongoose.Schema(
  {
    code: String,
    meterOwnerFirstName: String,
   meterOwnerLastName: String,
  TokenExpirationDate: Date
  },
  { timestamps: true }
);

schema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const Model = mongoose.model("meter", schema);

module.exports.Meter = Model;
module.exports.validateMeterNumber = (body) => {
  return Joi.object({
   meterOwnerFirstName: Joi.string().required(),
    meterOwnerLastName: Joi.string().required(),
  }).validate(body);
};

module.exports.validateToken = (body) => {
    return Joi.object({
      token: Joi.string().required(),
      meter_number: Joi.string().min(6).required()
    }).validate(body);
  };
