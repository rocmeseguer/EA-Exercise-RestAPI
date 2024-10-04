import { connect, connection } from 'mongoose'
import { UserModel } from './models/User';
import { TodoModel } from './models/Todo'; 

// Conexión a la base de datos (cambiar según tu configuración)
const mongoURI = 'mongodb://localhost:27017/ea-restapi';  


export async function startConnection() {
    const db = await connect(mongoURI, (err) => {
        if (err) {
            console.log('Unable to connect to the server. Please start the server. Error:', err);
        } else {
            console.log('Connected to Server successfully!');
        }
    });
}



// Función para poblar la base de datos
export async function populateDatabase() {
    try {
        // Conectar a la base de datos
        const db = await connect(mongoURI);

        // Eliminar todos los documentos actuales
        await UserModel.deleteMany({});
        await TodoModel.deleteMany({});


        // Crear usuarios de ejemplo
        const user1 = new UserModel({
            name: 'John Doe',
            email: 'john@example.com',
            username: 'johndoe',
            phone: '123-456-7890',
            company: { name: 'Doe Industries' }
        });

        const user2 = new UserModel({
            name: 'Jane Smith',
            email: 'jane@example.com',
            username: 'janesmith',
            phone: '987-654-3210',
            company: { name: 'Smith Corp' }
        });

        // Guardar Users de ejemplo
        const savedUser1 = await user1.save();
        const savedUser2 = await user2.save();

        console.log('Users inserted: ', savedUser1._id, savedUser2._id);

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

        console.log('Todos inserted: ', savedTodo1._id, savedTodo2._id, savedTodo3._id);
        
    } catch (error) {
        console.error('Error populating the database: ', error);
    } finally {
 
        // Cerrar la conexión con la base de datos
        connection.close();
    }
}
