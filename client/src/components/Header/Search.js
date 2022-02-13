export default function Search() {
  return (
    <div className="top-search">
      <select>
        <option value="united">TV show</option>
      </select>
      <input
        type="text"
        placeholder="Search for a movie, TV Show or celebrity that you are looking for"
      />
    </div>
  );
}