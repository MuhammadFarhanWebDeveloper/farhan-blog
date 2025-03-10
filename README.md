# Farhan's Blog App 

A modern blogging platform designed for seamless content creation and user interaction. The project is built using the MERN stack with additional integrations for secure file storage and Google login functionality..

## Features
### User Authentication
- Manual authentication system built with Express.js.
- Google login functionality to retrieve user details and enable quick account creation.

### Post Creation
Users can create and publish posts by providing:
- Title
- Description
- Cover image
- Content (using a rich text editor with support for embedding images within the content).

### Interactive Features
- **Likes**: Allow users to like posts to show appreciation.
- **Comments**: Enable users to comment on posts for meaningful discussions.

- Responsive UI with Tailwind CSS
- Image upload support with Firebase file storage

## Project Structure
```
/root-directory
│-- client/   # Frontend (React)
│-- server/   # Backend (Express, Node.js, MongoDB)
│-- README.md

```

## Installation
### Prerequisites
Ensure you have the following installed:
- Node.js (>=18.x)
- MongoDB (local or cloud)
- Firebase API key

### Clone the Repository
```sh
git clone https://github.com/MuhammadFarhanWebDeveloper/farhan-blog.git
cd farhan-blog
```

### Backend Setup
```sh
cd server
npm install
```

Create a `config.env` file in the `server/` directory and configure your environment variables:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```
Note that your file name must be `config.env` not `.env` or something.

Run the backend server:
```sh
npm start
```
or 
```sh
npm run dev
```

### Frontend Setup
```sh
cd ../client
npm install
```
Create a `.env` file in the `server/` directory and configure your environment variables:
```

VITE_FIREBASE_API_KEY=your_firebase_app_api_key
VITE_BACKEND_URL=http://localhost:3000
```
Now you can run the application using the following command
```sh
npm run dev
```

## Usage
1. Start the backend server (`server/` folder): `npm start`
2. Start the frontend (`client/` folder): `npm start`
3. Open `http://localhost:5173` in your browser

## Technologies Used
### Frontend
- React and TailwindCSS for building a responsive and visually appealing interface.

### Backend
- Express.js for server-side logic and MongoDB as the database for data management.

### File Storage
- Firebase for secure and reliable image storage.

### Authentication
- Custom authentication implemented in Express.js, with Firebase used exclusively for retrieving user data through Google login.

## Contact
For any questions or issues, feel free to contact me at `muhammadfarhan3789076@gmail.com` or `farhan.merndev@gmail.com`.

