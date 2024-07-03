import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { rolePermissions, Role } from '../Users/infrastructure/Permissions';
import MongoUserRepository from '../Users/infrastructure/MongoUserRepository';
import CreateUserCase from '../Users/aplication/CreateUseCase';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/homePro';

const connectToDatabase = async () => {
    try {
        await mongoose.connect(MONGODB_URI, {});
        console.log('Connected to MongoDB');

        
        const userRepository = new MongoUserRepository();
        const createUserCase = new CreateUserCase(userRepository);

        const adminUser = {
            userName: "admin",
            email: "admin@example.com",
            password: "adminpassword",
            nombre: "Admin User",
            rol: 'admin' as Role, 
            permissions: rolePermissions.admin 
        };

        const thiefUser = {
            userName: "thief",
            email: "thief@example.com",
            password: "thiefpassword",
            nombre: "Thief User",
            rol: 'ladron' as Role, 
            permissions: rolePermissions.ladron 
        };

        await createUserCase.run(adminUser);
        await createUserCase.run(thiefUser);
        console.log(`Se crearon los usuarios predeterminados: ${adminUser.userName} y ${thiefUser.userName}`);

    } catch (error) {
        console.error('Error connecting to MongoDB', error);
        process.exit(1);
    }
};

export default connectToDatabase;