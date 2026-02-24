import mongoose, { Types } from 'mongoose';
import { OrganizationModel, IOrganization } from './models/organizationModel.js';
import { UserModel, IUser } from './models/userModel.js';
import { config, logger } from './config.js';

export async function setupDatabase(): Promise<void> {
    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect(config.mongoUri);
        logger.info('🚀 Connected to MongoDB');
    } catch (err) {
        logger.error(err, '❌ Database connection failed');
        throw err; // Re-throw so main() can handle it
    }
}

export async function seedingDatabase(): Promise<void> {
    try {
        logger.warn('🧹 Cleaning database collections...');
        await Promise.all([
            UserModel.deleteMany({}),
            OrganizationModel.deleteMany({})
        ]);

        logger.info('🌱 Seeding initial data...');

        const orgs: IOrganization[] = await OrganizationModel.insertMany([
            { name: 'Tech Solutions', country: 'Spain' },
            { name: 'Global Corp', country: 'USA' }
        ]);

        const usersData: IUser[] = [
            { name: 'Marc', email: 'm@test.com', role: 'ADMIN', organization: new Types.ObjectId(orgs[0]._id?.toString()) },
            { name: 'Anna', email: 'a@test.com', role: 'USER', organization: new Types.ObjectId(orgs[0]._id?.toString()) },
            { name: 'John', email: 'j@test.com', role: 'EDITOR', organization: new Types.ObjectId(orgs[1]._id?.toString()) }
        ];

        const users = await UserModel.insertMany(usersData);
        logger.info('✅ Database ready with %d users', users.length);
        
    } catch (err) {
        logger.error(err, '❌ Seeding failed');
        throw err;
    }
}