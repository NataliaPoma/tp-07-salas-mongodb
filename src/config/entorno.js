// src/config/entorno.js
require("dotenv").config();

function leerEntorno() {
  const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
  if (!Number.isInteger(PORT) || PORT < 1 || PORT > 65535) {
    throw new Error("PORT inválido: debe ser un entero entre 1 y 65535");
  }

  const NODE_ENV = process.env.NODE_ENV || "development";
  const MONGODB_URI = process.env.MONGODB_URI || null;

  return {
    PORT,
    NODE_ENV,
    MONGODB_URI,
    formatoMorgan: NODE_ENV === "production" ? "combined" : "dev",
  };
}

module.exports = { leerEntorno };
