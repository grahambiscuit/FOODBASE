
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";


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
const db = getFirestore(app);


const logoutBtn = document.getElementById('logoutBtn');
const addRecipeBtn = document.getElementById('addRecipeBtn');
const recipeList = document.getElementById('recipeList');
const recipeTitle = document.getElementById('recipeTitle');
const recipeIngredients = document.getElementById('recipeIngredients');
const recipeDescription = document.getElementById('recipeDescription');


onAuthStateChanged(auth, user => {
  if (!user) window.location.href = "login.html";
});


logoutBtn.addEventListener('click', () => {
  signOut(auth).then(() => window.location.href = "login.html");
});


addRecipeBtn.addEventListener('click', async () => {
  const title = recipeTitle.value.trim();
  const ingredients = recipeIngredients.value.trim();
  const description = recipeDescription.value.trim();

  if (!title || !ingredients || !description) return;

  try {
    await addDoc(collection(db, "recipes"), {
      title,
      ingredients,
      description,
      createdAt: new Date()
    });

    recipeTitle.value = "";
    recipeIngredients.value = "";
    recipeDescription.value = "";
    loadRecipes();
  } catch (e) {
    console.error("Error adding recipe: ", e);
  }
});


async function loadRecipes() {
  const querySnapshot = await getDocs(collection(db, "recipes"));
  recipeList.innerHTML = "";

  querySnapshot.forEach((docSnap) => {
    const recipe = docSnap.data();
    const card = document.createElement('div');
    card.className = "recipe-card";
    card.dataset.id = docSnap.id;

    const ingredientsArray = recipe.ingredients.split(/[\n,]+/).map(i => i.trim()).filter(i => i !== "");
    const ingredientsList = ingredientsArray.map(i => `<li>${i}</li>`).join('');

    card.innerHTML = `
      <h3>${recipe.title}</h3>
      <button class="toggle-btn">Show Details</button>
      <div class="details">
        <p><strong>Ingredients:</strong></p>
        <ul>${ingredientsList}</ul>
        <p>${recipe.description}</p>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
      </div>
    `;
    recipeList.appendChild(card);
  });
}


recipeList.addEventListener('click', async (e) => {
  const card = e.target.closest('.recipe-card');
  if (!card) return;
  const id = card.dataset.id;

  
  if (e.target.classList.contains('toggle-btn')) {
    const details = card.querySelector('.details');
    if (details.style.display === "block") {
      details.style.display = "none";
      e.target.textContent = "Show Details";
    } else {
      details.style.display = "block";
      e.target.textContent = "Hide Details";
    }
  }

  
  if (e.target.classList.contains('delete-btn')) {
    if (confirm("Are you sure you want to delete this recipe?")) {
      await deleteDoc(doc(db, "recipes", id));
      loadRecipes();
    }
  }

  
  if (e.target.classList.contains('edit-btn')) {
    const recipeRef = doc(db, "recipes", id);
    const newTitle = prompt("Edit title:", card.querySelector('h3').textContent);
    const newIngredients = prompt("Edit ingredients:", card.querySelector('.details ul').textContent.replace(/\n/g, ','));
    const newDesc = prompt("Edit description:", card.querySelector('.details p:last-of-type').textContent);

    if (newTitle && newIngredients && newDesc) {
      await updateDoc(recipeRef, {
        title: newTitle,
        ingredients: newIngredients,
        description: newDesc
      });
      loadRecipes();
    }
  }
});


loadRecipes();


