# GameoN - Ultimate Gaming Platform

A full-stack gaming platform built with React frontend and Spring Boot backend.

## Features

- **Member Management**: Registration, login, search by name/phone
- **Game Management**: Add games, play games, transaction tracking
- **Admin Dashboard**: Manage members, games, view collections
- **Real-time Collections**: Daily revenue tracking
- **Secure Authentication**: Separate admin and member authentication

## Tech Stack

### Frontend
- React 19 with Vite
- React Router for navigation
- Tailwind CSS for styling
- Axios for API calls
- Lucide React for icons

### Backend
- Spring Boot 3.5.5
- MongoDB with Spring Data
- BCrypt for password hashing
- CORS configuration for frontend integration

## Quick Start

### Prerequisites
- Node.js 18+
- Java 21+
- MongoDB Atlas account (or local MongoDB)

### Backend Setup
1. Navigate to the root directory
2. Update `src/main/resources/application.properties` with your MongoDB connection string
3. Run the backend:
   ```bash
   ./mvnw spring-boot:run
   ```
   The backend will start on `http://localhost:8080`

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will start on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /auth/login` - Member login
- `POST /auth/register` - Member registration
- `POST /admin/login` - Admin login
- `POST /admin/register` - Admin registration

### Members
- `GET /members` - Get all members
- `POST /members` - Create member
- `GET /members/search/name/{name}` - Search by name
- `GET /members/search/phone/{phone}` - Search by phone
- `GET /members/search/username/{username}` - Search by username

### Games
- `GET /games` - Get all games
- `POST /games` - Create game
- `GET /games/{id}` - Get game by ID

### Transactions
- `POST /transactions` - Create transaction
- `GET /transactions` - Get all transactions

### Recharges
- `POST /recharges` - Create recharge
- `GET /recharges` - Get all recharges

### Admin Dashboard
- `GET /admin/dashboard/members` - Get all members (admin)
- `GET /admin/dashboard/games` - Get all games (admin)
- `GET /admin/dashboard/collections/{date}` - Get collections by date
- `GET /admin/dashboard/collections/today` - Get today's collections

## Default Credentials

### Admin
- Username: `admin`
- Password: `admin`

### Test Member
- Username: `testuser`
- Password: `password123`

## Project Structure

```
GameoN/
├── src/main/java/com/UltimateGaming/GameoN/
│   ├── controller/          # REST controllers
│   ├── service/            # Business logic
│   ├── repository/         # Data access layer
│   ├── model/             # Entity models
│   ├── dto/               # Data transfer objects
│   ├── config/            # Configuration classes
│   └── security/          # Security interceptors
├── frontend/
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React context providers
│   │   ├── services/      # API service layer
│   │   └── styles/        # CSS and styling
│   └── public/            # Static assets
└── README.md
```

## Features Overview

### Member Features
- Register new account with initial balance
- Login with username/password
- View available games
- Play games (deducts from balance)
- View transaction history
- Recharge account balance

### Admin Features
- Secure admin authentication
- Manage all members
- Add/edit/delete games
- View all transactions
- Track daily collections
- Search members by name/phone

### Security
- Password hashing with BCrypt
- Token-based authentication
- CORS configuration for cross-origin requests
- Protected admin routes with interceptors

## Development

### Adding New Features
1. Backend: Add controller → service → repository layers
2. Frontend: Create components → add to routing → integrate with API
3. Update this README with new endpoints/features

### Database Schema
- **Members**: username, name, phone, email, password (hashed), balance, active status
- **Games**: name, description, price, minPlayers, multipleAllowed
- **Transactions**: memberId, gameId, amount, timestamp
- **Recharges**: memberId, amount, dateTime
- **Collections**: date, total amount
- **AdminUsers**: username, password (hashed)

## Troubleshooting

### Common Issues
1. **CORS errors**: Ensure backend CORS configuration allows frontend origin
2. **MongoDB connection**: Check connection string in application.properties
3. **Port conflicts**: Backend uses 8080, frontend uses 3000
4. **Authentication issues**: Verify token headers are being sent correctly

### Logs
Backend logs are available in `./logs/application.log`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.