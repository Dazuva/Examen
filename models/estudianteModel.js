import mongoose from 'mongoose';
import mongooseSequence from 'mongoose-sequence'; // Asegúrate de requerir mongoose como argumento

// Crear el esquema para el departamento
const estudianteSchema = new mongoose.Schema({
  numeroEstudiante: { type: Number, unique: true },
  nombre: { type: String, required: true, unique: true },
  apellido: { type: String, required: true, unique: true},
  clase: { type: mongoose.Schema.Types.ObjectId, ref: 'Clase', required: true },
  sexo: { type: String, required: true}
});

// Usa el plugin de secuencia para autoincrementar el campo `numeroDepartamento`
estudianteSchema.plugin(mongooseSequence(mongoose), { inc_field: 'numeroEstudiante' });

// Crear y exportar el modelo
const Estudiante = mongoose.model('Estudiante', estudianteSchema);

export default Estudiante;
