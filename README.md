🦷 Dental Practice Management Software README This is a comprehensive dental practice management software built using the MERN Stack (MongoDB, Express, React, Node.js).

🚀 Getting Started Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

Prerequisites
You'll need the following installed on your system:

`Node.js` (version 18 or later is recommended)

`npm` (Node Package Manager - comes with Node.js) or Yarn

`MongoDB` (running locally or a connection string for a cloud service like MongoDB Atlas)

Installation

Clone the repository:

git clone https://github.com/Humza123-Shahid/DentistApp.git cd DentistApp

Install dependencies for both the client (frontend) and the server (backend) and also for root.

Root:

cd EvenTo

npm install

Backend (Server):

cd server

npm install

Frontend (Client):

cd ../client 

npm install

⚙️ Configuration
Before running the application, you must set up your Constant.

Constant:
In the server directory, navigate to db.js file.

Update the following required constant, replacing the placeholders with your actual values:

# MongoDB connection
const mongoURI="your_mongodb_connection_string_here" also add 'dentistapp' at the end of string

▶️ Running the Application You need to start both the backend server and the frontend client separately.

1. Start the Backend Server Navigate to the server directory and run nodemon script:

cd server

nodemon ./index.js

The server should start running at the port specified in your index.js file (e.g., http://localhost:5000).

2. Start the Frontend Client Open a new terminal window, navigate to the client directory, and run the start script:

cd ../client

npm start

The client should open automatically in your browser (usually at http://localhost:3000).

The application is now fully running!
OR You can run both at the same time.

Start both Client and Server

Navigate to root directory and run the both script:

cd EvenTo

npm run both

The server should start running at the port specified in your index file (e.g., http://localhost:5000).
AND
The client should open automatically in your browser (usually at http://localhost:3000).

The application is now fully running!
📂 Project Structure A brief overview of the main folders: Directory Description server/ Contains the Express.js application (API, MongoDB connection, routes, controllers). client/ Contains the React application (components, state management, views). server/models/ MongoDB schemas (e.g., Appointment.js, Patient.js, Payment.js)
