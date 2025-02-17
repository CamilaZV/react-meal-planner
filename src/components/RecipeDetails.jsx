function RecipeDetails({ recipe, onClose }) {
  if (!recipe) return null; // NO MOSTRAR NADA SI NO HAY RECETA SELECCIONADA

  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{recipe.strMeal}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <img src={recipe.strMealThumb} alt={recipe.strMeal} className="img-fluid mb-3" />
            <h6>Ingredientes:</h6>
            <ul>
              {Array.from({ length: 20 }, (_, i) => i + 1)
                .map((i) => ({
                  ingredient: recipe[`strIngredient${i}`],
                  measure: recipe[`strMeasure${i}`],
                }))
                .filter((item) => item.ingredient)
                .map((item, index) => (
                  <li key={index}>{item.ingredient} - {item.measure}</li>
                ))}
            </ul>
            <h6>Instrucciones:</h6>
            <p>{recipe.strInstructions}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
