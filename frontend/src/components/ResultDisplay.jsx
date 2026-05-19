import { motion } from "framer-motion"
import { FaCheckCircle, FaExclamationTriangle, FaShieldAlt, FaRedo } from "react-icons/fa"

export default function ResultDisplay({ result }) {
  if (!result) return null

  const isSafe = result.status === "SAFE"
  // Convert confidence from 0-1 range to 0-100 percentage
  const confidenceDecimal = parseFloat(result.confidence)
  const confidence = (confidenceDecimal * 100).toFixed(1)

  return (
    <motion.div
      className="result-container"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Result Badge */}
      <motion.div
        className={`result-badge ${isSafe ? "result-safe" : "result-malicious"}`}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5, ease: "backOut" }}
      >
        {isSafe ? (
          <FaCheckCircle size={60} style={{ marginBottom: "16px" }} />
        ) : (
          <FaExclamationTriangle size={60} style={{ marginBottom: "16px" }} />
        )}
        <div>{isSafe ? "SAFE" : "MALICIOUS"}</div>
      </motion.div>

      {/* Result Details */}
      <motion.div
        className="result-details"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {/* Status Message */}
        <div style={{ marginBottom: "24px" }}>
          <h3
            style={{
              fontSize: "1.3rem",
              fontWeight: "700",
              marginBottom: "8px",
              color: isSafe ? "#2ed573" : "#ff4757",
            }}
          >
            {isSafe
              ? "✓ This link appears to be safe"
              : "⚠ This link may be dangerous"}
          </h3>
          <p style={{ color: "#94a3b8", fontSize: "0.95rem", margin: 0 }}>
            {isSafe
              ? "No malicious patterns detected. However, always exercise caution."
              : "Our AI detected suspicious patterns. Avoid clicking this link."}
          </p>
        </div>

        {/* Confidence Score */}
        <div style={{ marginBottom: "24px" }}>
          <p className="confidence-text">Confidence Score</p>
          <div className="confidence-score">{confidence}%</div>
          
          {/* Confidence Bar */}
          <div
            style={{
              width: "100%",
              height: "12px",
              background: "rgba(0, 0, 0, 0.3)",
              borderRadius: "10px",
              overflow: "hidden",
              marginTop: "16px",
              position: "relative",
            }}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${confidence}%` }}
              transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
              style={{
                height: "100%",
                background: isSafe
                  ? "linear-gradient(90deg, #2ed573, #00ffa6)"
                  : "linear-gradient(90deg, #ff4757, #ff6348)",
                borderRadius: "10px",
                boxShadow: isSafe
                  ? "0 0 15px rgba(46, 213, 115, 0.5)"
                  : "0 0 15px rgba(255, 71, 87, 0.5)",
              }}
            />
          </div>
        </div>

        {/* URL Display if available */}
        {result.url && (
          <div className="url-display">
            <strong style={{ color: "#00ffa6", fontSize: "0.8rem" }}>
              Scanned URL:
            </strong>
            <br />
            {result.url}
          </div>
        )}

        {/* Security Tips */}
        <div
          style={{
            marginTop: "24px",
            padding: "16px",
            background: isSafe
              ? "rgba(46, 213, 115, 0.05)"
              : "rgba(255, 71, 87, 0.05)",
            border: isSafe
              ? "1px solid rgba(46, 213, 115, 0.2)"
              : "1px solid rgba(255, 71, 87, 0.2)",
            borderRadius: "12px",
            textAlign: "left",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "12px",
            }}
          >
            <FaShieldAlt size={16} color={isSafe ? "#2ed573" : "#ff4757"} />
            <strong style={{ fontSize: "0.9rem" }}>Security Tips</strong>
          </div>
          <ul
            style={{
              margin: 0,
              paddingLeft: "20px",
              color: "#94a3b8",
              fontSize: "0.85rem",
              lineHeight: "1.8",
            }}
          >
            {isSafe ? (
              <>
                <li>Always verify the sender before clicking links</li>
                <li>Check for HTTPS in the URL</li>
                <li>Be cautious with personal information</li>
              </>
            ) : (
              <>
                <li>Do NOT click or visit this link</li>
                <li>Do NOT enter any personal information</li>
                <li>Report this to your IT/security team</li>
                <li>Delete any messages containing this link</li>
              </>
            )}
          </ul>
        </div>

        {/* Scan Another Button */}
        <motion.button
          className="btn btn-secondary"
          onClick={() => window.location.reload()}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{
            marginTop: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <FaRedo size={14} />
          Scan Another
        </motion.button>
      </motion.div>
    </motion.div>
  )
}