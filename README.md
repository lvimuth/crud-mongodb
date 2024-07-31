
# React CRUD Application with MongoDB and Real-Time Updates

This project is a simple CRUD (Create, Read, Update, Delete) application built with React for the frontend and Node.js with Express for the backend. It uses MongoDB for data storage and integrates Socket.io for real-time updates. Additionally, it maintains a log of CRUD operations in a separate collection in MongoDB.

## Features

- **Create** new items with a name and quantity.
- **Read** and display a list of items.
- **Update** existing items.
- **Delete** items.
- **Real-time updates**: Reflect changes across all clients in real-time using Socket.io.
- **CRUD Operation Logs**: Log all CRUD operations with timestamps in a separate collection in MongoDB.

## Getting Started

### Prerequisites

- Node.js and npm installed.
- MongoDB Atlas account (or a local MongoDB instance).

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/react-crud-app.git
   cd react-crud-app
   ```

2. **Install backend dependencies:**

   ```bash
   npm install
   ```

3. **Install frontend dependencies:**

   ```bash
   cd client
   npm install
   cd ..
   ```

### Configuration

1. **MongoDB Atlas Setup:**
   - Create a MongoDB Atlas account and a new cluster.
   - Add a database user with the necessary permissions.
   - Whitelist your IP address.

2. **Update MongoDB Connection String:**
   - In the `server.js` file, replace the placeholder `<username>`, `<password>`, and `<dbname>` in the MongoDB connection string with your actual MongoDB Atlas credentials and database name.

   ```javascript
   mongoose.connect('mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
   ```

### Running the Application

1. **Start the backend server:**

   ```bash
   node server.js
   ```

2. **Start the React application:**

   ```bash
   cd client
   npm start
   ```

3. **Open your browser:**
   - Navigate to `http://localhost:3000` to view the React application.

## Project Structure

```
react-crud-app/
│
├── server.js               # Express server with CRUD routes and Socket.io setup
├── models/
│   ├── item.js             # Mongoose schema for items
│   ├── log.js              # Mongoose schema for CRUD operation logs
│
├── client/                 # React application
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ItemList.js # Component for displaying items and handling edit/delete
│   │   │   ├── ItemForm.js # Component for creating new items
│   │   ├── App.js          # Main React component
│   │   ├── index.js        # React entry point
│
├── package.json            # Backend dependencies
├── client/package.json     # Frontend dependencies
```

## Backend API

### Create Item

- **URL:** `/items`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "name": "Item Name",
    "quantity": 10
  }
  ```

### Read Items

- **URL:** `/items`
- **Method:** `GET`

### Update Item

- **URL:** `/items/:id`
- **Method:** `PUT`
- **Body:**
  ```json
  {
    "name": "Updated Item Name",
    "quantity": 15
  }
  ```

### Delete Item

- **URL:** `/items/:id`
- **Method:** `DELETE`

## Real-Time Updates

- The application uses Socket.io to provide real-time updates.
- Events emitted:
  - `itemAdded`
  - `itemUpdated`
  - `itemDeleted`

## Logs

- All CRUD operations are logged in a separate collection `logs` in MongoDB.
- Each log entry includes the operation type, item ID, and timestamp.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Socket.io](https://socket.io/)
- [React](https://reactjs.org/)
- [Express](https://expressjs.com/)
