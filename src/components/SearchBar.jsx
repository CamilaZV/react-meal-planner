

function SearchBar({searchTerm, setSearchTerm}) {
  return (
    <div className="mb-4">
      <input
        type="text"
        className="form-control"
        placeholder="Buscar recetas..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
