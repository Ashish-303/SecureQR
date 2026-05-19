import { useState } from "react"
import Header from "./components/Header"
import Home from "./components/Home"
import QRScannerModal from "./components/QRScannerModal"
import URLModal from "./components/URLModal"
import UploadModal from "./components/UploadModal"
import ResultDisplay from "./components/ResultDisplay"

export default function App() {
  const [scanner, setScanner] = useState(false)
  const [urlModal, setURLModal] = useState(false)
  const [uploadModal, setUploadModal] = useState(false)

  const [result, setResult] = useState(null)

  const scanURL = async (url) => {
    try {
      const res = await fetch("http://127.0.0.1:5000/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      })

      const data = await res.json()

      setResult({ ...data, url })

      setScanner(false)
      setURLModal(false)
      setUploadModal(false)
    } catch (error) {
      console.error("Error scanning URL:", error)
      alert("Failed to scan URL. Please try again.")
    }
  }

  return (
    <>
      <Header />

      <Home
        openScanner={() => setScanner(true)}
        openUpload={() => setUploadModal(true)}
        openURL={() => setURLModal(true)}
      />

      {scanner && (
        <QRScannerModal close={() => setScanner(false)} onScan={scanURL} />
      )}

      {urlModal && (
        <URLModal close={() => setURLModal(false)} onScan={scanURL} />
      )}

      {uploadModal && (
        <UploadModal close={() => setUploadModal(false)} onScan={scanURL} />
      )}

      <ResultDisplay result={result} />
    </>
  )
}