import { useEffect, useState } from 'react';
import {
  fetchAreas,
  fetchCategories,
  fetchIngredients,
  fetchRecipesLocal,
} from '../services/api';
import RecipeCard from './RecipeCard';
import SearchBar from './SearchBar';
import MenuList from './MenuList';
import FilterBar from './FilterBar';
import RecipeDetails from './RecipeDetails';

function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [menu, setMenu] = useState(() => {
    const storedMenu = localStorage.getItem('menu');
    return storedMenu ? JSON.parse(storedMenu) : [];
  }); //EL VALOR INICIAL DE MENU ES LO QUE HAY EN EL LOCALSTORAGE SI NO HAY NADA INICIA CON []

  //ESTADOS PARA FILTROS
  const [categories, setCategories] = useState([]);
  const [areas, setAreas] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [selectedIngredient, setSelectedIngredient] = useState('');

  const [selectedRecipe, setSelectedRecipe] = useState(null);

  //CARGAR RECETAS
  useEffect(() => {
    const loadRecipes = async () => {
      //const data = await fetchRandomRecipe();
      const data = await fetchRecipesLocal();
      setRecipes(data);
      console.log('Recetas obtenidas: ', data);
    };

    const loadFilters = async () => {
      setCategories(await fetchCategories());
      setAreas(await fetchAreas());
      setIngredients(await fetchIngredients());
    };

    loadRecipes();
    loadFilters();
  }, []);

  //CARGAR RECETAS EN EL LOCAL STORAGE AL INICIO
  useEffect(() => {
    const storedMenu = localStorage.getItem('menu');
    if (storedMenu) {
      setMenu(JSON.parse(storedMenu));
    }
  }, []);

  //GUARDAR EL MENU EN EL LOCAL STORAGE CUANDO CAMBIE
  useEffect(() => {
    localStorage.setItem('menu', JSON.stringify(menu));
  }, [menu]);

  //FILTRAR RECETAS POR NOMBRE
  const filteredRecipes = recipes.filter((recipe) => {
    // CONVERTIMOS TODOS LOS INGREDIENTES EN UN ARRAY
    const recipeIngredients = Array.from({ length: 20 }, (_, i) => i + 1)
      .map((i) => recipe[`strIngredient${i}`])
      .filter(Boolean); //FILTRA VALORES VACIOS O UNDEFINED
    return (
      (searchTerm === '' ||
        recipe.strMeal.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategory === '' || recipe.strCategory === selectedCategory) &&
      (selectedArea === '' || recipe.strArea === selectedArea) &&
      (selectedIngredient === '' ||
        recipeIngredients.includes(selectedIngredient))
    );
  });

  //AGREGAR RECETA AL MENU SI NO ESTA REPETIDA
  const addToMenu = (recipe) => {
    if (!menu.find((r) => r.idMeal === recipe.idMeal)) {
      setMenu([...menu, recipe]);
    }
  };

  //ELIMINAR RECETA DE MI MENU
  const removeFromMenu = (idMeal) => {
    setMenu(menu.filter((recipe) => recipe.idMeal !== idMeal));
  };

  //LIMPIAR MI MENU
  const clearMenu = () => {
    setMenu([]);
  };

  return (
    <div className="container-fluid mt-4">
      <div className="row ">
        <div className="col-md-8">
          <h2 className="my-4">Lista de recetas</h2>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <FilterBar
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedArea={selectedArea}
            setSelectedArea={setSelectedArea}
            selectedIngredient={selectedIngredient}
            setSelectedIngredient={setSelectedIngredient}
            categories={categories}
            areas={areas}
            ingredients={ingredients}
          />
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {filteredRecipes.length > 0 ? (
              filteredRecipes.map((recipe) => (
                <div key={recipe.idMeal} className="col">
                  <div className="card">
                    <RecipeCard
                      recipe={recipe}
                      onAddToMenu={addToMenu}
                      setSelectedRecipe={setSelectedRecipe}
                    />
                  </div>
                </div>
              ))
            ) : (
              <p>No se encontraron coincidencias</p>
            )}

            {selectedRecipe && (
              <RecipeDetails
                recipe={selectedRecipe}
                onClose={() => setSelectedRecipe(null)}
              />
            )}
          </div>
        </div>

        <div className="col-md-4">
          <div className="position-sticky" style={{ top: '20px' }}>
            <MenuList
              menu={menu}
              onRemoveFromMenu={removeFromMenu}
              onClearMenu={clearMenu}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeList;
