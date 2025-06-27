MERN Stack Fitness App
A comprehensive fitness management application built with the MERN stack, featuring separate admin and member panels for efficient gym/fitness center management.
✨ Features
🔐 Admin Panel

Secure Authentication: JWT-based login system
Member Management: Complete CRUD operations for gym members
Class Management: Create, update, and delete fitness classes
Workout Plan Distribution: Upload PDF workout plans and assign them to specific members
Dashboard Overview: Centralized management interface

👤 Member Panel

User Registration & Login: Self-service member registration
Class Browsing: View all available fitness classes
Personal Workout Plans: Access assigned PDF workout plans
Member Dashboard: Personalized member experience

🛠️ Tech Stack
CategoryTechnologyBackendNode.js, Express.jsDatabaseMongoDB with Mongoose ODMFrontendReact.jsStylingTailwind CSSAuthenticationJSON Web Tokens (JWT)File HandlingMulter for PDF uploads
📋 Prerequisites
Before running this application, make sure you have the following installed:

Node.js (v14 or higher)
MongoDB (running locally or MongoDB Atlas)
npm or yarn package manager

🚀 Installation & Setup
1️⃣ Clone the Repository
bashgit clone https://github.com/yourusername/mern-fitness-app.git
cd mern-fitness-app
2️⃣ Backend Configuration
Navigate to the backend directory:
bashcd backend
Install backend dependencies:
bashnpm install
Create a .env file in the backend directory:
envPORT=5000
MONGO_URI=mongodb://localhost:27017/fitness_app
JWT_SECRET=your_super_secret_jwt_key_here
Start the backend server:
bashnpm run dev
3️⃣ Frontend Configuration
Open a new terminal and navigate to the frontend directory:
bashcd frontend
Install frontend dependencies:
bashnpm install
Start the React development server:
bashnpm start
🔧 Initial Admin Setup
⚠️ Important: There's no public endpoint for admin registration. You must create the first admin manually.
Creating Your First Admin

Open MongoDB Compass or use MongoDB shell
Hash a password using Node.js:
javascriptconst bcrypt = require("bcryptjs");
const hashedPassword = bcrypt.hashSync("your_admin_password", 10);
console.log(hashedPassword);

Insert admin user into the database:
javascriptdb.users.insertOne({
  name: "Admin User",
  email: "admin@fitness.com",
  password: "your_hashed_password_here",
  role: "admin",
  assignedWorkoutPlans: [],
  selectedClasses: []
})

Access Admin Panel:
http://localhost:3000/admin/login


🌐 Application URLs
PanelURLDescriptionMember Registrationhttp://localhost:3000/registerNew member signupMember Loginhttp://localhost:3000/loginMember authenticationMember Dashboardhttp://localhost:3000/dashboardMember portalAdmin Loginhttp://localhost:3000/admin/loginAdmin authenticationAdmin Dashboardhttp://localhost:3000/admin/dashboardAdmin management panel
📁 File Structure
mern-fitness-app/
├── backend/
│   ├── uploads/          # Uploaded workout plan PDFs
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API routes
│   ├── middleware/       # Authentication middleware
│   └── server.js         # Express server
├── frontend/
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── pages/        # Page components
│   │   └── utils/        # Utility functions
│   └── public/
└── README.md
🔌 API Endpoints
Authentication

POST /api/auth/register - Member registration
POST /api/auth/login - User login (Admin/Member)

Classes (Public + Admin)

GET /api/classes - List all classes
POST /api/classes - Create new class (Admin only)
PUT /api/classes/:id - Update class (Admin only)
DELETE /api/classes/:id - Delete class (Admin only)

Members (Admin Only)

GET /api/members - List all members
POST /api/members - Create new member
PUT /api/members/:id - Update member
DELETE /api/members/:id - Delete member

Workout Plans

GET /api/plans/:memberId - Get member's workout plans
GET /api/plans - List all plans (Admin only)
POST /api/plans - Upload workout plan (Admin only)

📂 File Access
Uploaded workout plans are accessible via:
http://localhost:5000/uploads/filename.pdf
🚀 Deployment
Environment Variables for Production
envPORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/fitness_app
JWT_SECRET=your_production_jwt_secret
NODE_ENV=production
Deployment Checklist

 Set up production MongoDB database
 Configure environment variables
 Build React frontend: npm run build
 Set up proper CORS policies
 Configure file upload limits
 Set up SSL certificates
 Configure reverse proxy (nginx)

🔒 Security Features

JWT Authentication: Secure token-based authentication
Role-based Access Control: Admin and Member roles with different permissions
Password Hashing: bcrypt for secure password storage
File Upload Validation: Secure PDF upload handling

🐛 Troubleshooting
Common Issues

MongoDB Connection Error

Ensure MongoDB is running locally
Check MONGO_URI in .env file


Admin Can't Login

Verify admin user exists in database
Check password hash is correct


File Upload Issues

Ensure uploads directory exists
Check file permissions



Default Ports

Backend: http://localhost:5000
Frontend: http://localhost:5173

🤝 Contributing

Fork the repository
Create a feature branch: git checkout -b feature/new-feature
Commit changes: git commit -am 'Add new feature'
Push to branch: git push origin feature/new-feature
Submit a Pull Request

