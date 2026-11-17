const {
  conectarBaseDatos,
  desconectarBaseDatos,
} = require("../src/config/base-datos");

async function main() {
  try {
    await conectarBaseDatos();
    console.log("Conexión exitosa a MongoDB Atlas");
  } finally {
    await desconectarBaseDatos();
  }
}

main().catch((error) => {
  console.error("No se pudo completar la conexion: ", error.name);
  console.error("Revisar mogondb_uri, servidor, red y permisos");
  process.exitCode = 1;
});
