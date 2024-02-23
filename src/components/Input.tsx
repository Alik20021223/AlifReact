import { ChangeEventHandler, FC, HTMLInputTypeAttribute } from 'react'

type InputProps = {
  label?: string;
  placeholder?: string;
  required?: boolean
  onChange?: ChangeEventHandler<HTMLInputElement>
  value?: string | number | readonly string[];
  type?: HTMLInputTypeAttribute;
  name?: string;
}

export const Input: FC<InputProps> = ({ label = '', placeholder = '', required = false, value, type = 'text', name, onChange }) => {
  return (
    <div>
      <label
        htmlFor={label}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {label}
        </label>
      <input
        onChange={onChange}
        value={value}
        type={type}
        id={label}
        name={name}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        required={required}
      />
    </div>
  )
}
