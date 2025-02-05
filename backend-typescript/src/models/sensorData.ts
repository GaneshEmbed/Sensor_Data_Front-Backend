import mongoose, { Document, Schema } from 'mongoose';  // Importing necessary modules from mongoose

// Define an interface for the document type (SensorData)
interface ISensorData extends Document {
  temp1: string;            // Temperature value 1
  temp2: string;            // Temperature value 2
  humidity1: string;        // Humidity value 1
  humidity2: string;        // Humidity value 2
  relay1Status: number;     // Relay 1 status (0=off, 1=on, 2=pulse)
  relay2Status: number;     // Relay 2 status (0=off, 1=on, 2=pulse)
  createdAt: Date;          // Created date
  updatedAt: Date;          // Last updated date
}

// Define a Mongoose schema for storing sensor data with proper types
const sensorDataSchema: Schema = new Schema<ISensorData>({
  temp1: { type: String, required: true },         // Temperature 1 (string type)
  temp2: { type: String, required: true },         // Temperature 2 (string type)
  humidity1: { type: String, required: true },     // Humidity 1 (string type)
  humidity2: { type: String, required: true },     // Humidity 2 (string type)
  relay1Status: { type: Number, default: 0 },      // Relay 1 status (default: 0)
  relay2Status: { type: Number, default: 0 },      // Relay 2 status (default: 0)
}, { timestamps: true });  // Enable timestamps (createdAt and updatedAt)

// Create a model from the schema and interface, defining the collection name as 'SensorData'
const SensorData = mongoose.model<ISensorData>('SensorData', sensorDataSchema);

// Export the SensorData model to use it in other files
export default SensorData;



// const sensorDataSchema: Schema = new Schema<ISensorData>({
//   temp1: { type: String, required: true },
//   temp2: { type: String, required: true },
//   humidity1: { type: String, required: true },
//   humidity2: { type: String, required: true },
//   relays: {
//     type: [{ relayStatus: { type: Number, required: true } }], // Array of relays with their statuses
//     required: true,
//     default: []
//   },
//   timestamp: { type: Date, default: Date.now }
// });