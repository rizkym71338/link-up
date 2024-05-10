interface TextareaProps {
  name: string
  label: string
  placeholder: string
  defaultValue?: string
  required?: boolean
}

export const Textarea = ({ label, name, ...props }: TextareaProps) => {
  return (
    <div>
      <label htmlFor={name} className="text-base-bold">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        rows={5}
        className="input mb-6 w-full"
        {...props}
      />
    </div>
  )
}
