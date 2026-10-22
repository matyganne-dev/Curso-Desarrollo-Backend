const mongoose = require("mongoose");

const reservaSchema = new mongoose.Schema(
  {
    estudiante: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      match: /@/,
    },
    sala: {
      type: String,
      required: true,
      enum: ["Sala Norte", "Sala Sur", "Sala Multimedia"],
    },
    fecha: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function (valor) {
          return valor.length > 0;
        },
        message: "La fecha no puede estar vacía",
      },
    },
    turno: {
      type: String,
      required: true,
      enum: ["Mañana", "Tarde", "Noche"],
    },
    personas: {
      type: Number,
      required: true,
      min: 1,
      max: 6,
      validate: {
        validator: Number.isInteger,
        message: "La cantidad de personas debe ser un número entero",
      },
    },
  },
  {
    collection: "reservas",
  },
);

const Reserva = mongoose.model("Reserva", reservaSchema);

module.exports = Reserva;
