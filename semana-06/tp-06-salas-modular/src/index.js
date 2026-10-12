const app = require("./app");
const config = require("./configuracion");

app.listen(config.puerto, () => {
  console.log(`Aplicación disponible en http://localhost:${config.puerto}`);
  console.log(`Entorno actual: ${config.entorno}`);
});
