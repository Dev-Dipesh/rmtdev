type SearchFormProps = {
  search: string;
  setSearch: (search: string) => void;
};

export default function SearchForm({ search, setSearch }: SearchFormProps) {
  return (
    <form action="#" className="search" onSubmit={(e) => e.preventDefault()}>
      <button type="submit">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>

      <input
        value={search}
        spellCheck="false"
        type="text"
        required
        placeholder="Find remote developer jobs..."
        onChange={(e) => setSearch(e.target.value)}
      />
    </form>
  );
}
