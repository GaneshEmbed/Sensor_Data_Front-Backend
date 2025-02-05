# Backend and Client Setup Documentation

This documentation provides step-by-step instructions for setting up, building, and running the backend server and client on a Linux system.

---

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Install Dependencies](#install-dependencies)
3. [Clone the Repository](#clone-the-repository)
4. [Set Up Environment Variables](#set-up-environment-variables)
5. [Install Project Dependencies](#install-project-dependencies)
6. [Build the Backend](#build-the-backend)
7. [Run the Backend Server](#run-the-backend-server)
8. [Run the Client](#run-the-client)


---

## Prerequisites
Before starting, ensure your system has the following installed:
- **Linux** (Ubuntu/Debian/CentOS, etc.)
- **Node.js** (v16 or higher)
- **npm** (Node Package Manager)
- **MongoDB** (v5 or higher)
- **Git** (for cloning the repository)

---

## Install Dependencies

### 1. Update the System
```bash
sudo apt update
sudo apt upgrade -y
```

### 2. Install Node.js and npm
```bash
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt install -y nodejs
```

##### 2.1. Verify the installation:
```bash
node -v
npm -v
```

### 3. Install MongoDB
```bash
sudo apt install -y mongodb
```

##### 3.1. Start and enable MongoDB:
```bash
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

##### 3.2. Verify MongoDB running:
```bash
sudo systemctl status mongodb
```

### 4. Install Git
```bash
sudo apt install -y git
```
---
## Clone the Repository
Clone the repository to your local machine:
```bash
git clone <repository-url>
cd <repository-folder>
```
Replace `<repository-url>` with the actual URL of the repository you want to clone.

---
## Set Up Environment Variables

Create a `.env` file in the root of your project:
```bash
nano .env
```
Add the following environment variables:

```bash
MONGO_URI_PRIMARY=mongodb://localhost:27017/login
MONGO_URI_BACKUP=mongodb://localhost:27017/backup
JWT_SECRET=mysecret
JWT_REFRESH_SECRET=myrefreshsecret
PORT=5000
```
---

## Install Project Dependencies
Install all dependencies listed in `package.json`:
```bash
npm install
```

## Build the Backend
Compile the TypeScript code to JavaScript:
```bash
npm run build
```
This will generate the compiled JavaScript files in the `dist` folder.

## Run the Backend Server
Start the backend server:
```bash
npm start
```
The server will start and listen on the port specified in the `.env` file (default: `5000`).

## Run the Client
Run the client using `ts-node`:
```bash
npx ts-node src/client.ts
```
The client will connect to the WebSocket server and start sending data.