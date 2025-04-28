# NutriCook

NutriCook is a MERN stack application that allows users to share and discover recipes while also providing nutritional insights. It features a robust backend with authentication, user management, and role-based access control.

---

## Features

### Authentication
- **Signup**: Create a new user account.
- **Login**: Authenticate existing users.
- **Forgot Password**: Request a password reset email.
- **Reset Password**: Reset password using a secure token.
- **Update Password**: Change the current password after login.

### User Management
- **Update User Details**: Users can update their profile information.
- **Role-based Permissions**: Users can only modify their own data.

### Recipe Management
- **Create Recipe**: Users can add new recipes with detailed ingredients.
- **Update Recipe**: Modify existing recipes, restricted to the recipe owner.
- **Delete Recipe**: Remove recipes, restricted to the recipe owner.
- **Like Recipe**: Users can like and interact with recipes.
- **Nutritional Data**:
  - Automatic calculation of nutrient data for recipes based on the provided ingredients.
  - View total nutritional values (e.g., calories, proteins, fats, etc.) for recipes.

### Admin Dashboard
- **View Statistics**:
  - Total recipes on the platform.
  - Total registered users.
  - Recipes added in the current month.
  - Users registered in the current month.
- **Manage Content**:
  - Delete any recipe.
  - Delete any user.

---

## Technology Stack

### Backend
- **Node.js**: JavaScript runtime for building scalable server-side applications.
- **Express.js**: Web application framework for creating RESTful APIs.
- **MongoDB**: NoSQL database for storing user data, recipes, and nutrients data.

### Frontend (not included in this README)
- **React.js**: JavaScript library for building the user interface.
- **React Query**: For efficient and powerful server-state management.

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/nutricook.git
   ```
2. Navigate to the backend directory:
   ```bash
   cd nutricook/backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables:
   Create a `.env` file in the backend directory and configure the following:
   ```env
   DATABASE=<your_database_url>
   JWT_SECRET=<your_jwt_secret>
   JWT_EXPIRES_IN=<token_expiration_time>
   NODE_ENV=<development_or_production>
   EMAIL_HOST=<your_email_host>
   EMAIL_PORT=<your_email_port>
   EMAIL_USERNAME=<your_email_username>
   EMAIL_PASSWORD=<your_email_password>
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

---

## Key Highlights

1. **Security**:
   - JWT-based authentication for secure user sessions.
   - Role-based access control to ensure users can only modify their own recipes.

2. **User Experience**:
   - Nutritional data is automatically calculated for each recipe.
   - Users can like and interact with recipes shared by others.

3. **Admin Control**:
   - Comprehensive dashboard for monitoring platform activity.
   - Ability to remove inappropriate recipes and manage user accounts.

4. **Scalability**:
   - Built with Node.js and MongoDB for handling large-scale applications.

---

## Contributing

If you'd like to contribute to NutriCook, please fork the repository and submit a pull request. For major changes, please open an issue to discuss your ideas first.

