import Clase from "../models/claseModel.js";
import Estudiante from "../models/estudianteModel.js";

class ClaseService {
  async getClase() {
    try {
      return await Clase.find();
    } catch (error) {
      throw { status: 500, message: "Error al obtener las clases" };
    }
  }

  async getClaseById(id) {
    try {
      const clase = await Clase.findById(id);
      return clase;
    } catch (error) {
      throw { status: 404, message: "Clase no encontrada" };
    }
  }

  async addClase(data) {
    if (!data.nombre) {
      throw { status: 400, message: "Todos los campos son obligatorios" };
    }

    const claseExistente = await Clase.findOne({ nombre: data.nombre });
    if (claseExistente) {
      throw { status: 409, message: "Clase ya existe" };
    }

    const nuevaClase = new Clase({
      nombre: data.nombre,
    });

    try {
      await nuevaClase.save();
      return nuevaClase;
    } catch (error) {
      throw { status: 500, message: "Error al crear la clase" };
    }
  }

  async updateClase(id, data) {
    try {
      // Buscar el área que se desea actualizar
      const clase = await Clase.findById(id);
      if (!clase) {
        throw { status: 404, message: "Clase no encontrada" };
      }

      // Verificar si se está intentando cambiar el nombre del área
      if (data.nombre) {
        // Validar si ya existe otra área con el mismo nombre
        const claseExistente = await Clase.findOne({ nombre: data.nombre });
        if (claseExistente) {
          throw { status: 409, message: "El nombre de la clase ya está en uso" };
        }

        // Verificar si hay departamentos asociados con el área
        const estudiantesConClase= await Estudiante.find({ clase: clase._id });

        if (estudiantesConClase.length > 0) {
          // Si existen departamentos, actualizamos la referencia al ObjectId de la nueva área
          await Estudiante.updateMany(
            { clase: clase._id },
            { $set: { clase: clase._id } }
          );
        } else {
          // Si no existen departamentos, simplemente actualizamos el área sin afectar nada
          console.log('No hay estudiantes asociados, solo actualizando el área');
        }
      }

      // Actualizar la información del área
      Object.assign(clase, data);
      await clase.save();

      return clase;
    } catch (error) {
      throw { status: error.status || 500, message: error.message || "Error al actualizar la clase" };
    }
  }

  async deleteClase(id) {
    try {
      const area = await Clase.findById(id);
      if (!area) {
        throw { status: 404, message: "Clase no encontrada" };
      }

      // Verificar si el área está asignada a algún departamento
      const departamentos = await Estudiante.find({ clase: area._id });
      if (departamentos.length > 0) {
        throw { status: 400, message: "No se puede eliminar un estudiante con clases asignados" };
      }

      await area.deleteOne();
      return { message: "Clase eliminada exitosamente" };
    } catch (error) {
      throw { status: error.status || 500, message: error.message || "Error al eliminar la Clase" };
    }
  }
}

export default new ClaseService();
