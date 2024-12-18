import mongoose from 'mongoose';
import mongooseSequence from 'mongoose-sequence'; // Asegúrate de requerir mongoose como argumento

// Crear el esquema para el departamento
const claseSchema = new mongoose.Schema({
  numeroClase: { type: Number, unique: true },
  nombre: { type: String, required: true, unique: true }
});

// Usa el plugin de secuencia para autoincrementar el campo `numeroDepartamento`
claseSchema.plugin(mongooseSequence(mongoose), { inc_field: 'numeroClase' });

// Crear y exportar el modelo
const Clase = mongoose.model('Clase', claseSchema);

export default Clase;

