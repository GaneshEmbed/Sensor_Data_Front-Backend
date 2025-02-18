Here’s a step-by-step guideline for running your MERN stack project using Docker Compose.

---

# **MERN Stack Project - Running with Docker Compose**

## **Prerequisites**
Before running the project, ensure you have the following installed on your system:
- **Docker**: [Install Docker](https://docs.docker.com/get-docker/)
- **Docker Compose**: [Install Docker Compose](https://docs.docker.com/compose/install/)

---

## **Step 1: Clone the Repository**
If you haven’t cloned the repository yet, run:
```sh
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

---

## **Step 2: Update Environment Variables**
Ensure your environment files (`.env`) are correctly set up for the **backend** and **frontend**. Create them if they don’t exist.

### Example `.env` for Backend:
```
PORT=5000
MONGO_URI=mongodb://mongo:27017/your-database-name
JWT_SECRET=your_jwt_secret
```

### Example `.env` for Frontend:
```
REACT_APP_API_URL=http://localhost:5000
```

---

## **Step 3: Run Docker Compose**
Start the containers using:
```sh
docker-compose up --build -d
```
- `--build`: Ensures any code changes are included in the images.
- `-d`: Runs the containers in detached mode (in the background).

---

## **Step 4: Verify Running Containers**
To check if all services are running:
```sh
docker ps
```

---

## **Step 5: Access the Application**
- **Frontend**: Open `http://localhost:3000` in your browser.
- **Backend API**: Open `http://localhost:5000/api` (or the specified backend route).
- **MongoDB**: Runs inside the `mongo` container.

---

## **Step 6: Stopping the Containers**
To stop the running containers:
```sh
docker-compose down
```

To remove containers, networks, and volumes:
```sh
docker-compose down -v
```

---

## **Additional Docker Commands**
- Restart containers:
  ```sh
  docker-compose restart
  ```
- View logs:
  ```sh
  docker-compose logs -f
  ```
- Access a running container’s shell (example for backend):
  ```sh
  docker exec -it your-backend-container-name sh
  ```

---

## **Troubleshooting**
- If any container fails to start, check logs:
  ```sh
  docker-compose logs backend
  ```
- Ensure Docker is running and ports 3000/5000 are not occupied by other processes.

---

This guide should help you document the process in your **README.md**.
