

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";


const firebaseConfig = {
  apiKey: "AIzaSyBFCRI4SK-eiyzOEvx3XZ4-fNjtTYg4Vqw",
  authDomain: "recipebook-fa273.firebaseapp.com",
  projectId: "recipebook-fa273",
  storageBucket: "recipebook-fa273.firebasestorage.app",
  messagingSenderId: "904912343366",
  appId: "1:904912343366:web:74ae199db824e1fe7d5547",
  measurementId: "G-VM7D6L0KDC"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const logoutBtn = document.getElementById('logoutBtn');
const navLinks = document.querySelectorAll('header nav a');


onAuthStateChanged(auth, user => {
  if (!user) window.location.href = "login.html";
});


logoutBtn.addEventListener('click', () => {
  signOut(auth).then(() => window.location.href = "login.html");
});


navLinks.forEach(link => {
  if (link.href === window.location.href) {
    link.style.display = 'none';
  }
});

