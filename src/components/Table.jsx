import { useGlobalState } from '../GlobalState.jsx'
import st from './Table.module.css'

export function Table({ className = '' }) {
  const [state] = useGlobalState()
  const { headers, rows } = state.resultsTable

  return (
    <table className={[className, st.table].join(' ')}>
      <thead>
        <tr>
          {headers.map((h, idx) => (
            <td>{idx === 0 ? <span>{h}</span> : h}</td>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr>
            {row.map((col) => (
              <td>{col}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
