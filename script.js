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




submit.addEventListener('click', (event) => {
    event.preventDefault();
    if (search.value) {   
        const searchValue = search.value.trim();  
        searchAPI(searchValue);
        block(); 
    } else {
        randomRecipeContainer.innerHTML = "<div><p>Enter something....</p></div>"; 
    }
});


const block = () => {
    randomRecipeContainer.style.display = 'none';
 randomRecipetext.style.display='none';
     
};


const unblock = () => {
    randomRecipeContainer.style.display = 'block';  
    randomRecipetext.style.display = 'block';  
};

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

const displayALLdata = (data) => {
    const displayall = document.getElementById("displayall");
    displayall.innerHTML = "";  // Clear any existing content

    data.meals.forEach(element => {
        displayall.innerHTML += `
        <div class="m-5 p-5 bg-white border rounded-lg hover:shadow-lg hover:shadow-2xl">
            <div class="flex justify-center mb-4">
                <img src="${element.strMealThumb}" class="w-full h-48 object-cover rounded-lg" alt="${element.strMeal}">
            </div>
            <div class="text-center">
                <h3 class="text-lg font-semibold text-gray-800">${element.strMeal}</h3>
                <p class="text-sm text-gray-500 mt-2">${element.strCategory}</p>
                <p class="text-xs text-gray-400 mt-1">${element.strArea}</p>
                <!-- 'See More' Button -->
                <button class="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
    <a href="src/recipe.html?id=${element.idMeal}" class="text-white">See More</a>
</button>

            </div>
        </div>
        `;
    });
}



