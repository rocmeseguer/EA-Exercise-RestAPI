import mongoose from 'mongoose';
import { UserModel } from './models/user';
import { TodoModel } from './models/todo'; 

// Conexión a la base de datos (cambiar según tu configuración)
const mongoURI = 'mongodb://localhost:27017/ea-restapi';  

// Connection
export async function startConnection() {
    mongoose.set('strictQuery', true); // Mantiene el comportamiento actual

    await mongoose.connect(mongoURI)
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('Error al conectar:', err));
}

// Función para poblar la base de datos
export async function populateDatabase() {
    try {
        // Eliminar todos los documentos actuales
        await UserModel.deleteMany({});
        await TodoModel.deleteMany({});

        // Crear usuarios de ejemplo
        const user1 = new UserModel({
            name: 'John Doe',
            email: 'john@example.com',
            username: 'johndoe',
            phone: '123-456-7890',
        });

        const user2 = new UserModel({
            name: 'Jane Smith',
            email: 'jane@example.com',
            username: 'janesmith',
            phone: '987-654-3210',
        });

        // Guardar Users de ejemplo
        const savedUser1 = await user1.save();
        const savedUser2 = await user2.save();

        // Crear Todos de ejemplo asociadas a los usuarios
        const todo1 = new TodoModel({
            user: savedUser1._id,  // Referencia al user1
            name: 'Complete project',
            completed: false
        });

        const todo2 = new TodoModel({
            user: savedUser1._id,  // Referencia al user1
            name: 'Buy groceries',
            completed: false
        });

        const todo3 = new TodoModel({
            user: savedUser2._id,  // Referencia al user2
            name: 'Schedule meeting',
            completed: true
        });

        // Guardar los todos en la base de datos
        const savedTodo1 = await todo1.save();
        const savedTodo2 = await todo2.save();
        const savedTodo3 = await todo3.save();

        
    } catch (error) {
        console.error('Error populating the database: ', error);
    } 
}
