import dynamic from 'next/dynamic';
import makeAnimated from 'react-select/animated';

// Import react-select dynamically to prevent SSR hydration issues
const Select = dynamic(() => import('react-select'), { ssr: false });

type TFiltersProps = {
  data: string[];
  categories: string[];
  onCategoryChange: (categories: string[]) => void;
};

const customStyles = {
  control: (provided: object) => ({
    ...provided,
    cursor: 'pointer'
  }),
  option: (provided: object) => ({
    ...provided,
    cursor: 'pointer'
  })
};

const Filters = ({ data, categories, onCategoryChange }: TFiltersProps) => {
  const animatedComponents = makeAnimated();

  return (
    <div className="flex flex-wrap justify-center gap-4 lg:gap-8 mb-8 pb-4">
      <div className="w-[300px]">
        <Select
          isMulti
          name="categories"
          options={data.map((d) => ({
            value: d,
            label: d
          }))}
          components={animatedComponents}
          placeholder="Category"
          styles={customStyles}
          onChange={(selectedOptions) => {
            onCategoryChange(
              Array.isArray(selectedOptions) ? selectedOptions.map((option) => option.value) : []
            );
          }}
          value={categories.map((c) => ({
            value: c,
            label: c
          }))}
        />
      </div>
    </div>
  );
};

export { Filters };
