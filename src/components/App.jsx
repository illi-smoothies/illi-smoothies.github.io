import { useEffect, useRef } from 'preact/hooks'
import { useGlobalState } from '../GlobalState.jsx'
import { Logo } from './Logo.jsx'
import { ActionBar } from './ActionBar.jsx'
import { Table } from './Table.jsx'
import { Description } from './Description.jsx'

import st from './App.module.css'
import { DescriptionForm } from './DescriptionForm.jsx'

export function App() {
  const mainRef = useRef()
  const [state, setState] = useGlobalState()

  useEffect(() => {
    setState((p) => ({ ...p, mainRef }))
  }, [])

  const onDescriptionChange = (description) => {
    localStorage.setItem('description', JSON.stringify(description)) // todo wrap with service
    setState((p) => ({ ...p, description }))
  }

  const mainStyle = {
    backgroundImage: `
    linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.9) 300px, rgb(0, 0, 0) 100%), 
    url(${state.mainBg})
  `,
  }

  return (
    <>
      <ActionBar className="mb10" />
      <DescriptionForm
        className="container mb10"
        description={state.description}
        onChange={onDescriptionChange}
      />
      <main ref={mainRef} style={mainStyle} className={[st.main].join(' ')}>
        <header className={st.header}>
          <Logo className={st.logo} />
          <Description className={st.description} />
        </header>

        <div className={st.tableWrapper}>
          <Table />
        </div>
      </main>
    </>
  )
}
