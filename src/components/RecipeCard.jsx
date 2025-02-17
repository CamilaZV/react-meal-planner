function RecipeCard({ recipe, onAddToMenu, setSelectedRecipe }) {
  return (
    <div className="card h-100 shadow-sm mt-20">
      <img
        src={recipe.strMealThumb}
        className="card-img-top img-fluid" style={{ cursor: "pointer" }}
        alt={recipe.strMeal}
        onClick={() => setSelectedRecipe(recipe)}
      />

      <div className="card-body">
        <h5 className="card-title">{recipe.strMeal}</h5>
        <p className="card-text">
          <strong>Categoria: </strong>
          {recipe.strCategory}
        </p>
        <p className="card-text">
          <strong>Origen: </strong>
          {recipe.strArea}
        </p>
        <button
          className="btn btn-primary w-100"
          onClick={() => onAddToMenu(recipe)}
        >
          Agregar al Menu
        </button>
      </div>
    </div>
  );
}

export default RecipeCard;
