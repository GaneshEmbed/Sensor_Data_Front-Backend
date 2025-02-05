### `README_Linux.md`

```markdown
# Backend Setup Instructions (Linux)

This guide will help you set up the backend project on a Linux machine.

## Prerequisites

Ensure the following tools are installed before proceeding with the setup:

1. **Node.js and npm**: Node.js is required to run the backend, and npm is the package manager for installing dependencies. You can install Node.js via your package manager or by downloading it from the official Node.js website. Once installed, verify the installation.

2. **MongoDB**: MongoDB is used as the database for this backend. You can install MongoDB locally or use MongoDB Atlas for a cloud-based solution. If you are using a local MongoDB instance, ensure that the service is running and accessible.

3. **Git** (optional): If you want to clone the repository, make sure Git is installed. Git is useful for version control and collaboration, but if you prefer, you can manually download the project files as well.

4. **Python**: The backend communicates with a Python server via WebSocket, so make sure Python is installed and accessible.

## Setup Steps

### Step 1: Clone the Repository

Clone the project repository to your local machine. You can do this by using Git or downloading the files manually. Once the project is cloned, navigate to the project directory.

### Step 2: Install Dependencies

The project has several dependencies that need to be installed. These dependencies are listed in the `package.json` file. Use npm to install the necessary packages. Once the installation is complete, all the required dependencies will be available in the `node_modules` folder.

### Step 3: Configure Environment Variables

The project uses environment variables stored in a `.env` file. You need to set up this file with the following configuration:

- **MONGO_URI**: Set this to your MongoDB connection string. You can either use a local MongoDB instance or a cloud database like MongoDB Atlas.
- **JWT_SECRET**: A secret key used for generating JWT tokens. Choose a secure key.
- **JWT_REFRESH_SECRET**: A separate key for generating refresh tokens.
- **PORT**: The port on which the backend server should run (default is 5000, but you can customize it).

Make sure you have correctly configured these values in the `.env` file before proceeding.

### Step 4: Start the Server

To run the backend server, use npm to start the development server. Once the server is started, it will listen for incoming API requests on the specified port.

### Step 5: Testing the Backend

After starting the server, you can test the API endpoints to ensure everything is working correctly. Use an API testing tool like Postman to test actions like registering users, logging in, and updating user details.

### Step 6: Troubleshooting

If you run into issues during setup, make sure MongoDB is running if you're using a local instance. Also, verify that your `.env` file is properly configured and that all dependencies have been installed. If you experience issues with `node_modules`, you can delete the folder and reinstall the dependencies.

## Additional Information

- **WebSocket for Python**: If the backend communicates with a Python server over WebSocket, make sure the Python server is running and listening on the expected port.
- **Rebuilding the Project**: If changes have been made to the project, you can restart the server to reflect the changes.

---