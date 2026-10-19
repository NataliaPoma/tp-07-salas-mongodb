const { conectarBaseDatos } = require("../src/config/base-datos");

(async () => {
  try {
    await conectarBaseDatos();
    console.log("Conexión comprobada correctamente");
  } catch (error) {
    console.error("Error al comprobar conexión:", error.name, error.message);
    process.exit(1);
  } finally {
    process.exit(0);
  }
})();
