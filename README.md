# Code Collaboration App

### Overview
The code collaboration application is designed to facilitate collaborative coding among users.
It consists of a React-based frontend for code editing and a Node.js and Express backend with a MongoDB database for storing code blocks.
Real-time collaboration is enabled using WebSockets via the Socket.io library.

### Prerequisites
Before running the application, you should have the following installed:

Node.js
npm (Node Package Manager)
MongoDB

### Installation
Clone the repository to your local machine:

```bash

git clone <repository-url>
cd <repository-folder>


```
Install frontend and backend dependencies:

```bash

cd client
npm install
cd ../server
npm install


```

Create a .env file in the server folder and set your MongoDB URL:

```bash

DB_URL=your-mongodb-url

```

Start the frontend and backend separately:

In the client folder:
`npm start`
In the server folder:
`npm start`

The React development server will run on port 3000, and the Express server will run on port 3001.


### Live Application URL

