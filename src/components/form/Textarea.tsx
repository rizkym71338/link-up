interface TextareaProps {
  name: string
  label: string
  placeholder: string
  required?: boolean
}

export const Textarea = ({ label, name, ...props }: TextareaProps) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <textarea id={name} rows={5} className="input w-full" {...props} />
    </div>
  )
}
