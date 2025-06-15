import { FC, useState } from "react";

interface Props {
  onSearch: (domain: string) => void;
}
const SearchForm: FC<Props> = ({ onSearch }) => {
  const [value, setValue] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSearch(value.trim());
      }}
      className="flex gap-2 my-4"
    >
      <input
        type="text"
        placeholder="Company domain (e.g., acme.com)"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="flex-1 p-2 border rounded"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Search
      </button>
    </form>
  );
};
export default SearchForm;
