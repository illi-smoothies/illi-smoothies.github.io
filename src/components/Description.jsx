import st from './Description.module.css'
import { useGlobalState } from '../GlobalState.jsx'

export function Description({ className = '' }) {
  const [{ description }] = useGlobalState()

  return (
    <div className={[className, st.root].join(' ')}>
      <div className={[st.small, 'mb10'].join(' ')}>
        <span className="fw900">{description.time || "Время и дата"}</span>{' '}
        <span className="fw300">| {description.place || 'Место'}</span>
      </div>
      <div
        className={[st.large, 'mb10', 'fw900'].join(' ')}
        dangerouslySetInnerHTML={{
          __html: (description.title || 'Название квиза').replace(/\\n/g, '<br/>'),
        }}
      />
      <div className={[st.small, 'fw900'].join(' ')}>
        <ul className={st.list}>
          {['number', 'year', 'city']
            .filter((f) => Boolean(description[f]))
            .map(f => {
              return <li key={f} className={f === 'city' ? 'yellow' : ''}>{description[f]}</li>
            })}
        </ul>
      </div>
    </div>
  )
}
