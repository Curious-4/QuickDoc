# 🏥 QuickDoc – Doctor Appointment System

QuickDoc is a full-stack doctor appointment web application built using the **MERN stack**. It allows users to book appointments with doctors, while doctors and admins manage their profiles, availability, and appointments through a dedicated portal.

---

## 🛠 Tech Stack

- **Frontend**: React.js, Redux Toolkit, Axios, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Cloud Storage**: Cloudinary
- **Authentication**: JWT (JSON Web Token)
- **File Upload**: Multer

---

## 🔐 Features

### 🔸 User
- Register/Login with secure password hashing (`bcrypt`)
- View list of available doctors
- Book doctor appointments
- Update profile and avatar (stored on Cloudinary)

### 🔸 Doctor
- Login and manage own profile
- View booked appointments
- Accept or reject appointment requests

### 🔸 Admin
- Admin Dashboard
- View all users and doctors
- Approve/reject doctor applications
- Manage system-wide roles

---

## 🔁 Authentication & Authorization

- Uses **JWT** for stateless authentication.
- Role-based access control:
  - User, Doctor, Admin roles with protected routes.
- Passwords are hashed with **bcrypt** before storage.

---

## 📦 File Uploads

- User and doctor profile pictures are uploaded via **Multer** middleware.
- Images are stored on **Cloudinary**, and the image URLs are saved in MongoDB.

---

## 📁 Project Structure

/backend
├── controllers/
├── models/
├── routes/
├── middleware/
└── utils/

/frontend
├── components/
├── pages/
├── redux/
└── assets/

---

## 🚀 Deployment & Environment

### 🔧 Environment Variables (`.env`)
```env
MONGO_URI=<your_mongo_uri>
JWT_SECRET=<your_jwt_secret>
CLOUDINARY_CLOUD_NAME=<your_cloud_name>
CLOUDINARY_API_KEY=<your_api_key>
CLOUDINARY_API_SECRET=<your_api_secret>
