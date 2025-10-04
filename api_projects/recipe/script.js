const movieContainer = document.getElementById("recipes-container");
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const modalBody = document.getElementById("recipe-modal-body");

const myModal = new bootstrap.Modal(document.getElementById("recipe-modal"));

// ✅ Show recipe details inside modal properly
const openRecipeModal = (recipe) => {
  modalBody.innerHTML = `
    <div class="text-center">
          <h2 class="text-center my-2">${recipe.strMeal}</h2>
      <img src="${recipe.strMealThumb}" class="img-fluid rounded mb-3" alt="${recipe.strMeal}">
      <p><strong>Category:</strong> ${recipe.strCategory}</p>
      <p><strong>Area:</strong> ${recipe.strArea}</p>
      <h6 class="mt-3">Instructions:</h6>
      <p>${recipe.strInstructions}</p>
    </div>
  `;
  myModal.show();
};

// ✅ Display recipe cards
const displayRecipes = (recipes) => {
  movieContainer.innerHTML = "";

  if (!recipes) {
    movieContainer.innerHTML = `<h2 class="text-center text-muted">No recipes found</h2>`;
    return;
  }

  recipes.forEach((recipe) => {
    const card = document.createElement("div");
    card.className = "col-sm-6 col-md-4 col-lg-3 mb-4";

    card.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img src="${recipe.strMealThumb}" class="card-img-top" alt="${recipe.strMeal}" />
        <div class="card-body text-dark d-flex flex-column">
          <h5 class="card-title">${recipe.strMeal}</h5>
          <p class="card-text mb-1"><strong>Category:</strong> ${recipe.strCategory}</p>
          <p class="card-text mb-3"><strong>Area:</strong> ${recipe.strArea}</p>
          <button class="btn btn-danger mt-auto view-recipe-btn">View Recipe</button>
        </div>
      </div>
    `;

    // ✅ Attach modal trigger dynamically (avoid inline JS)
    card.querySelector(".view-recipe-btn").addEventListener("click", () => {
      openRecipeModal(recipe);
    });

    movieContainer.appendChild(card);
  });
};

// ✅ Fetch recipes from API
const fetchRecipes = async (query) => {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
    );
    const data = await response.json();
    displayRecipes(data.meals);
  } catch (error) {
    alert("Error fetching recipes. Please try again later.");
    console.error("Error fetching recipes:", error);
  }
};

// ✅ Search form handler
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = searchInput.value.trim();
  if (searchTerm) {
    fetchRecipes(searchTerm);
    searchInput.value = "";
  }
});
