const { conectarBaseDatos } = require("../src/config/base-datos");
const Reserva = require("../src/modelos/reserva");

(async () => {
  try {
    await conectarBaseDatos();

    const reservas = await Reserva.find();
    console.log("Cantidad de reservas:", reservas.length);
    reservas.forEach((r) => {
      console.log(
        `${r._id.toString()} - ${r.estudiante} - ${r.sala} - ${r.turno}`,
      );
    });
  } catch (error) {
    console.error("Error al listar reservas:", error.message);
  } finally {
    process.exit(0);
  }
})();
