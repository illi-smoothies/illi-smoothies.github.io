import st from './Logo.module.css'
export function Logo({ className = '' }) {
  return <div className={[className, st.container].join(' ')} />
}
