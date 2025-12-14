# Foodbase Web App

## Overview
Foodbase is a simple web app where you can add, view, edit, and delete recipes.
The app uses Firebase Firestore to store recipes so they persist online.

## Features
- Add recipes with title, ingredients, and description
- View recipes with collapsible details
- Edit or delete recipes
- Firebase Firestore integration for storing recipes
- Simple and clean UI

## Setup Instructions
1. Clone or download the project to your local machine.
2. Install Firebase SDK: The project uses Firebase CDN, so no installation is required.
3. Configure Firebase:
   - Go to Firebase Console and create a new project.
   - Enable Authentication (Email/Password).
   - Enable Firestore Database in test mode.
   - Copy your Firebase config and replace the values in `homepage.js`
     (or `firebase.js` if separated).
4. Run the project:
   - Open `login.html` in your browser.
   - Register or log in to access the homepage.
   - Add recipes and see them stored in Firestore.

## Firestore Structure
- Collection: `recipes`
- Document Fields:
  - `title` (string) – Recipe title
  - `ingredients` (string) – Ingredients separated by commas or line breaks
  - `description` (string) – Recipe description
  - `createdAt` (timestamp) – Date added

## Project Structure
```text
foodbase/
│
├── homepage.html / index.html
├── login.html
├── signup.html
├── about.html
│
├── homepage.css
├── login.css
├── signup.css
├── about.css
│
├── homepage.js
├── login.js
├── signup.js
├── about.js
│
└── README.md


Usage
1. Log in or sign up.
2. Add recipes with title, ingredients, and description.
3. View recipes and expand details.
4. Edit or delete recipes.
5. Click About Us for project info.

<img width="1539" height="478" alt="image" src="https://github.com/user-attachments/assets/910182a1-7c50-43ff-ab42-7704df0c6b35" />



