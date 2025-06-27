# 🏋️‍♂️ MERN Stack Fitness App

This is a **MERN stack fitness app** with:

✅ **Admin Panel**:
- Secure login
- Manage members (CRUD)
- Manage classes (CRUD)
- Upload workout plans (PDFs) and assign to members

✅ **Member Panel**:
- Register and log in
- View available classes
- View assigned workout plans

---

## 📂 Tech Stack

- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Frontend:** React.js, Tailwind CSS
- **Auth:** JWT tokens
- **File Uploads:** Multer

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://your-repo-url.git
cd fitness-app
2️⃣ Backend Setup
Navigate to the backend folder:

bash
Copy
Edit
cd backend
Install dependencies:

bash
Copy
Edit
npm install
Create a .env file:

env
Copy
Edit
PORT=5000
MONGO_URI=mongodb://localhost:27017/fitness_app
JWT_SECRET=your_jwt_secret_key
Run the server:

bash
Copy
Edit
npm run dev
3️⃣ Frontend Setup
Open a new terminal and navigate to the frontend folder:

bash
Copy
Edit
cd fitness-app
Install dependencies:

bash
Copy
Edit
npm install
Run the frontend:

bash
Copy
Edit
npm start
✨ Features Overview
🔑 Authentication
Admin & Member authentication with JWT

Roles enforced:

Admin: Can manage everything

Member: Limited to viewing their data

👤 Admin Registration & Login
⚠️ Important:
There is no public endpoint to register an Admin.
You must create the first Admin manually in the database.

➡️ How to Create an Admin Manually:
Open MongoDB Compass or shell.

Hash a password using Node.js REPL:

javascript
Copy
Edit
const bcrypt = require("bcryptjs");
bcrypt.hashSync("yourpassword", 10);
Copy the hashed password.

Insert a new user:

javascript
Copy
Edit
db.users.insertOne({
  name: "Admin User",
  email: "admin@example.com",
  password: "<hashed_password>",
  role: "admin",
  assignedWorkoutPlans: [],
  selectedClasses: []
})
Log in as Admin at:

bash
Copy
Edit
http://localhost:3000/admin/login
🧑‍💼 Member Registration & Login
Members can self-register:

bash
Copy
Edit
http://localhost:3000/register
Or Admins can create members in the Admin Dashboard.

Members log in at:

bash
Copy
Edit
http://localhost:3000/login
🗂️ Admin Dashboard
Accessible after admin login:

bash
Copy
Edit
http://localhost:3000/admin/dashboard
Features:

✅ Manage Members (Create, Edit, Delete)

✅ Manage Classes (Create, Edit, Delete)

✅ Upload Workout Plans and assign them to members

🏠 Member Dashboard
Accessible after member login:

bash
Copy
Edit
http://localhost:3000/dashboard
Features:

✅ View available classes

✅ View assigned workout plans (PDFs)

📂 File Uploads
Uploaded workout plans are stored in:

bash
Copy
Edit
/backend/uploads
They are accessible via URLs:

bash
Copy
Edit
http://localhost:5000/uploads/filename.pdf
✅ API Overview
Here is a quick reference:

Auth
POST /api/auth/register - Member registration

POST /api/auth/login - Login for Admin or Member

Classes
GET /api/classes - List all classes (public)

POST /api/classes - Create class (Admin only)

PUT /api/classes/:id - Update class (Admin only)

DELETE /api/classes/:id - Delete class (Admin only)

Members
GET /api/members - List all members (Admin only)

POST /api/members - Create member (Admin only)

PUT /api/members/:id - Update member (Admin only)

DELETE /api/members/:id - Delete member (Admin only)

Workout Plans
GET /api/plans/:memberId - Get member's plans

GET /api/plans - List all plans (Admin only)

POST /api/plans - Upload a plan (Admin only)

📝 Notes
✅ You must have MongoDB running locally (mongodb://localhost:27017) or adjust MONGO_URI in .env.

✅ For production deployment:

Use environment variables

Serve frontend via Express or a static host

Set proper CORS policies

✅ Default ports:

Backend: 5000

Frontend: 5173

