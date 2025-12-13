
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";


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


const loginBtn = document.getElementById('loginBtn');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const errorMessage = document.getElementById('error-message');


onAuthStateChanged(auth, user => {
  if(user) window.location.href = "homepage.html";
});


loginBtn.addEventListener('click', () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      window.location.href = "homepage.html";
    })
    .catch(error => {
      errorMessage.textContent = error.message;
    });
});
