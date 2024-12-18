import mongoose from 'mongoose';

async function connectDB() {
  try {
    await mongoose.connect('mongodb+srv://danielazuvaldo:Dazuva123@clusterdazuva.rqdbi.mongodb.net/productsCRUD');
    console.log('Conexión exitosa a MongoDB');
  } catch (error) {
    console.error('Error al conectar con MongoDB:', error);
  }
}

export default connectDB;
