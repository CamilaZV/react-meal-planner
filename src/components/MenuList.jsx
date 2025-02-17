function MenuList({ menu, onRemoveFromMenu, onClearMenu }) {
  return (
    <div className="card p-3 bg-light rounded shadow-sm ">
      <h2 className="text-center">Mi Menù</h2>
      {menu.length === 0 ? (
        <p className="text-muted text-center">Aun no has agregado recetas</p>
      ) : (
        <ul className="list-group">
          {menu.map((recipe) => (
            <li
              key={recipe.idMeal}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {recipe.strMeal}
              <button
                className="btn btn-danger btn-sm"
                onClick={() => onRemoveFromMenu(recipe.idMeal)}
              >
                Eliminar
              </button>
            </li>
          ))}
          <button className="btn btn-warning mt-3 w-100" onClick={onClearMenu}>Limpiar mi Menù</button>
        </ul>
      )}
    </div>
  );
}

export default MenuList;
