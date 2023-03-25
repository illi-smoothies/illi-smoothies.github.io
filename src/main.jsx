import { render } from 'preact'
import { GlobalStateProvider } from './GlobalState'
import { App } from './components/App'
import './index.css'

const initialState = {
  description: JSON.parse(localStorage.getItem('description') || '{}'),
  resultsTable: JSON.parse(
    localStorage.getItem('resultsTable') || '{ "headers": [], "rows": [] }',
  ),
  mainBg: localStorage.getItem('mainBg') || '',
  mainRef: null,
}

render(
  <GlobalStateProvider initialState={initialState}>
    <App />
  </GlobalStateProvider>,
  document.getElementById('app'),
)
