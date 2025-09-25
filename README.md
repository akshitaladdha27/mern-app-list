# Agent Management & List Distribution App


A **MERN application** designed for admin to manage a team of agents and distribute task lists uploaded via CSV files. The application features secure authentication, agent management, and a CSV processing pipeline.



## Features

### Admin Authentication

# 

*   **Secure Login**: Admins can log in using an email and password.
    
*   **JWT Authentication**: JSON Web Tokens (JWT) ensure secure and stateless session management after successful login.
    
*   **Protected Routes**: All admin functionalities (adding agents, uploading lists, etc.) are protected and accessible only by logged-in admins.
    

### Agent Management

# 

*   **Add Agents**: Admins can create new agents with **Name, Email, Mobile Number, and Password**.
    
*   **Secure Password Storage**: Passwords are securely hashed with `bcryptjs` before saving to the database.
    
*   **Unique Email Validation**: No two agents can register with the same email address.
    

### List Upload & Distribution

# 

*   **CSV Upload**: Admins can upload a list of items via a CSV file.
    
*   **File Type Validation**: Accepts only `.csv`, `.xlsx`, and `.xls` files.
    
*   **CSV Header Validation**: Ensures uploaded files include the required columns: `FirstName`, `Phone`, and `Notes`.
    
*   **Automatic Distribution Logic**:
    
    *   Items are distributed equally among all agents in the database.
        
    *   Uses a **round-robin algorithm**: If the number of items is not divisible by the number of agents, the extra items are assigned sequentially and fairly.
        
*   **Database Integration**: Distributed items are stored in MongoDB with a reference to their assigned agent.
    

### Frontend Dashboard

# 

*   **Agent Creation Form**: Simple interface for adding agents.
    
*   **File Upload Interface**: Upload CSV files with clear success/error messages.
    
*   **Dynamic List Display**: Lists are displayed grouped by agent, showing the assigned items.
    


### Tech Stack

#

*   **MongoDB**: NoSQL database for storing data(login-data), agent, and listitems.
    
*   **Express.js**: Backend framework for building the REST API.
    
*   **React.js**: Frontend library for building the dashboard UI.
    
*   **Node.js**: JavaScript runtime for the backend server.
    

### Key Packages

# 

**Backend**: `mongoose`, `jsonwebtoken`, `bcryptjs`, `multer`, `cors`, `dotenv`, `csv-parser`  
**Frontend**: `axios`, `react-router-dom`


## How to Run the Project

### 1\. Clone Repo
`git clone <repo-url>`
`cd <repo-folder>`

### 2\. Install Dependencies

For **backend**:
 
`cd backend`
`npm install`
`node createAdmin.js`
`npm run dev`

For **frontend**:

`cd client`
`npm install`
`npm start`
