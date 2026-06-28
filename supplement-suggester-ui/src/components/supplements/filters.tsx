import dynamic from 'next/dynamic';
import makeAnimated from 'react-select/animated';

import type { TInteractionsRisksSymptoms } from '@/types';

// Import react-select dynamically to prevent SSR hydration issues
const Select = dynamic(() => import('react-select'), { ssr: false });

type TFiltersProps = {
  data: TInteractionsRisksSymptoms;
  interactions: string[];
  onInteractionChange: (interactions: string[]) => void;
  onRiskChange: (risks: string[]) => void;
  onSymptomChange: (symptoms: string[]) => void;
  risks: string[];
  symptoms: string[];
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

const Filters = ({
  data,
  interactions,
  onInteractionChange,
  onRiskChange,
  onSymptomChange,
  risks,
  symptoms
}: TFiltersProps) => {
  const animatedComponents = makeAnimated();

  return (
    <div className="flex flex-wrap justify-center gap-4 lg:gap-8 mb-8 pb-4">
      <div className="w-[300px]">
        <Select
          isMulti
          name="symptoms"
          options={data.Symptoms.map((symptom) => ({
            value: symptom,
            label: symptom
          }))}
          components={animatedComponents}
          styles={customStyles}
          placeholder="Helps with..."
          onChange={(selectedOptions) => {
            onSymptomChange(
              Array.isArray(selectedOptions) ? selectedOptions.map((option) => option.value) : []
            );
          }}
          value={symptoms.map((symptom) => ({
            value: symptom,
            label: symptom
          }))}
        />
      </div>

      <div className="w-[300px]">
        <Select
          isMulti
          name="interactions"
          options={data.Interactions.map((interaction) => ({
            value: interaction,
            label: interaction
          }))}
          components={animatedComponents}
          placeholder="Conflicts with..."
          styles={customStyles}
          onChange={(selectedOptions) => {
            onInteractionChange(
              Array.isArray(selectedOptions) ? selectedOptions.map((option) => option.value) : []
            );
          }}
          value={interactions.map((interaction) => ({
            value: interaction,
            label: interaction
          }))}
        />
      </div>

      <div className="w-[300px]">
        <Select
          isMulti
          name="risks"
          options={data.Risks.map((risk) => ({
            value: risk,
            label: risk
          }))}
          components={animatedComponents}
          styles={customStyles}
          placeholder="	Not recommended for..."
          onChange={(selectedOptions) => {
            onRiskChange(
              Array.isArray(selectedOptions) ? selectedOptions.map((option) => option.value) : []
            );
          }}
          value={risks.map((risk) => ({
            value: risk,
            label: risk
          }))}
        />
      </div>
    </div>
  );
};

export { Filters };
