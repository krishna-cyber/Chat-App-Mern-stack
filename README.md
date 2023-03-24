# Real Time Chat App using MERN Stack

This is a real time chat application built using MERN ( MongoDb, Express, React and NodeJs) stack. It uses websocket for real time communication between the client and the server.

## Installation

To run the application, you need to install the following dependencies: <br>

1. NodeJs
2. MongoDb

You also need to clone the repository and install the dependencies for the server and client:

```bash
git clone gh repo clone krishna-cyber/Chat-App-Mern-stack
cd Chat-App-Mern-stack
cd frontend && pnpm install
cd ../backend && pnpm install
```

After installing the dependencies, you need to create a .env file in the `backend` directory and add the following variables:

```bash
PORT = 3000
MONGO_URI = <your-mongodb-uri>
SECRET= <your-jwt-secret>
SALT=10
```

Replace `<your-mongodb-uri>` and `<your-jwt-secret>` with your MongoDB URI and a secret key for JSON Web Tokens.

## Usage

To start the application, run the following commands:

```bash
cd backend && pnpm run dev
cd frontend && pnpm run dev
```

This will start the server and client applications. The client application will run on `vite` and the server application will run on http://localhost:3000.

## Features

- User authentication with JSON Web Tokens
- Real time chat with websockets
- User can create a new chat room
- send and receive messages in real time
- User can see the list of all the users
- User can see the history of previous messages

## Screenshots

 <img src="https://raw.githubusercontent.com/krishna-cyber/Chat-App-Mern-stack/main/Screenshots/Frontend.png">
    <img src="https://raw.githubusercontent.com/krishna-cyber/Chat-App-Mern-stack/main/Screenshots/chat.png">

## Technologies Used

- MongoDB - NoSQL database used for storing data
- Express - NodeJs framework used for building the REST API
- React - Frontend library used for building the user interface
- NodeJs - Javascript runtime environment used for building the server
- ws - Websocket library used for real time communication between the client and the server
- React hooks form - Form validation library used for validating the user input
- Axios - Promise based HTTP client used for making API calls
- Bcrypt - Password hashing library used for hashing the user password
- Jsonwebtoken - JWT library used for generating and verifying the JWT token
- Tailwind CSS - CSS framework used for styling the application
- And many more...

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License.
