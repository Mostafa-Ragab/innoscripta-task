# Innoscripta Task

This repository contains the solution for the Innoscripta Task. The project demonstrates modern web development practices using React, TypeScript, and Docker for containerization.

---

## Table of Contents

- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Setup and Installation](#setup-and-installation)
- [Running the Project](#running-the-project)
  - [Using Docker](#using-docker)
  - [Running Locally (Without Docker)](#running-locally-without-docker)
- [License](#license)

---

## Technologies Used

This project is built using the following technologies:

- **Frontend:**
  - [React](https://reactjs.org/) - A JavaScript library for building user interfaces.
  - [TypeScript](https://www.typescriptlang.org/) - Superset of JavaScript that adds static typing.
  - [React Router DOM](https://reactrouter.com/) - Handles routing in the application.
  - [React Query](https://tanstack.com/query/latest) - Data-fetching and state management.
  - [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework.
  - [axios](https://axios-http.com/) - HTTP client for API communication.

- **Tooling:**
  - [Vite](https://vitejs.dev/) - Next-generation frontend tooling.
  - [pnpm](https://pnpm.io/) - Fast, disk space-efficient package manager.
  - [ESLint](https://eslint.org/) - JavaScript and TypeScript linting.
  - [Prettier](https://prettier.io/) - Code formatting.
  - [Docker](https://www.docker.com/) - Containerization platform for the application.

---

## Project Structure

The repository follows a structured and modular architecture to ensure scalability and maintainability.

```plaintext
├── public/              # Static files (e.g., images, icons)
├── src/
│   ├── components/      # Reusable UI components
│   ├── hooks/           # Custom hooks for shared logic
│   ├── pages/           # Page components for routing
│   ├── services/        # API interaction and logic
│   ├── styles/          # Global and component-specific styles
│   ├── utils/           # Utility functions
│   ├── App.tsx          # Root component
│   ├── main.tsx         # Entry point for the React app
├── .eslintrc            # ESLint configuration
├── .prettierrc          # Prettier configuration
├── docker-compose.yml   # Docker Compose configuration
├── Dockerfile           # Dockerfile for containerizing the application
├── package.json         # Dependencies and scripts
├── README.md            # Project documentation
├── tailwind.config.js   # Tailwind CSS configuration
├── tsconfig.json        # TypeScript configuration
└── vite.config.ts       # Vite configuration


## Running the Project

### Using Docker

1. ** Build the Docker Image:
docker build -t innoscripta-task .

2. ** Run the Docker Container
docker run --name innoscripta-container -d -p 3000:80 innoscripta-task

3. ** Access the Application
Once the container is running, open your browser and navigate to:
http://localhost:3000
