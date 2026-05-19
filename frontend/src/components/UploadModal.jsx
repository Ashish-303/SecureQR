import { useState } from "react"
import { motion } from "framer-motion"
import { FaTimes, FaCloudUploadAlt, FaImage } from "react-icons/fa"
import { Html5Qrcode } from "html5-qrcode"

export default function UploadModal({ close, onScan }) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [previewImage, setPreviewImage] = useState(null)

  const handleFile = async (file) => {
    if (!file) return
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file")
      return
    }

    // Show preview
    const reader = new FileReader()
    reader.onload = (e) => setPreviewImage(e.target.result)
    reader.readAsDataURL(file)

    setIsProcessing(true)

    try {
      const html5QrCode = new Html5Qrcode("reader")
      const decodedText = await html5QrCode.scanFile(file, true)
      await onScan(decodedText)
      html5QrCode.clear()
    } catch (error) {
      alert("Could not read QR code from image. Please try again.")
      console.error(error)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    handleFile(file)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleFileInput = (e) => {
    const file = e.target.files[0]
    handleFile(file)
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
                background: "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(236,72,153,0.2))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FaImage size={22} color="#7c3aed" />
            </div>
            <div>
              <h3 style={{ fontSize: "1.6rem", marginBottom: "4px" }}>
                Upload QR Code
              </h3>
              <p style={{ fontSize: "0.9rem", color: "#94a3b8", margin: 0 }}>
                Upload an image containing a QR code
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

        {/* Hidden QR Reader */}
        <div id="reader" style={{ display: "none" }} />

        {/* Upload Area */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          style={{
            border: isDragging
              ? "2px dashed #7c3aed"
              : "2px dashed rgba(124, 58, 237, 0.3)",
            borderRadius: "16px",
            padding: "40px",
            textAlign: "center",
            background: isDragging
              ? "rgba(124, 58, 237, 0.1)"
              : "rgba(0, 0, 0, 0.2)",
            transition: "all 0.3s ease",
            cursor: "pointer",
            position: "relative",
          }}
        >
          {previewImage ? (
            <div>
              <img
                src={previewImage}
                alt="Preview"
                style={{
                  maxWidth: "100%",
                  maxHeight: "200px",
                  borderRadius: "12px",
                  marginBottom: "16px",
                }}
              />
              {isProcessing && (
                <div>
                  <div className="spinner" />
                  <p style={{ color: "#94a3b8", marginTop: "12px" }}>
                    Processing QR code...
                  </p>
                </div>
              )}
            </div>
          ) : (
            <>
              <FaCloudUploadAlt
                size={50}
                color="#7c3aed"
                style={{ marginBottom: "16px" }}
              />
              <h4
                style={{
                  fontSize: "1.2rem",
                  marginBottom: "8px",
                  color: "#fff",
                }}
              >
                {isDragging ? "Drop image here" : "Drag & drop your QR code"}
              </h4>
              <p style={{ color: "#94a3b8", fontSize: "0.9rem" }}>
                or click to browse
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                disabled={isProcessing}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  opacity: 0,
                  cursor: "pointer",
                }}
              />
            </>
          )}
        </div>

        {/* Supported Formats */}
        <div
          style={{
            marginTop: "20px",
            padding: "16px",
            background: "rgba(124, 58, 237, 0.05)",
            border: "1px solid rgba(124, 58, 237, 0.2)",
            borderRadius: "12px",
            textAlign: "left",
          }}
        >
          <p style={{ color: "#94a3b8", fontSize: "0.85rem", margin: 0 }}>
            <strong style={{ color: "#7c3aed" }}>Supported formats:</strong>{" "}
            JPG, PNG, GIF, WEBP
          </p>
        </div>

        {/* Close Button */}
        <motion.button
          className="btn"
          onClick={close}
          disabled={isProcessing}
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