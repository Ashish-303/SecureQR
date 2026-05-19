import { useState } from "react"
import { motion } from "framer-motion"
import { FaTimes, FaLink, FaPaste } from "react-icons/fa"

export default function URLModal({ close, onScan }) {
  const [url, setURL] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText()
      setURL(text)
    } catch (err) {
      console.error("Failed to paste:", err)
    }
  }

  const handleSubmit = async () => {
    if (!url.trim()) return
    setIsLoading(true)
    await onScan(url)
    setIsLoading(false)
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && url.trim()) {
      handleSubmit()
    }
  }

  return (
    <motion.div
      className="modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={close}
    >
      <motion.div
        className="modal-box"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        onClick={(e) => e.stopPropagation()}
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
                background: "linear-gradient(135deg, rgba(0,195,255,0.2), rgba(124,58,237,0.2))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FaLink size={22} color="#00c3ff" />
            </div>
            <div>
              <h3 style={{ fontSize: "1.6rem", marginBottom: "4px" }}>
                URL Analyzer
              </h3>
              <p style={{ fontSize: "0.9rem", color: "#94a3b8", margin: 0 }}>
                Enter or paste a URL to scan
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

        {/* Input Section */}
        <div style={{ position: "relative" }}>
          <input
            type="url"
            value={url}
            onChange={(e) => setURL(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="https://example.com"
            disabled={isLoading}
            autoFocus
            style={{
              width: "100%",
              padding: "16px 60px 16px 20px",
              borderRadius: "14px",
              border: "2px solid rgba(0, 255, 166, 0.3)",
              background: "rgba(15, 23, 42, 0.8)",
              color: "#ffffff",
              fontSize: "1rem",
              fontFamily: "'Inter', sans-serif",
              outline: "none",
              transition: "all 0.3s ease",
              fontWeight: "500",
              boxSizing: "border-box"
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#00ffa6"
              e.target.style.boxShadow = "0 0 0 3px rgba(0, 255, 166, 0.2)"
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "rgba(0, 255, 166, 0.3)"
              e.target.style.boxShadow = "none"
            }}
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePaste}
            disabled={isLoading}
            style={{
              position: "absolute",
              right: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(0, 195, 255, 0.1)",
              border: "1px solid rgba(0, 195, 255, 0.3)",
              borderRadius: "8px",
              padding: "8px 12px",
              cursor: "pointer",
              color: "#00c3ff",
              fontSize: "0.85rem",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <FaPaste size={12} />
            Paste
          </motion.button>
        </div>

        {/* Info Box */}
        <div
          style={{
            marginTop: "20px",
            padding: "16px",
            background: "rgba(0, 195, 255, 0.05)",
            border: "1px solid rgba(0, 195, 255, 0.2)",
            borderRadius: "12px",
            textAlign: "left",
          }}
        >
          <p style={{ color: "#94a3b8", fontSize: "0.85rem", margin: 0 }}>
            <strong style={{ color: "#00c3ff" }}>What we check:</strong>
            <br />
            Phishing attempts, malware distribution, fake login pages, and
            suspicious domains
          </p>
        </div>

        {/* Buttons */}
        <motion.button
          className="btn"
          onClick={handleSubmit}
          disabled={!url.trim() || isLoading}
          whileHover={url.trim() && !isLoading ? { scale: 1.02 } : {}}
          whileTap={url.trim() && !isLoading ? { scale: 0.98 } : {}}
          style={{
            opacity: !url.trim() || isLoading ? 0.5 : 1,
            cursor: !url.trim() || isLoading ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          {isLoading ? (
            <>
              <div className="spinner" style={{ width: "20px", height: "20px", borderWidth: "3px", margin: 0 }} />
              Analyzing...
            </>
          ) : (
            "Analyze URL"
          )}
        </motion.button>

        <motion.button 
          className="btn"
          onClick={close} 
          disabled={isLoading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{
            background: "rgba(255, 255, 255, 0.08)",
            border: "1.5px solid rgba(0, 255, 166, 0.3)",
            color: "#ffffff"
          }}
        >
          Cancel
        </motion.button>
      </motion.div>
    </motion.div>
  )
}