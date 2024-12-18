import routerEstudiante from "./estudianteRouter.js";
import routerClase from "./claseRouter.js";


function routerApi(app) {
    app.use("/estudiante", routerEstudiante);
    app.use("/clase", routerClase);
}

export default routerApi;

