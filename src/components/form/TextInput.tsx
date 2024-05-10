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
        className="input mb-4 w-full"
        {...props}
      />
    </div>
  )
}
