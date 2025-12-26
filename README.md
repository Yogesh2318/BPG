🌱 Balcony Plant Gaming App

A gamified sustainability-focused web application that encourages users to grow and maintain balcony plants while competing with friends and contributing to CO₂ neutralization awareness.
The app blends plant care simulation, daily streaks, and real-time multiplayer features to make eco-friendly habits fun and engaging.

✨ Key Features
🔐 Authentication & Security

User Login & Signup using JWT-based authentication

Secure protected routes for authenticated users

Encrypted and validated user data

🌿 Plant Management

Add plants to your personal balcony

Update daily water intake and mineral nutrients

Track plant health based on consistency and care

Each plant contributes to the user’s sustainability score

🏡 Balcony Simulation

Sunlight-based simulation for placing plants

Users can arrange plants in their virtual balcony

Plant growth depends on placement and care patterns

🔥 Daily Streak System

Maintain daily care streaks

Missing updates breaks the streak

Streaks unlock achievements and increase eco-score

🌍 CO₂ Neutralization Focus

Each plant contributes to CO₂ absorption metrics

Users can track how “eco-positive” they are

Encourages climate-friendly habits through gameplay

👤 User Profile

View personal stats (plants, streaks, CO₂ score)

Track growth history and achievements

Display competitive rankings

🤝 Friends & Competition

Add friends within the app

Compete based on:

Plant health

Daily streaks

CO₂ neutralization score

⚡ Real-Time Multiplayer (Socket.IO)

Real-time updates for:

Friend activity

Competition stats

Live challenges

Implemented using Socket.IO (Backend completed)

🛠️ Tech Stack
Frontend

React

TypeScript

Component-based UI architecture

API integration for real-time updates

Backend

Node.js

Express.js

JWT Authentication

Socket.IO for real-time communication

RESTful APIs

Database

MongoDB

🧩 Architecture Overview

Frontend (React + TypeScript)
        |
        | REST APIs / WebSockets
        |
Backend (Node.js + Express)
        |
        | JWT Auth / Socket.IO
        |
MongoDB (Users, Plants, Friends, Stats)

Mongoose ODM

Structured schemas for users, plants, streaks, and friends



🌟 Project Vision

This project aims to:

Promote sustainable living

Encourage daily eco-friendly habits

Make environmental responsibility fun and competitive



📈 Future Enhancements

AI-based plant health recommendations

Mobile app version

Seasonal plant challenges

Leaderboards at city/state level

Integration with real-world weather data
