import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

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


const signupBtn = document.getElementById('signupBtn');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const errorMessage = document.getElementById('error-message');

signupBtn.addEventListener('click', () => {
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const confirmPassword = confirmPasswordInput.value.trim();

  if (!name || !email || !password || !confirmPassword) {
    errorMessage.textContent = "Please fill in all fields.";
    return;
  }
  if (password !== confirmPassword) {
    errorMessage.textContent = "Passwords do not match.";
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      updateProfile(userCredential.user, { displayName: name });
      window.location.href = "login.html";
    })
    .catch(error => {
      errorMessage.textContent = error.message;
    });
});

