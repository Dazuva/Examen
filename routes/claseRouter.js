import { Router } from "express";
import ClaseService from "../services/claseService.js";

const routerClase = Router();


/**
 * @swagger
 * /clase:
 *   get:
 *     summary: Obtiene una lista de clases
 *     tags:
 *       - Clase
 *     responses:
 *       200:
 *         description: Lista de clase
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   numeroClase:
 *                     type: number
 *                   nombre:
 *                     type: string
 */
routerClase.get("/", async (req, res) => {
  try {
    const areas = await ClaseService.getClase();
    res.json(areas);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /clase/{id}:
 *   get:
 *     summary: Obtiene un clase por ID
 *     tags:
 *       - Clase
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la área
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Área encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 numeroClase:
 *                   type: number
 *                 nombre:
 *                   type: string
 */
routerClase.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const area = await ClaseService.getClaseById(id);
    if (!area) {
      return res.status(404).json({ message: "Clase no encontrada" });
    }
    res.json(area);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /clase:
 *   post:
 *     summary: Crear nueva clase
 *     tags:
 *       - Clase
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                   type: string
 *     responses:
 *       201:
 *         description: Clase creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 numeroClase:
 *                   type: number
 *                 nombre:
 *                   type: string
 */
routerClase.post('/', async (req, res) => {
  try {
    const { nombre, apellido, clase, sexo } = req.body;
    const data = { nombre, apellido, clase, sexo }; // Uso de solo las propiedades necesarias
    const area = await ClaseService.addClase(data);
    res.status(201).json(area);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



/**
 * @swagger
 * /clase/{id}:
 *   patch:
 *     summary: Actualiza un área por ID
 *     tags:
 *       - Clase
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la área
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
 *     responses:
 *       200:
 *         description: Área actualizada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 numeroDepartamento:
 *                   type: number
 *                 nombre:
 *                   type: string
 */
routerClase.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body; // Esto contiene los datos que el cliente envía para actualizar
    const area = await ClaseService.updateClase(id, data); // Se pasa al servicio para actualizar el área
    res.json(area); // Se responde con el área actualizada
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message }); // Manejo de errores
  }
});


/**
 * @swagger
 * /clase/{id}:
 *   delete:
 *     summary: Eliminar una clase por ID
 *     tags:
 *       - Clase
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la clase
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: clase eliminada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "clae eliminada"
 */
routerClase.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await ClaseService.deleteClase(id);
    res.json(response);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
});

export default routerClase;
