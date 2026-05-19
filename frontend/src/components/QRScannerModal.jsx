import { useEffect, useRef, useState } from "react"
import { Html5QrcodeScanner } from "html5-qrcode"
import { motion } from "framer-motion"
import { FaTimes, FaQrcode } from "react-icons/fa"

export default function QRScannerModal({ close, onScan }) {
  const scannerRef = useRef(null)
  const [isScanning, setIsScanning] = useState(false)

  useEffect(() => {
    if (scannerRef.current) return

    setIsScanning(true)

    // Inject custom styles for html5-qrcode elements
    const styleElement = document.createElement('style')
    styleElement.innerHTML = `
      #scanner button,
      button[id*="html5-qrcode-button"] {
        background: linear-gradient(135deg, #00ffa6, #00c3ff) !important;
        border: none !important;
        padding: 14px 28px !important;
        border-radius: 12px !important;
        font-weight: 700 !important;
        font-size: 0.95rem !important;
        color: #000 !important;
        font-family: 'Inter', sans-serif !important;
      }
      #scanner select {
        background: rgba(15, 23, 42, 0.9) !important;
        color: #ffffff !important;
        border: 1.5px solid rgba(0, 255, 166, 0.3) !important;
        border-radius: 10px !important;
        padding: 12px 16px !important;
        font-family: 'Inter', sans-serif !important;
      }
    `
    document.head.appendChild(styleElement)

    scannerRef.current = new Html5QrcodeScanner(
      "scanner",
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        rememberLastUsedCamera: true,
      },
      false
    )

    scannerRef.current.render(
      (decodedText) => {
        onScan(decodedText)
        if (scannerRef.current) {
          scannerRef.current.clear()
          scannerRef.current = null
        }
        setIsScanning(false)
      },
      (error) => {}
    )

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear()
        scannerRef.current = null
      }
      document.head.removeChild(styleElement)
    }
  }, [onScan])

  return (
    <motion.div
      className="modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={close}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <motion.div
        className="modal-box"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: "600px", width: "90%" }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "30px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, rgba(0,255,170,0.2), rgba(0,195,255,0.2))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FaQrcode size={24} color="#00ffa6" />
            </div>
            <div>
              <h2 style={{ fontSize: "1.6rem", marginBottom: "4px" }}>
                QR Scanner
              </h2>
              <p style={{ fontSize: "0.9rem", color: "#94a3b8", margin: 0 }}>
                Point your camera at the QR code
              </p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={close}
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              border: "1.5px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "10px",
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#94a3b8",
            }}
          >
            <FaTimes size={18} />
          </motion.button>
        </div>

        {/* Scanner */}
        <div
          id="scanner"
          style={{
            borderRadius: "16px",
            overflow: "hidden",
            border: "2px solid rgba(0, 255, 166, 0.3)",
            background: "rgba(0, 0, 0, 0.3)",
          }}
        />

        {/* Instructions */}
        <div
          style={{
            marginTop: "24px",
            padding: "16px",
            background: "rgba(0, 255, 166, 0.05)",
            border: "1px solid rgba(0, 255, 166, 0.2)",
            borderRadius: "12px",
            textAlign: "left",
          }}
        >
          <p style={{ color: "#94a3b8", fontSize: "0.9rem", margin: 0 }}>
            <strong style={{ color: "#00ffa6" }}>Tip:</strong> Make sure the QR
            code is well-lit and centered in the frame for best results.
          </p>
        </div>

        {/* Close Button */}
        <motion.button 
          className="btn"
          onClick={close}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{
            marginTop: "16px",
            background: "rgba(255, 255, 255, 0.08)",
            border: "1.5px solid rgba(0, 255, 166, 0.3)",
            color: "#ffffff"
          }}
        >
          Cancel Scan
        </motion.button>
      </motion.div>
    </motion.div>
  )
}