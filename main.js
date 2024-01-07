const searchInput = document.querySelector(".search-input")
const searchButton = document.querySelector("#search-butt")
const mealContain = document.querySelector(".meal-contain")
const mealDetails = document.querySelector(".meal-details")

searchButton.addEventListener('click', getRecipe)
mealContain.addEventListener('click', getRecipeDetails)
mealDetails.addEventListener('click', closeDetails)

function getRecipe() {
    const searchButtonTerm = searchInput.value.trim()
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchButtonTerm} `
    fetch(url)
        .then((res) => {
            if (res.ok) return res.json()
        })
        .then((data) => {
            showRecipe(data)
        })
}

const showRecipe = (recipe) => {
    mealContain.innerHTML = ""
    if (recipe.meals == null) {
        mealContain.innerHTML = `
        <span class="not-data">
        There is no data to display
        </span>
        `
        return
    }

    recipe.meals.forEach(recipe => {
        mealContain.innerHTML += `
                    <div class="item-cart">
                        <div class="image">
                            <img src="${recipe.strMealThumb}" alt="">
                        </div>
                        <h3>
                        ${recipe.strMeal}
                        </h3>
                        <button  data-id=${recipe.idMeal} class="recipe" id="recipe"> recipe </button>
                    </div>
        `
    });
}

function getRecipeDetails(e) {
    if (e.target.classList.contains('recipe')) {
        const id = e.target.getAttribute('data-id')
        const apiUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id} `
        fetch(apiUrl)
            .then((res) => {
                if (res.ok) return res.json()
            })
            .then((data) => {
                showRecipeDetails(data)
            })
    }
}

const showRecipeDetails = (recipeProduct) => {
    const item = recipeProduct.meals[0]
    mealDetails.classList.remove("show-details")
    mealDetails.innerHTML = ""
    mealDetails.innerHTML =
        `
            <div class="close">
                    <i class="fa-solid fa-xmark"></i>
                </div>
                <div class="details-contain">
                    <h2>${item.strMeal}</h2>
                    <h3>${item.strCategory}</h3>
                    <h4>instructions</h4>
                    <p>
                        ${item.strInstructions}
                    </p>
                    <div class="image">
                        <img src="${item.strMealThumb}" alt="">
                    </div>
            </div>
    `
}

function closeDetails (e){
    if (e.target.classList.contains("fa-xmark")) {
        e.target.parentElement.parentElement.classList.add("show-details")
    }
    
}