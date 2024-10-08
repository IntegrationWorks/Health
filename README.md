# NEMS_Event_Management

### Overview
The NEMS Event Management project consists of two primary components:
the NEMS Test Harness and the React Event App. 

The NEMS Test Harness is built with Hexagonal Architecture, combining a REST API and Event-Driven Architecture to send event objects to a Solace event broker. 

The React Event App is a simple React application with a header and a Create Event page, integrated with a PostgreSQL database, pgAdmin, and the Solace broker.

### Setup and Pre-requisites
If not already installed:

Install the latest version of OpenJDK 17 on your device (OpenJDK downloads)

Install Docker on your device (Docker installation guide)

Install Postman on your device

Clone this repository or download the .zip file from GitHub and extract the downloaded zip file.

Use the readme https://github.com/IntegrationWorks/Health/blob/main/NEMS_Test_Harness/README.md and https://github.com/IntegrationWorks/Health/blob/main/event-app/README.md to set up the Solace and React related containers.


This setup will get both the NEMS Test Harness and the React Event App running, with integrations with the Solace broker, PostgreSQL database, and pgAdmin.

