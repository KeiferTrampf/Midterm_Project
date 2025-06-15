# Notes Management Application

A full-stack web application for creating, managing, and organizing personal notes with user authentication and a modern UI.

## 🚀 Features

- **User Authentication**: Secure registration, login, and logout functionality
- **Note Management**: Create, read, update, and delete personal notes
- **User-Friendly Interface**: Modern Bootstrap-based UI with responsive design
- **Data Persistence**: MongoDB database for reliable data storage
- **Session Management**: Persistent login sessions with MongoDB session store
- **File Upload**: Support for image uploads with automatic resizing
- **Slug-based URLs**: SEO-friendly URLs for notes using auto-generated slugs
- **Form Validation**: Client and server-side validation for data integrity
- **Error Handling**: Comprehensive error handling and user feedback

## 🛠️ Technology Stack

### Backend

- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling tool
- **Passport.js** - Authentication middleware
- **Express Session** - Session management
- **Multer** - File upload handling
- **Jimp** - Image processing

### Frontend

- **EJS** - Embedded JavaScript templating
- **Bootstrap 5** - CSS framework for responsive design
- **Bootswatch** - Bootstrap theme (Vapor)

### Development Tools

- **Nodemon** - Development server with auto-restart
- **Morgan** - HTTP request logger
- **Express Validator** - Form validation
- **Connect Flash** - Flash messages

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **MongoDB** (local installation or MongoDB Atlas account)
- **npm** or **yarn** package manager

## 🔧 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Midterm_Project
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory with the following variables:

   ```env
   PORT=3000
   DB_CONN=mongodb://localhost:27017/notes-app
   PASSPORT_SECRET=your-secret-key-here
   PASSPORT_COOKIE_KEY=your-cookie-key-here
   ```

   **Note**: Replace the placeholder values with your actual configuration:

   - `DB_CONN`: Your MongoDB connection string
   - `PASSPORT_SECRET`: A secure random string for session encryption
   - `PASSPORT_COOKIE_KEY`: A secure random string for cookie encryption

4. **Start the application**

   ```bash
   npm start
   ```

   The application will be available at `http://localhost:3000`

## 📖 Usage

### Getting Started

1. **Register**: Create a new account at `/register`
2. **Login**: Access your account at `/login`
3. **Create Notes**: Use the "Add Note" button to create new notes
4. **Manage Notes**: View, edit, or delete your notes from the dashboard

### Features Overview

- **Home Page**: Dashboard showing your notes overview
- **Notes List**: View all your notes with pagination
- **Add Note**: Create new notes with title and content
- **Edit Note**: Modify existing notes
- **Delete Note**: Remove notes you no longer need
- **Account Management**: Deactivate your account if needed

## 🗂️ Project Structure

```
Midterm_Project/
├── controllers/          # Route controllers
│   ├── authController.js
│   ├── noteController.js
│   └── userController.js
├── handlers/             # Error handlers and middleware
├── models/               # Database models
│   ├── noteModel.js
│   └── userModel.js
├── public/               # Static assets (CSS, JS, images)
├── routes/               # Route definitions
│   └── router.js
├── utils/                # Utility functions
├── views/                # EJS templates
│   ├── components/
│   ├── partials/
│   └── *.ejs
├── app.js                # Express app configuration
├── connect.js            # Database connection
├── index.js              # Application entry point
└── package.json          # Dependencies and scripts
```

## 🔒 Security Features

- **Password Hashing**: User passwords are securely hashed using Passport Local Mongoose
- **Session Management**: Secure session handling with MongoDB session store
- **Authentication Middleware**: Protected routes require user authentication
- **Input Validation**: Server-side validation for all user inputs
- **CSRF Protection**: Built-in protection against cross-site request forgery

## 🚀 Deployment

### Local Development

```bash
npm start
```

### Production Deployment

1. Set up environment variables for production
2. Configure MongoDB connection for production
3. Use a process manager like PM2:
   ```bash
   npm install -g pm2
   pm2 start index.js
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🆘 Support

If you encounter any issues or have questions:

1. Check the console for error messages
2. Verify your MongoDB connection
3. Ensure all environment variables are properly set
4. Check that all dependencies are installed correctly

## 🔄 Updates

- **v1.0.0**: Initial release with core note management functionality
- User authentication and authorization
- CRUD operations for notes
- Modern responsive UI
- File upload capabilities

### Challenges and Lessons Learned

- **Authentication Complexity**: Integrating Passport.js with session management and MongoDB required careful configuration to ensure secure and persistent user sessions.
- **File Upload Handling**: Managing image uploads and resizing with Multer and Jimp introduced challenges around file validation, storage, and error handling.
- **Form Validation**: Implementing robust client and server-side validation was essential to maintain data integrity and prevent security vulnerabilities.
- **Error Handling**: Building comprehensive error handling improved user experience and simplified debugging during development.
- **Responsive Design**: Ensuring a consistent and user-friendly interface across devices required iterative adjustments to Bootstrap and EJS templates.
- **Environment Configuration**: Managing environment variables securely and documenting setup steps helped streamline onboarding and deployment.
- **Separation of Concerns**: Structuring the project with clear separation between controllers, models, routes, and utilities made the codebase more maintainable and scalable.
- **Learning Outcome**: This project reinforced best practices in full-stack development, secure authentication, and modular application architecture.
