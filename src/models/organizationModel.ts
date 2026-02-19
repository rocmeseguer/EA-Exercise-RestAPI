import { Schema, model } from 'mongoose';

// TS Contract for the Organization entity
export interface IOrganization {
  _id?: string;
  name: string;
  country: string;
}

// Mongoose Schema
const organizationSchema = new Schema<IOrganization>({
  name: { type: String, required: true },
  country: { type: String, required: true }
});

export const OrganizationModel = model<IOrganization>('Organization', organizationSchema);