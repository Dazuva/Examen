import express from 'express';
import connectDB from './config/db.js';
import { logErrors, errorHandler } from './middleware/errorHandler.js';
import { setupSwagger } from './swagger.js';
import routerApi from "./routes/rutas.js";

const app = express();

connectDB();

app.use(express.json());

routerApi(app);

app.use(logErrors);
app.use(errorHandler);

setupSwagger(app);

const PORT = 3000;

app.listen(PORT, () => {
    console.log("My port is working on: " + PORT);
});
