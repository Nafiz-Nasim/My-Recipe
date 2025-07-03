const search = document.getElementById('search');
const submit = document.getElementById('submit');
const randomRecipeContainer = document.getElementById('randomRecipe');
const randomRecipetext= document.getElementById('rendomapirecipes');
const displayall= document.getElementById('displayall');

// Function to fetch random recipes
const randomrecipes = async () => {
    try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
        const data = await response.json();

        const recipe = data.meals[0];
        displayRecipe(recipe); 
    } catch (error) {
        console.error("Error fetching recipe:", error);
    }
};

const displayRecipe = (recipe) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = recipe[`strIngredient${i}`];
        const measure = recipe[`strMeasure${i}`];
        if (ingredient) {
            ingredients.push(`${ingredient} - ${measure}`);
        }
    }

    const recipeHTML = `
    <div class="sm:mx-20">
        <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}" class="w-full rounded-md mb-4 sm:m-10">
    </div>
   
    <div class="">
        <h2 class="text-xl font-semibold mb-2">${recipe.strMeal}</h2>
        <p class="text-gray-600 mb-4">Category: ${recipe.strCategory}</p>
        
        <!-- Ingredients Section -->
        <div class="ingredients mb-4">
            <h3 class="font-semibold text-lg">Ingredients</h3>
            <ul class="list-disc pl-5 text-gray-700">
                ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
            </ul>
        </div>

        <!-- Instructions Section -->
        <div class="instructions mb-4">
            <h3 class="font-semibold text-lg">Instructions</h3>
            <p class="text-gray-700">${recipe.strInstructions.slice(0, 200)}...</p>
        </div>
        <!-- See Full Details Link -->
        <a href="${recipe.strSource}" target="_blank" class="text-blue-500 hover:underline mt-4 inline-block">See Full Details</a>
    </div>
    `;

    randomRecipeContainer.innerHTML = recipeHTML;
};

// On window load, fetch random recipe
window.onload = randomrecipes;



// Submit button event listener
submit.addEventListener('click', (event) => {
    event.preventDefault();
    if (search.value) {   
        const searchValue = search.value.trim();  // Declare searchValue here
        searchAPI(searchValue);
        block();  // Hide the random recipe section
    } else {
        randomRecipeContainer.innerHTML = "<div><p>Enter something....</p></div>";  // Show message when input is empty
    }
});

// Function to block the visibility of the random recipe container
const block = () => {
    randomRecipeContainer.style.display = 'none';
 randomRecipetext.style.display='none';
      // Hides the div
};

// Function to unblock and make the recipe container visible again
const unblock = () => {
    randomRecipeContainer.style.display = 'block';  // Makes the div visible again
    randomRecipetext.style.display = 'block';  // Makes the div visible again
};
 // Search API function
const searchAPI = async (searchValue) => {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`);
        const data = await response.json();
        console.log(data);
displayALLdata(data);
    } catch (error) {
        console.error("Error fetching recipe:", error);
    }
};

const displayALLdata=(data)=>{
    displayall.innerHTML=` `;
 data.meals.forEach(element => {
    displayall.innerHTML+=`
    <div class="m-10 flex    max-w-xs max-h-48 overflow-hidden ">
    <img src="${element.strMealThumb}" class=" w-full h-full object-cover">
    
    </div>
   
     
    
    
    `
    
});

    
}