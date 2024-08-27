# Event App

This is a React application with Create Event page with integration to Solace.

# React Event App with PostgreSQL, pgAdmin, and Solace Integration

This project sets up a React Event app with a PostgreSQL database, pgAdmin using Docker, and integrates with the Solace broker project.

## Setup Instructions

### Step 1: Docker Setup

1. Ensure Docker is installed on your machine.

### Step 1. Start the 4 Docker cotainers for frontend, backend, postgres db and for pgadmin.

```bash
cd event-app
docker-compose up -d
```

###  Step 2 Accessing pgAdmin

1. Open your web browser and go to `http://localhost:8083`.
2. Log in to pgAdmin with the following credentials:
   - **Email**: admin@admin.com
   - **Password**: admin
3. Add a new server in pgAdmin with the following details:
   - **Name**: eventsdb
   - **Host**: postgres-db
   - **Port**: 5432
   - **Username**: admin
   - **Password**: admin


Execute the init-db/init.sql script to create the events table if it doesn't already exist.

Once the database is set up, navigate to http://localhost:3000/ to view the frontend.

###  Step 3. Integrate with Solace Broker
Clone the Solace broker project from the provided GitHub repository:
```bash
git clone https://github.com/IntegrationWorks/Health/tree/main/NEMS_Test_Harness
```

Follow the setup instructions in the Solace broker project's README to get it up and running.

Ensure the Solace broker is configured to accept messages from your backend server.


With this setup, your React Event app project will include a PostgreSQL database, pgAdmin, all managed through Docker, a Node.js backend server to fetch data from the database and serve it to the React frontend, and integration with the Solace broker for message passing.
