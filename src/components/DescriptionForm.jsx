import { useRef } from 'preact/hooks'
import st from './DescriptionForm.module.css'
import { Input } from './Input.jsx'

export function DescriptionForm({
  description = {},
  onChange,
  className = '',
}) {
  const formRef = useRef()
  const onFormChange = (e) => {
    const formData = new FormData(formRef.current)
    onChange(Object.fromEntries(formData))
  }

  return (
    <form
      ref={formRef}
      className={[className, st.main].join(' ')}
      onChange={onFormChange}
    >
      <Input
        type="text"
        name="time"
        defaultValue={description.time}
        placeholder="Время"
      />
      <Input
        type="text"
        name="place"
        defaultValue={description.place}
        placeholder="Место"
      />
      <Input
        type="text"
        name="title"
        defaultValue={description.title}
        placeholder="Название квиза (используй \n для переноса строки)"
      />
      <Input
        type="text"
        name="number"
        defaultValue={description.number}
        placeholder="Номер квиза"
      />
      <Input
        type="text"
        name="year"
        defaultValue={description.year}
        placeholder="Год"
      />
      <Input
        type="text"
        name="city"
        defaultValue={description.city}
        placeholder="Город"
      />
    </form>
  )
}
