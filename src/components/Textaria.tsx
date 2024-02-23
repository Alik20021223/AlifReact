import React, { ChangeEventHandler, FC } from 'react'

type TextariaProps = {
  label?: string;
  placeholder?: string;
  required?: boolean
  value?: string | number | readonly string[];
  name?: string
  onChange?: ChangeEventHandler<HTMLTextAreaElement>
}


export const Textaria: FC<TextariaProps> = ({ label, placeholder, value, required = false, name, onChange }) => {
  return (
    <div>
      <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {label}
      </label>
      <textarea
        value={value}
        onChange={onChange}
        id="message"
        name={name}
        rows={4}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        placeholder={placeholder}
        required={required}
      />
    </div>
  )
}
