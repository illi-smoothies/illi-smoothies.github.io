import { toPng } from 'html-to-image'
import st from './ActionBar.module.css'
import { parseCSV } from '../utils/parseCSV.js'
import { useGlobalState } from '../GlobalState.jsx'

export function ActionBar({ className = '' }) {
  const [{ mainRef }, setState] = useGlobalState()
  const onCsvChange = async (e) => {
    const [file] = e.target.files
    const csvData = await file.text(file)
    const [headers, ...rows] = parseCSV(csvData)
    const resultsTable = {
      headers,
      rows: rows.filter((r) => r[0] && r[1]),
    }

    localStorage.setItem('resultsTable', JSON.stringify(resultsTable)) // todo wrap with a service
    setState((p) => ({ ...p, resultsTable }))
  }

  const onImageChange = async (e) => {
    const [file] = e.target.files
    const mainBg = URL.createObjectURL(file)

    localStorage.setItem('mainBg', mainBg) // todo wrap with service
    setState((p) => ({ ...p, mainBg }))
  }

  const onClipboardCopy = async (e) => {
    const dataUrl = await toPng(mainRef.current, { backgroundColor: '#000' })
    const blob = await (await fetch(dataUrl)).blob()

    const type = 'image/png'

    const data = [new ClipboardItem({ [type]: blob })]
    await navigator.clipboard.write(data)
  }

  const onDownload = async () => {
    const dataUrl = await toPng(mainRef.current, { backgroundColor: '#000' })
    const blob = await (await fetch(dataUrl)).blob()

    let blobUrl = window.URL.createObjectURL(blob)
    let a = document.createElement('a')
    a.download = 'Results.png' // todo rename cleverly
    a.href = blobUrl
    document.body.appendChild(a)
    a.click()
    a.remove()
  }

  return (
    <div className={[className, st.main].join(' ')}>
      <label>
        Данные
        <input type="file" accept="text/csv" onChange={onCsvChange} />
      </label>

      <label>
        Фон
        <input
          type="file"
          accept="image/png,image/jpeg"
          onChange={onImageChange}
        />
      </label>

      <button onClick={onClipboardCopy}>Копировать в буфер</button>
      <button onClick={onDownload}>Скачать</button>
    </div>
  )
}
