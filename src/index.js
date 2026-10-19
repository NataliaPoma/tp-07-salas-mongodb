// src/index.js
const { leerEntorno } = require("./config/entorno");
const entorno = leerEntorno();
const { conectarBaseDatos } = require("./config/base-datos");
const { crearServicioReservas } = require("./servicios/reservas");
const { crearApp } = require("./app");

async function main() {
  try {
    // Conectar a la base de datos Atlas
    await conectarBaseDatos();

    // Datos iniciales en memoria (para pruebas locales)
    const servicioReservas = crearServicioReservas([
      {
        id: 1,
        estudiante: "Ana López",
        email: "ana@example.com",
        sala: "Sala Norte",
        fecha: "2026-09-20",
        turno: "Mañana",
        personas: 2,
      },
      {
        id: 2,
        estudiante: "Carlos Pérez",
        email: "carlos@example.com",
        sala: "Sala Sur",
        fecha: "2026-09-21",
        turno: "Tarde",
        personas: 4,
      },
      {
        id: 3,
        estudiante: "María Gómez",
        email: "maria@example.com",
        sala: "Sala Multimedia",
        fecha: "2026-09-22",
        turno: "Noche",
        personas: 1,
      },
      {
        id: 4,
        estudiante: "Juan Torres",
        email: "juan@example.com",
        sala: "Sala Norte",
        fecha: "2026-09-23",
        turno: "Mañana",
        personas: 3,
      },
    ]);

    // Crear aplicación Express
    const app = crearApp(servicioReservas, entorno);

    // Iniciar servidor
    app.listen(entorno.PORT, () => {
      console.log(`Servidor iniciado en http://localhost:${entorno.PORT}`);
    });
  } catch (error) {
    console.error("No se pudo iniciar la aplicación:", error);
    process.exitCode = 1;
  }
}

main();
