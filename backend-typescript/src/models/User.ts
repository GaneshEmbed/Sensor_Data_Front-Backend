// Importing necessary modules from mongoose for schema and document definition
import mongoose, { Schema, Document } from 'mongoose';  // Importing mongoose and related types for schema and document

// Defining the IUser interface to represent the user data structure
export interface IUser extends Document {  // Extending mongoose's Document interface to include user fields
  username: string;                        // Username field, required and unique
  password: string;                        // Password field, required
  firstName: string;                       // First name field, required
  lastName: string;                        // Last name field, required
  mobileNumber: string;                    // Mobile number field, required
  address: string;                         // Address field, required
  country: string;                         // Country field, required
  state: string;                           // State field, required
  city: string;                            // City field, required
  zipCode: string;                         // Zip code field, required
  companyName?: string;                    // Optional field for company name
  companyAddress?: string;                 // Optional field for company address
  gstNumber?: string;                      // Optional field for GST number
}

// Defining the schema for the User collection in the database
const UserSchema: Schema = new Schema({                      // Creating a new Schema for the User model
  username: { type: String, required: true, unique: true },  // Defining username as a required unique string
  password: { type: String, required: true },                // Defining password as a required string
  firstName: { type: String, required: true },               // Defining first name as a required string
  lastName: { type: String, required: true },                // Defining last name as a required string
  mobileNumber: { type: String, required: true },            // Defining mobile number as a required string
  address: { type: String, required: true },                 // Defining address as a required string
  country: { type: String, required: true },                 // Defining country as a required string
  state: { type: String, required: true },                   // Defining state as a required string
  city: { type: String, required: true },                    // Defining city as a required string
  zipCode: { type: String, required: true },                 // Defining zip code as a required string
  companyName: { type: String },                             // Optional field for company name
  companyAddress: { type: String },                          // Optional field for company address
  gstNumber: { type: String },                               // Optional field for GST number
});

// Creating a mongoose model from the defined schema
export const UserModel = mongoose.model<IUser>('User', UserSchema);  // Exporting the User model based on the IUser interface and UserSchema
