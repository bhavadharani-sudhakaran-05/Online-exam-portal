# 🎓 Online Exam Portal – Java Full Stack Project

A full-stack Online Examination System built using Java (Spring Boot) for backend authentication and HTML, CSS, JavaScript for frontend exam management.
Designed with a clean architecture where the database is used only for authentication, while exam logic runs efficiently on the client side using LocalStorage.

## 🚀 Features
### 👨‍🎓 Student Module

- Secure student login using database authentication

- Session-based login (no JWT complexity)

- Online test taking with:

- Timer

- Multiple choice questions

- Automatic submission

- AI-based camera monitoring for malpractice detection

- Instant score calculation

- Exam data stored using browser LocalStorage

### 👩‍🏫 Teacher Module

- Secure teacher login

- Create and manage questions

- Set exam duration and question count

- View student scores

- Assign Pass / Fail status

- Download results as CSV

- All exam and result data handled using LocalStorage

### 🧠 Key Design Decisions

- ✅ Database used ONLY for login (students & teachers)

- ✅ HttpSession-based authentication

- ❌ No JWT / No unnecessary microservices

- ❌ No DB complexity for exams

- ✅ Faster execution using LocalStorage for exam flow

- ✅ Clean separation of concerns

This approach reduces server load and makes the system lightweight and scalable for small to medium use cases.

### 🛠️ Tech Stack
1. Backend (Java)

- Java 17

- Spring Boot

- Spring Data JPA

- MySQL

- Hibernate

2. REST APIs

- HttpSession Authentication

3. Frontend

- HTML5

- CSS3

- JavaScript (Vanilla JS)

4. LocalStorage API

- Fetch API

5. AI / Extra

- TensorFlow.js

- COCO-SSD (Object Detection)

- Browser Camera API

### 🏗️ Project Architecture
---
Online_Exam_Portal
│
├── backend (Spring Boot)
│   ├── config
│   │   └── CorsConfig.java
│   ├── controller
│   │   ├── AuthApiController.java
│   │   ├── UserSessionController.java
│   │   ├── TeacherAuthController.java
│   │   └── TeacherSessionController.java
│   ├── dto
│   │   ├── LoginRequest.java
│   │   └── LoginResponse.java
│   ├── entity
│   │   ├── User.java
│   │   └── Teacher.java
│   ├── repository
│   │   ├── UserRepository.java
│   │   └── TeacherRepository.java
│   └── OnlineexamApplication.java
│
└── frontend (static)
├── index.html
├── studlog.html
├── cam.html
├── teacherlog.html
└── teacher.html
---
### 🗄️ Database Schema (Minimal & Clean)
1. Users Table

- id

- login_id

- name

- email

- password

2. Teachers Table

- id

- login_id

- name

- password

All exam-related tables were intentionally removed to simplify the backend.

### 🔐 Authentication Flow

- User submits login credentials

- Spring Boot validates credentials from PostgreSQL

- HttpSession is created

- Session cookie maintained between frontend and backend

- Frontend handles exam logic independently

### ⚙️ Configuration
- application.properties
<br>
spring.datasource.url=jdbc:postgresql://localhost:5432/online_exam
spring.datasource.username=postgres
spring.datasource.password=********

spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=true

server.servlet.session.cookie.same-site=None
server.servlet.session.cookie.secure=false

### ▶️ How to Run the Project
1. Backend

- Clone the repository

- Open in IntelliJ / Eclipse

- Configure PostgreSQL database

2. Run:

mvn spring-boot:run

3. Frontend

- Open index.html using Live Server or browser

- Login as Student or Teacher

### 🎯 What This Project Demonstrates

- ✔ Java & Spring Boot fundamentals<br>
- ✔ REST API design<br>
- ✔ Session-based authentication<br>
- ✔ Database integration<br>
- ✔ Frontend-backend integration<br>
- ✔ Real-time monitoring logic<br>
- ✔ Clean code & architecture thinking<br>

### 👨‍💻 About Me

Aspiring Java Full Stack Developer (Fresher)
This project reflects my ability to build end-to-end applications with practical architectural decisions.

### 📌 Future Enhancements

- Password hashing (BCrypt)

- Role-based access control

- Cloud deployment

- Admin dashboard

- Real database-based exam storage (optional)

### ⭐ Final Note

This project was designed not just to work — but to showcase real-world thinking, making it ideal for Java Full Stack Developer fresher applications.
