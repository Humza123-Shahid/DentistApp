# 🦷 Denta — Dental Practice Management Software

A comprehensive dental practice management software built using the **MERN Stack** (MongoDB, Express, React, Node.js).

---

## 📋 Application Flow

### Phase 1 — Clinic Setup
> *Do this once, before any patient walks in*

1. **Dentist** → Add all dentists with specialization, contact, and salary
![Dentist](<app_flow_images/Screenshot (6).png>)
2. **Procedure** → Add all treatments (Root Canal, Cleaning, Filling, etc.)
![Procedure](<app_flow_images/Screenshot (7).png>)
3. **Pricing** → Assign fees to each procedure *(requires Procedures to be added first)*
![Prcing](<app_flow_images/Screenshot (8).png>)
4. **Inventory** → Add all supplies/materials with quantity and cost
![Inventory](<app_flow_images/Screenshot (9).png>)

### Phase 2 — Patient Registration
> *When a new patient arrives*

5. **Patient** → Register patient details (name, DOB, contact, gender)
![Patient](<app_flow_images/Screenshot (11).png>)
6. **Patient History** → Add medical background (chronic conditions, cavities, X-rays)
![Patient History](<app_flow_images/Screenshot (12).png>)

### Phase 3 — Visit Flow
> *Every appointment*

7. **Appointment** → Book a slot *(requires Patient + Dentist to be created first)*
![Appointment](<app_flow_images/Screenshot (13).png>)
8. **Tooth** → Record which teeth are affected and planned procedures
![Tooth](<app_flow_images/Screenshot (14).png>)
   > You can also add and view tooth-related records in the Patient record view using the teeth map. Click the **Save Procedures** button to save tooth data.
   ![Tooth In Patient](<app_flow_images/Screenshot (18).png>)

### Phase 4 — Post Treatment
> *After treatment is done*

9. **Expense** → Log any materials/lab fees consumed during treatment
![Expense](<app_flow_images/Screenshot (15).png>)
10. **Payment** → Record what the patient paid for the appointment
![Payment(01)](<app_flow_images/Screenshot (16).png>)
![Payment(02)](<app_flow_images/Screenshot (17).png>)

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Ensure the following are installed on your system:

- **Node.js** (v18 or later recommended)
- **npm** (comes with Node.js) or Yarn
- **MongoDB** (running locally or a cloud connection string via MongoDB Atlas)

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/Humza123-Shahid/DentistApp.git
cd DentistApp
```

2. **Install root dependencies:**

```bash
cd EvenTo
npm install
```

3. **Install backend dependencies:**

```bash
cd server
npm install
```

4. **Install frontend dependencies:**

```bash
cd ../client
npm install
```

---

## ⚙️ Configuration

Before running the application, configure the MongoDB connection.

In the `server` directory, open `db.js` and update the connection constant:

```js
const mongoURI = "your_mongodb_connection_string_here/dentistapp"
```

> Make sure to append `/dentistapp` at the end of your MongoDB connection string.

---

## ▶️ Running the Application

You can start the backend and frontend **separately** or **together**.

### Option 1 — Run Separately

**Start the backend server:**

```bash
cd server
nodemon ./index.js
```

> Server runs at: `http://localhost:5000`

**Start the frontend client** *(in a new terminal)*:

```bash
cd ../client
npm start
```

> Client opens automatically at: `http://localhost:3000`

### Option 2 — Run Both Together

Navigate to the root directory and run:

```bash
cd EvenTo
npm run both
```

> Both the server (`http://localhost:5000`) and client (`http://localhost:3000`) will start simultaneously.

---

## 📂 Project Structure

| Directory | Description |
|---|---|
| `server/` | Express.js application (API, MongoDB connection, routes, controllers) |
| `client/` | React application (components, state management, views) |
| `server/models/` | MongoDB schemas (e.g., `Appointment.js`, `Patient.js`, `Payment.js`) |
