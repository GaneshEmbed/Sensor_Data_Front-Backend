# Backend Setup Instructions (Windows)

This guide will help you set up the backend project on a Windows machine.

## Prerequisites

Before setting up the project, ensure the following tools are installed:

1. **Node.js and npm**: Node.js is required to run the backend, and npm is the package manager for handling dependencies. You can download and install the latest version of Node.js from the official website. After installation, verify it by checking the version in the command prompt.

2. **MongoDB**: MongoDB is the database used for this project. You can install MongoDB locally on your machine or use a cloud-based MongoDB service such as MongoDB Atlas. If using MongoDB locally, make sure MongoDB is up and running.

3. **Git** (optional): If you are cloning the repository, you will need Git installed on your machine. It’s useful for version control and collaborating on code. If you don’t already have Git, you can install it from the official website.

4. **Python**: Python is used for WebSocket communication with the server. Ensure Python is installed and accessible via the command line.

## Setup Steps

### Step 1: Clone the Repository

Clone the repository from GitHub to your local machine. You can either use the command line or any Git client to do this. Once cloned, navigate into the project directory.

### Step 2: Install Dependencies

The project relies on several external packages. To install them, navigate to the project directory in the command prompt and run the necessary installation process using npm. This will install all required dependencies specified in the `package.json` file.

### Step 3: Configure Environment Variables

You will need to configure the environment variables in the `.env` file. This file should be in the root of the project, and you need to set the following variables:

- **MONGO_URI**: This should be the connection string for your MongoDB database. You can either use a local MongoDB instance or a cloud-based database like MongoDB Atlas.
- **JWT_SECRET**: A secret key for JWT token generation. You can set it to any secure string of your choice.
- **JWT_REFRESH_SECRET**: A secret key for generating refresh tokens.
- **PORT**: The port on which the backend server will run (default is 5000, but you can change it).

Ensure that you have filled in these values properly in the `.env` file.

### Step 4: Start the Server

Once everything is set up, you can start the backend server. This will launch the server and allow it to listen for incoming requests. The server will run on the specified port, with the default being `5000`.

### Step 5: Testing the Backend

To verify that the backend is working, you can use an API testing tool like Postman. Make sure the server is running, and then test the API endpoints like registering a user, logging in, and updating user information.

### Step 6: Troubleshooting

If you encounter any issues during setup, ensure that MongoDB is running (if using a local MongoDB instance), and check for any errors in the terminal. Make sure all dependencies are installed correctly and your `.env` file is set up properly. You can also try clearing the `node_modules` folder and reinstalling dependencies if any errors occur.

## Additional Information

- **WebSocket for Python**: If your project uses WebSockets to communicate with a Python server, ensure that the Python WebSocket server is also up and running.
- **Rebuilding the Project**: If you make changes to the codebase or need to reset the project, you can restart the server.

---