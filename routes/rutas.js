import routerEstudiante from "./estudianteRouter.js";
import routerClase from "./claseRouter.js";

// Permite manejar las rutas con el ruteo
function routerApi(app) {
    app.use("/estudiante", routerEstudiante); // Registra el enrutador de estudiantes
    app.use("/clase", routerClase); // Registra el enrutador de clases
}

export default routerApi;

