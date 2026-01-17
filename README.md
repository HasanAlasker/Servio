# 🚗 Servio

> **Smart Maintenance, Safer Drives.**  
> Empowering vehicle owners through intelligent tracking, timely reminders, and seamless service bookings.

---

## 🏷️ Badges

<p align="center">
  <img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React Native Badge"/>
  <img src="https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white" alt="Expo Badge"/>
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" alt="Express.js Badge"/>
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB Badge"/>
  <img src="https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=jsonwebtokens" alt="JWT Badge"/>
  <img src="https://img.shields.io/badge/Bcrypt-00599C?style=for-the-badge&logo=lock&logoColor=white" alt="Bcrypt Badge"/>
  <img src="https://img.shields.io/badge/Formik-FF6B6B?style=for-the-badge&logo=reacthookform&logoColor=white" alt="Formik Badge"/>
  <img src="https://img.shields.io/badge/Yup-2C3E50?style=for-the-badge" alt="Yup Badge"/>
  <img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white" alt="Figma Badge"/>
  <img src="https://img.shields.io/badge/Expo_Notifications-000020?style=for-the-badge&logo=android&logoColor=white" alt="Expo Notifications Badge"/>
</p>

---

## 📱 What is Servio?

**Servio** is a comprehensive cross-platform mobile application that revolutionizes vehicle maintenance management by connecting car owners with trusted service centers. The app helps drivers stay on top of **vehicle maintenance schedules, service bookings, and part replacements** — all while building a complete service history for every vehicle.

It's designed to simplify car ownership by sending **intelligent notifications** before maintenance is due, enabling **seamless appointment booking** with nearby service centers, and maintaining a **transparent review system** to help you choose the best shops for your needs.

---

## 🎯 Use Cases

### For Car Owners
- Track **multiple vehicles** with detailed maintenance histories
- Get automatic reminders when **parts need servicing** based on mileage or time
- **Book appointments** with nearby service centers directly through the app
- Browse **shop reviews and ratings** before choosing where to service your car
- Manage **upcoming services** with calculated intervals after each maintenance
- **Cancel pending appointments** before they're confirmed by the shop
- Report issues and submit suggestions to improve the platform

### For Shop Owners
- Register and manage your **service center** on the platform
- Receive **appointment requests** from car owners
- **Accept or decline bookings** based on your availability
- Build your reputation through **customer reviews**
- Manage shop information including **hours, location, and services offered**

### For Admins
- **Review and approve** new shop registrations
- Monitor **user reports** and resolve disputes
- Manage platform **suggestions and feedback**
- Oversee platform health and user activity

---

## ✨ Key Features

### 🚘 Multi-Vehicle Management
Register and manage multiple cars with detailed info — make, model, year, mileage, and comprehensive part tracking.

### 🔧 Smart Part Tracking
Track individual parts for each vehicle with automatic service interval calculations based on mileage and time since last change.

### 🔔 Intelligent Notifications
Receive push notifications for upcoming services with automatic calculation of next service dates after maintenance completion.

### 📅 Appointment Booking System
Browse available service centers, view their ratings and hours, and book appointments for one or multiple parts at once.

### 🏪 Service Center Directory
Discover nearby shops with detailed information including services offered, operating hours, location, and customer reviews.

### ⭐ Review & Rating System
Leave reviews and ratings for service centers after completing appointments to help other car owners make informed decisions.

### 👤 Role-Based Access
Three distinct user roles with tailored experiences:
- **Car Owners:** Full maintenance tracking and booking capabilities
- **Shop Owners:** Manage service center and handle appointment requests
- **Admins:** Platform oversight and shop approval workflow

### 🔑 Secure Authentication
Sign up and log in safely with **JWT** and **bcrypt** for password encryption, with role-based access control.

### 🧾 Complete Service History
Maintain digital records of every service, part change, appointment, and expense for easy reference and resale value.

### 🚨 Report & Feedback System
Report problematic users or shops, and submit suggestions to help improve the platform.

### ✅ Robust Form Validation
Reliable input handling with **Formik**, **Yup**, and **Joi** to ensure data integrity across all forms.

---

## 🛠 Tech Stack

| Layer              | Technology                                                                                                                                                                                        | Description                           |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| **UI/UX**          | ![Figma](https://img.shields.io/badge/Figma-F24E1E?style=flat&logo=figma&logoColor=white)                                                                                                         | Modern design and prototyping         |
| **Frontend**       | ![React Native](https://img.shields.io/badge/React_Native-20232A?style=flat&logo=react&logoColor=61DAFB) + ![Expo](https://img.shields.io/badge/Expo-000020?style=flat&logo=expo&logoColor=white) | Cross-platform mobile development     |
| **Backend/API**    | ![Express.js](https://img.shields.io/badge/Express.js-404D59?style=flat)                                                                                                                          | RESTful API using Node.js             |
| **Database**       | ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white)                                                                                                   | NoSQL database for scalable storage   |
| **Validation**     | ![Joi](https://img.shields.io/badge/Joi-FFD43B?style=flat) ![Formik](https://img.shields.io/badge/Formik-FF6B6B?style=flat) ![Yup](https://img.shields.io/badge/Yup-2C3E50?style=flat)            | Robust schema-based validation        |
| **Authentication** | ![JWT](https://img.shields.io/badge/JWT-black?style=flat&logo=jsonwebtokens) ![Bcrypt](https://img.shields.io/badge/Bcrypt-00599C?style=flat)                                                     | Secure login and user data protection |
| **Notifications**  | ![Expo Notifications](https://img.shields.io/badge/Expo_Notifications-3DDC84?style=flat&logo=android&logoColor=white)                                                                             | Local and push alerts for reminders   |

---

## ⚙️ How It Works

### For Car Owners:

1. **Register Your Vehicle** – Add car details including make, model, year, and current mileage
2. **Track Parts** – Add parts with their last service date and mileage
3. **Receive Service Reminders** – Get notified when parts are due for maintenance
4. **Browse Service Centers** – View nearby shops with ratings, reviews, and availability
5. **Book Appointments** – Select a shop and schedule service for one or multiple parts
6. **Confirm Service Completion** – Mark appointments as complete to auto-calculate next service interval
7. **Leave Reviews** – Rate and review the service center to help other users

### For Shop Owners:

1. **Register Your Shop** – Submit shop details for admin approval
2. **Manage Shop Profile** – Update hours, location, and services offered
3. **Receive Booking Requests** – Get notified of new appointment requests
4. **Accept/Decline Appointments** – Manage your schedule and workload
5. **Build Reputation** – Earn reviews and ratings from satisfied customers

### For Admins:

1. **Review Shop Applications** – Approve or reject new service center registrations
2. **Monitor Reports** – Handle user reports and disputes
3. **Review Suggestions** – Process platform improvement suggestions
4. **Oversee Platform** – Maintain platform integrity and user satisfaction

---

## 🧱 Architecture Overview

### Database Schema
The application uses MongoDB with the following key collections:

- **Users:** Base user information with role-based polymorphism (CarOwner, ShopOwner, Admin)
- **Cars & Parts:** Vehicle tracking with detailed part maintenance history
- **Upcoming Services:** Auto-calculated service reminders based on intervals
- **Shops:** Service center directory with approval workflow
- **Appointments:** Booking system linking car owners, shops, and parts
- **Reviews:** Rating and feedback system for service centers
- **Reports & Suggestions:** User feedback and platform improvement system

### Key Workflows

**Service Reminder Flow:**
1. User manually logs initial part service
2. System calculates next service based on mileage/time intervals
3. Notification sent when service is due
4. User books appointment with a shop
5. After service completion, user confirms and system recalculates next interval

**Shop Approval Flow:**
1. Shop owner registers and submits shop details
2. Admin reviews application
3. Admin approves/rejects shop
4. Approved shops appear in car owner searches

**Appointment Flow:**
1. Car owner browses shops and creates appointment
2. Shop owner receives notification
3. Shop owner accepts/declines
4. Car owner can cancel if still pending
5. After completion, car owner can leave review

---

## 🧭 Project Goals

- Connect car owners with **trusted, rated service centers**
- Promote **timely maintenance** through automated tracking and reminders
- Reduce **manual scheduling** through seamless appointment booking
- Build a **transparent marketplace** with reviews and ratings
- Ensure **platform quality** through admin oversight and shop approval
- Provide a **clean, bilingual, and user-friendly interface**
- Maintain **data privacy and security** through role-based access control

---

## 📸 Screenshots

> 🚧 Coming soon — sneak peeks of:
> - Multi-vehicle dashboard
> - Part tracking and service history
> - Shop directory and booking interface
> - Appointment management
> - Review and rating system
> - Admin approval panel

---

## 🔒 Licensing & Usage

Servio is a **private academic project**.  
Redistribution, copying, or reuse of source code, assets, or designs is **strictly prohibited** without prior consent.

---

## 👨‍💻 Author

**Hasan Alasker**  
Full-Stack Mobile Developer | UI/UX Designer  
🌐 [Portfolio Website](https://hasan-alasker.netlify.app/)  
📧 [hasanalasker.contact@gmail.com](mailto:hasanalasker.contact@gmail.com)  
💼 [LinkedIn](https://www.linkedin.com/in/hasan-alasker-58682335a/)

---

> **Smarter maintenance, better service.**  
> Connect with trusted shops and keep your car cared for — with **Servio**.
