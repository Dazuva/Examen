import { Router } from "express";
import EstudianteService from "../services/estudianteService.js";

const routerEstudiante = Router();


/**
 * @swagger
 * /estudiante:
 *   get:
 *     summary: Obtiene una lista de estudiantes
 *     tags:
 *       - Estudiante
 *     responses:
 *       200:
 *         description: Lista de estudiantes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   numeroEstudiante:
 *                     type: number
 *                   nombre:
 *                     type: string
 *                   apellido:
 *                     type: string
 *                   clase:
 *                     type: object
 *                     properties:
 *                       nombre:
 *                         type: string
 *                   sexo:
 *                     type: string
 */
routerEstudiante.get("/", async (req, res) => {
  try {
    const departments = await EstudianteService.getClase();
    res.json(departments);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /estudiante/{id}:
 *   get:
 *     summary: Obtiene un estudiante por ID
 *     tags:
 *       - Estudiante
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del estudiante
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Estudiante encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 numeroEstudiante:
 *                   type: number
 *                 nombre:
 *                   type: string
 *                 apellido:
 *                   type: string
 *                 clase:
 *                   type: object
 *                   properties:
 *                     nombre:
 *                       type: string
 *                 sexo:
 *                   type: string
 */
routerEstudiante.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const department = await EstudianteService.getEstudianteById(id);
    if (!department) {
      return res.status(404).json({ message: "Estudiante not found" });
    }
    res.json(department);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /estudiante:
 *   post:
 *     summary: Crear nuevo estudiante
 *     tags:
 *       - Estudiante
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               apellido:
 *                 type: string
 *               clase:
 *                 type: string
 *               sexo:
 *                 type: string
 *     responses:
 *       201:
 *         description: Estudiante creado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 numeroEstudiante:
 *                   type: number
 *                 nombre:
 *                   type: string
 *                 apellido:
 *                   type: string
 *                 clase:
 *                   type: string
 *                 sexo:
 *                   type: string
 */
routerEstudiante.post("/", async (req, res) => {
  try {
    const data = req.body; // Recibe los datos del cuerpo de la solicitud
    const department = await EstudianteService.addEstudiante(data); // Llama al servicio para crear el departamento
    res.status(201).json(department); // Responde con el departamento creado
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message }); // Maneja errores si ocurren
  }
});


/**
 * @swagger
 * /estudiante/{id}:
 *   patch:
 *     summary: Actualiza un estudiante por ID
 *     tags:
 *       - Estudiante
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del estudiante
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               apellido:
 *                 type: string
 *               clase:
 *                 type: string
 *               sexo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Estudiante actualizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 numeroEstudiante:
 *                   type: number
 *                 nombre:
 *                   type: string
 *                 apellido:
 *                   type: string
 *                 clase:
 *                   type: string
 *                 sexo:
 *                   type: string
 */
routerEstudiante.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body; // Aquí tomamos el cuerpo de la solicitud para actualizar el departamento
    const department = await EstudianteService.updateEstudiante(id, data); // Se actualiza el departamento en la base de datos
    res.status(200).json(department); // Se responde con el departamento actualizado
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message }); // Manejo de errores
  }
});


/**
 * @swagger
 * /estudiante/{id}:
 *   delete:
 *     summary: Eliminar un estudiante por ID
 *     tags:
 *       - Estudiante
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del estudiante
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Estudiante eliminado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Estudiante eliminado"
 */
routerEstudiante.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await EstudianteService.deleteEstudiante(id);
    res.json(response);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
});

export default routerEstudiante;

