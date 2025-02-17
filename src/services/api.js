// **********CODIGO PARA LLAMADO A API

export const fetchRecipesLocal = async () => {
  try {
    const response = await fetch(
      'https://www.themealdb.com/api/json/v1/1/search.php?s='
    );
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error('Error fetching recipe: ', error);
    return [];
  }
};

//DEVUELVE LA LISTA DE CATEGORIAS
export const fetchCategories = async () => {
  const response = await fetch(
    'https://www.themealdb.com/api/json/v1/1/list.php?c=list'
  );
  const data = await response.json();
  return data.meals.map((c) => c.strCategory);
};

//DEVUELVE LA LISTA DE AREAS
export const fetchAreas = async () => {
  const response = await fetch(
    'https://www.themealdb.com/api/json/v1/1/list.php?a=list'
  );
  const data = await response.json();
  return data.meals.map((a) => a.strArea);
};

//DEVUELVE LA LISTA DE INGREDIENTES
export const fetchIngredients = async () => {
  try {
    const allIngredients = new Set();
    const response = await fetch(
      'https://www.themealdb.com/api/json/v1/1/search.php?s='
    );
    const data = await response.json();

    if (!data.meals) return [];//EVITA ERRORES SI LA API NO DEVUELVE DATOS 

    //RECORRE TODAS LAS RECETAS Y EXTRAE LOS INGREDIENTES
    data.meals.forEach((recipe) => {
      for (let i = 1; i <= 20; i++) {
        const ingredient = recipe[`strIngredient${i}`];
        if (ingredient) {
          allIngredients.add(ingredient.trim()); // AGREGA EL INGREDIENTE SIN ESPACIOS EXTRA
        }
      }
    });
    // CONVIERTE EN ARRAY Y ORDENA ALFABETICAMENTE
    return Array.from(allIngredients).sort();
  } catch {
    console.error('Error al obtener ingredientes:', error);
    return [];
  }
};

//  //**************** CODIGO PARA ARCHIVO JSON ***************
//  import recipesData from './recipeList.json';

//  /*DEVUELVE LAS RECETAS COMPLETAS DESPUES DE 5 MS PARA SIMULAR UN LLAMADO A LA API
//  export const fetchRecipesLocal = async () => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(recipesData.meals);
//     }, 500);
//   });
// };*/

// //DEVUELVE TODAS LAS RECETAS COMPLETAS
// export const fetchRecipesLocal = async () => {
//   return recipesData.meals;
// };

// //DEVUELVE LA LISTA DE CATEGORIAS
// export const fetchCategories = async () => {
//   return recipesData.categories;
// };

// //DEVUELVE LA LISTA DE LUGARES
// export const fetchAreas = async () => {
//   return recipesData.areas;
// };
// */

// //DEVUELVE LA LISTA DE INGREDIENTES
// export const fetchIngredients = async () => {
//   const allIngredients = new Set();

//   //RECORRE TODAS LAS RECETAS Y EXTRAE LOS INGREDIENTES
//   recipesData.meals.forEach((recipe) => {
//     for (let i = 1; i <= 20; i++) {
//       const ingredient = recipe[`strIngredient${i}`];
//       if (ingredient) {
//         allIngredients.add(ingredient.trim()); // AGREGA EL INGREDIENTE SIN ESPACIOS EXTRA
//       }
//     }
//   });
//   // CONVIERTE EN ARRAY Y ORDENA ALFABETICAMENTE
//   return Array.from(allIngredients).sort();
// };
