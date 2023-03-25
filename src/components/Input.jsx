import st from './Input.module.css'

export function Input({ type = 'text', className = '', ...rest }) {
  return <input type={type} className={[className, st.input].join(' ')} {...rest} />
}
