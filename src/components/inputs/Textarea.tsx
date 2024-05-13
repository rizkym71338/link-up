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
        className="mb-4 mt-2 w-full rounded-md border-none bg-dark-1 p-2.5 focus:outline-none"
        {...props}
      />
    </div>
  )
}
