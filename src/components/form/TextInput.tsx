interface TextInputProps {
  name: string
  label: string
  placeholder: string
  required?: boolean
}

export const TextInput = ({ label, name, ...props }: TextInputProps) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type="text"
        className="input w-full"
        {...props}
      />
    </div>
  )
}
