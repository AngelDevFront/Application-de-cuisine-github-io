// les 3 1 ere ligne js sélectionne des éléments spécifique dans le document html et les stockes dans des variables pour une utilisation plus tard dans le script.
const result = document.getElementById("result");
const form = document.querySelector("form");
const input = document.querySelector("input");
let meals = []; // declare une variable et avec une valeur initiale vide  dans se cas un tableau vide. qui stockera des données par la suite

// cette fonction envoie une requête a une api pour récupérer des information d'un terme de recherche donné puis stocke ses information dans la variable meals
async function fetchMeals(search) {
  await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`) // va aller chercher les info sur l'api publique
    .then((res) => res.json()) // la il prend la réponse de la requête et la transform en fichier json
    .then((data) => (meals = data.meals)); // et ici récupère les données json renvoyée par l'api et les assigne a la variable meals

  console.log(meals); // permet d'afficher dans la console le contenu de la variable définie ce qui permet de vérifier que les données on été correctement récupérée
}
// affiche les données demander dans l'interface utilisateur
function mealsDisplay() {
  if (meals === null) {
    result.innerHTML = "<h2>Aucun résultat</h2>"; // si le résultat est null sa affiche le message aucun résultat
  } else {
    meals.length = 12; // si le résultat n'est pas nul alors sa affiche les données trouver meals.length permis d'afficher seulement le nombre défini d'élément dans se cas seulement les 12 premier repas seront affiché

    // permet de rajouter des élément au fichier html directement a partir de JS
    result.innerHTML = meals
      .map((meal) => {
        let ingredients = [];

        for (let i = 1; i < 21; i++) {
          // est utilisée pour répété la séquence de 1 a 20
          //
          if (meal[`strIngredient${i}`]) {
            // vérifie si il y a bien une données
            let ingredient = meal[`strIngredient${i}`]; // récupère le nom de l'ingredient
            let measure = meal[`strMeasure${i}`]; // récupère la mesure associée a l'ingrédient

            ingredients.push(`<li>${ingredient} - ${measure}</li>`); // ajoute une balise li contenant le nom et la mesure de l'ingrédient au tableau
          }
        }
        //  génère une chaîne de caractères HTML représentant une carte pour chaque élément puis concatène toutes ces chaines de caractère en une seule grande chaîne HTML qui peut être insérée dans le document HTML pour afficher les repas dans l'interface utilisateur.
        return `
          <li class="card">
            <h2>${meal.strMeal}</h2>
            <p>${meal.strArea}</p>
            <img src=${meal.strMealThumb} alt="photo ${meal.strMeal}">
            <ul>${ingredients.join("")}</ul>
          </li>
          `;
      })
      .join("");
  }
}
// a chaque changement de texte dans le champ de saisie sa appel la fonction fetchmeals avec la nouvelle valeur ce qui va permettre de rechercher automatiquement les repas en fonction du texte saisi par l'utilisateur
input.addEventListener("input", (e) => {
  fetchMeals(e.target.value);
});

// lorsque le formulaire est soumis empêche le comportement par défaut du formulaire ( se réinitialisé)
form.addEventListener("submit", (e) => {
  e.preventDefault();
  mealsDisplay();
});
