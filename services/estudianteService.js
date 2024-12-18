import Clase from "../models/claseModel.js";
import Estudiante from "../models/estudianteModel.js";

class EstudianteService {
  async getClase() {
    try {
      return await Estudiante.find().populate("clase");
    } catch (error) {
      throw { status: 500, message: "Error al obtener los estudiantes" };
    }
  }

  async getEstudianteById(id) {
    try {
      return await Estudiante.findById(id).populate("clase");
    } catch (error) {
      throw { status: 404, message: "Clase no encontrado" };
    }
  }

  async addEstudiante(data) {
    console.log('Datos recibidos:', data);

    if (!data.nombre || !data.apellido || !data.clase || !data.sexo) {
      throw { status: 400, message: "Todos los campos son obligatorios" };
    }

    console.log('Buscando área con ID:', data.clase);
    const areaExistente = await Clase.findById(data.clase);
    if (!areaExistente) {
      throw { status: 404, message: `Área con ID ${data.clase} no encontrada` };
    }



    // Crear el nuevo departamento ddd
    const nuevoDepartamento = new Estudiante({
      nombre: data.nombre,
      apellido: data.apellido,
      clase: areaExistente._id,
      sexo: data.sexo
    });

    try {
      console.log('Guardando estudiante');
      await nuevoDepartamento.save();
      return nuevoDepartamento;
    } catch (error) {
      console.log('Error al crear el estudiante:', error.message);
      throw { status: 500, message: `Error al crear el estudiante: ${error.message}` };
    }
  }

  async updateEstudiante(id, data) {
    try {
      // Buscar el departamento por ID
      const departamento = await Estudiante.findById(id);
      if (!departamento) {
        throw { status: 404, message: "Estudiante no encontrado" };
      }

      // Validar si se intenta actualizar el nombre
      if (data.nombre) {
        const departamentoExistente = await Estudiante.findOne({ nombre: data.nombre });
        if (departamentoExistente && departamentoExistente._id.toString() !== id) {
          throw { status: 409, message: "El nombre del departamento ya existe" };
        }
      }

      if (data.apellido) {
        const departamentoExistente = await Estudiante.findOne({ nombre: data.apellido });
        if (departamentoExistente && departamentoExistente._id.toString() !== id) {
          throw { status: 409, message: "El nombre del departamento ya existe" };
        }
      }

      if (data.sexo) {
        const departamentoExistente = await Estudiante.findOne({ nombre: data.sexo });
        if (departamentoExistente && departamentoExistente._id.toString() !== id) {
          throw { status: 409, message: "El nombre del departamento ya existe" };
        }
      }

      // Validar si se intenta actualizar el encargado
      if (data.clase) {
        const supervisorExistente = await Clase.findById(data.clase);
        if (!supervisorExistente) {
          throw { status: 404, message: "Clase no encontrado" };
        }
      }

      // Actualizar los datos del departamento
      Object.assign(departamento, data);
      await departamento.save();


      return departamento;
    } catch (error) {
      throw {
        status: error.status || 500,
        message: error.message || "Error al actualizar el estudiante"
      };
    }
  }



  async deleteEstudiante(id) {
    try {
      const departamento = await Estudiante.findById(id);
      if (!departamento) {
        throw { status: 404, message: "Departamento no encontrado" };
      }


      await departamento.deleteOne();
      return { message: "Estudiante eliminado exitosamente" };
    } catch (error) {
      throw { status: error.status || 500, message: error.message || "Error al eliminar el estudiante" };
    }
  }
}

export default new EstudianteService();
