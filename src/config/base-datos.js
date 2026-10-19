const mongoose = require("mongoose");
const { leerEntorno } = require("./entorno");

async function conectarBaseDatos() {
  const entorno = leerEntorno();

  if (!entorno.MONGODB_URI) {
    throw new Error("Falta MONGODB_URI en el entorno");
  }

  try {
    await mongoose.connect(entorno.MONGODB_URI);
    console.log("Conexión a MongoDB exitosa");
  } catch (error) {
    console.error("Error de conexión:", error);
    throw error;
  }
}

module.exports = { conectarBaseDatos };
