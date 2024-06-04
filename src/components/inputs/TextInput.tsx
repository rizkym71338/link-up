interface TextInputProps {
  name: string
  label: string
  placeholder: string
  defaultValue?: string
  required?: boolean
}

export const TextInput = ({ label, name, ...props }: TextInputProps) => {
  return (
    <div>
      <label htmlFor={name} className="text-base-bold">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type="text"
        className="mb-4 mt-2 w-full rounded-md border-none bg-gray-100 p-2.5 focus:outline-none"
        {...props}
      />
    </div>
  )
}
