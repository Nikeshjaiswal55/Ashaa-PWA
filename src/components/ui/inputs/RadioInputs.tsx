import { ErrorMessage, Field } from 'formik';

interface RadioInputsProps<T> {
  label: string;
  name: string;
  values: T;
  options: string[];
}

const RadioInputs = <T extends object>({ label, name, values, options }: RadioInputsProps<T>) => {
  return (
    <div>
      <label className="block text-lg font-semibold text-[#005B24] mb-1">{label}</label>
      <div role="group" aria-labelledby={`${name}-group`} className="flex justify-between gap-3">
        {options.map((option) => (
          <label
            key={option}
            className={`flex items-center w-[124px] h-[25px] px-3 py-1 rounded-lg shadow-sm cursor-pointer transition-all duration-150 ease-in-out ${
              values[name as keyof T] === option
                ? 'bg-[radial-gradient(circle,rgba(54,195,96,0.2))]'
                : 'bg-gray-300 hover:bg-gray-200'
            }`}
          >
            {' '}
            <Field
              type="radio"
              name={name}
              value={option}
              className="appearance-none w-[16px] h-[16px] rounded-full border-2 border-gray-600 bg-gray-600 checked:bg-green-800 checked:border-green-800"
            />
            <span className="text-lg font-semibold text-[#005B24] pl-1">{option}</span>
          </label>
        ))}
      </div>
      <ErrorMessage name={name} component="div" className="text-red-500 text-xs mt-1" />
    </div>
  );
};
export default RadioInputs;
