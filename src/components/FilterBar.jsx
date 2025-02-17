

function FilterBar({
  selectedCategory,
  setSelectedCategory,
  selectedArea,
  setSelectedArea,
  selectedIngredient,
  setSelectedIngredient,
  categories,
  areas,
  ingredients,
}) {
  return (
    <div className="row g-2 mb-4">
      <div className="col-md-4">
        <select
          className="form-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Todas las categorias</option>
          {categories.map((category) => (
            <option value={category} key={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="col-md-4">

        <select
          className="form-select"
          value={selectedArea}
          onChange={(e) => setSelectedArea(e.target.value)}
          >
          <option value="">Todas las areas</option>
            {console.log(areas)}
          {areas.map((area) => (
            <option value={area} key={area}>
              {area}
            </option>
          ))}
        </select>
      </div>

      <div className="col-md-4 m-20">
        <select
          className="form-select"
          value={selectedIngredient}
          onChange={(e) => setSelectedIngredient(e.target.value)}
        >
          <option value="">Todos los ingredientes</option>
          console.log(ingredients)
          {ingredients.map((ingredient) => (
            <option value={ingredient} key={ingredient}>
              {ingredient}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default FilterBar;
