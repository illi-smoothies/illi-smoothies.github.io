import { createContext } from 'preact'
import { useContext, useState } from 'preact/hooks'

const GlobalState = createContext({})

export function GlobalStateProvider({ children, initialState }) {
  const globalState = useState(() => initialState)
  return (
    <GlobalState.Provider value={globalState}>{children}</GlobalState.Provider>
  )
}

export function useGlobalState() {
  return useContext(GlobalState)
}
