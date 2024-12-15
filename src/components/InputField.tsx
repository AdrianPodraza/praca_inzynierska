type InputType = {
  label: string
  type: string
  name: string
  value: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
  children?: React.ReactNode
}

function InputField({
  label,
  type,
  onChange,
  children,
  name,
  value,
}: InputType) {
  return (
    <div className='flex flex-col gap-2'>
      <label htmlFor='uname'>
        <b>{label}:</b>
      </label>
      <div className='relative flex'>
        <input
          id={label}
          className='w-full rounded-full border-2 border-gray-400 px-[30px] py-3'
          type={type}
          placeholder={`Wpisz ${label}:`}
          name={name}
          required
          value={value}
          onChange={onChange}
        />
        {children}
      </div>
    </div>
  )
}

export default InputField
