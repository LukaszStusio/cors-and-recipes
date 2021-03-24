console.log('Works fine.');

const proxy = 'https://cors-anywhere.herokuapp.com/';
const baseEndpoint = 'http://www.recipepuppy.com/api/';
const form = document.querySelector('form.search');
const recipesGrid = document.querySelector('.recipes');

async function fetchRecipes(query) {
    const res = await fetch(`${proxy}${baseEndpoint}?q=${query}`);
    const data = await res.json();
    return data;
};

function displayRecipes(recipes) {
    console.log('Creating html...');
    const html = recipes.map(
        recipe =>
        `<section class="recipe flex">
            <h2>${recipe.title}</h2>
            <p class="ingredients">${recipe.ingredients}</p>
            <div class="figure-wrapper">
                <figure>
                    ${recipe.thumbnail ?
                        `<img class="circle" title="${recipe.title}" width="100px" height="100px" src="${recipe.thumbnail}"
                        alt="${recipe.title}"/>` : `<img class="circle" width="100px" height="100px" src="img/poo.png"
                        title="no image available" alt="no image available"/>`
                    }
                </figure>
                <div class="recipe-link marked">
                <a href="${recipe.href}">View recipe</a>
                </div>
            </div>
        </section>`
    );
    recipesGrid.innerHTML = html.join('');
}

async function handleSubmit(e) {
    e.preventDefault();
    const element = e.currentTarget;
    console.log(element.query.value);

    // turn the form off
    element.submit.disabled = true;
    // submit the search
    const recipes = await fetchRecipes(element.query.value);
    console.log(recipes);
    element.submit.disabled = false;

    displayRecipes(recipes.results)
};

form.addEventListener('submit', handleSubmit);
fetchRecipes('pizza');