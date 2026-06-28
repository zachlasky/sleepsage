type TFIltersProps = {
  searchValue: string;
  updateSearchValue: (search: string) => void;
};

const Filters = ({ searchValue, updateSearchValue }: TFIltersProps) => {
  return (
    <form className="flex justify-end">
      <input
        className="border-2 rounded-lg h-[40px] w-[300px] px-2 bg-black"
        onChange={(e) => updateSearchValue(e.target.value)}
        placeholder="Search by Name"
        value={searchValue}
      />
    </form>
  );
};

export { Filters };
