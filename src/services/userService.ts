import { UserModel, IUser } from '../models/userModel.js';

/**
 * USER SERVICE: Pure-logic wrappers for Database operations.
 * Implements functional principles by returning plain objects (Lean).
 */

// CREATE: Returns the newly created user
export const createUser = async (data: Partial<IUser>): Promise<IUser> => {
    return await new UserModel(data).save();
};

// READ: Returns a populated user or null
export const getUserById = async (id: string): Promise<IUser | null> => {
    return await UserModel.findById(id).populate('organization').lean();
};

// UPDATE: Returns the updated version of the document
export const updateUser = async (id: string, data: Partial<IUser>): Promise<IUser | null> => {
    return await UserModel.findByIdAndUpdate(id, data, { new: true }).lean();
};

// DELETE: Returns the deleted document
export const deleteUser = async (id: string): Promise<IUser | null> => {
    return await UserModel.findByIdAndDelete(id).lean();
};

// LIST: Returns an array of users
export const listAllUsers = async (): Promise<IUser[]> => {
    return await UserModel.find().lean();
};

// AGGREGATION: Declarative data transformation
export const getStatsByCountry = async (): Promise<any[]> => {
    return await UserModel.aggregate([
        {
            $lookup: {
                from: 'organizations',
                localField: 'organization',
                foreignField: '_id',
                as: 'orgData'
            }
        },
        { $unwind: '$orgData' },
        {
            $group: {
                _id: '$orgData.country',
                totalUsers: { $sum: 1 },
                userNames: { $push: '$name' }
            }
        },
        { $project: { country: '$_id', totalUsers: 1, userNames: 1, _id: 0 } }
    ]);
};