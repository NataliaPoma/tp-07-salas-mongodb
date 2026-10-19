const { conectarBaseDatos } = require("../src/config/base-datos");
const Reserva = require("../src/modelos/reserva");

(async () => {
  try {
    await conectarBaseDatos();

    const nuevaReserva = new Reserva({
      estudiante: "Juan Pérez",
      email: "juan@example.com",
      sala: "Sala Norte",
      fecha: "2026-10-19",
      turno: "Mañana",
      personas: 3,
    });

    const resultado = await nuevaReserva.save();
    console.log("Reserva creada con _id:", resultado._id.toString());
  } catch (error) {
    console.error("Error al crear reserva:", error.message);
  } finally {
    process.exit(0);
  }
})();
