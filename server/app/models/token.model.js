const mongoose = require("mongoose");
const Joi = require("joi");
var schema = mongoose.Schema(
  {
    code: String,
    meterNumber: { type: String, ref: "meter" },
    amount: Number,
    endDate: Date,
    status: {
      type: String,
      enum: ["available", "taken"],
    },
  },
  { timestamps: true }
);

schema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const Model = mongoose.model("token", schema);

module.exports.Token = Model;
module.exports.validateTokenPay = (body) => {
  return Joi.object({
    amount: Joi.number().min(100).max(182500).required(),

    meterNumber: Joi.string().min(6).required(),
  }).validate(body);
};
