import { motion } from "framer-motion"
import logo from "../assets/logo/secureqr-logo.png"
import { FaShieldAlt } from "react-icons/fa"

export default function Header() {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "24px 40px",
        background: "rgba(15, 23, 42, 0.6)",
        backdropFilter: "blur(20px)",
        borderBottom: "1.5px solid rgba(0, 255, 166, 0.15)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      {/* Logo and Brand */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <motion.div
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.6 }}
        >
          <img 
            src={logo} 
            width="48" 
            height="48"
            alt="SecureQR Logo"
            style={{ 
              filter: "drop-shadow(0 0 10px rgba(0, 255, 166, 0.5))",
              borderRadius: "8px"
            }}
          />
        </motion.div>

        <h2
          style={{
            fontSize: "1.8rem",
            fontWeight: "800",
            letterSpacing: "-0.02em",
            display: "flex",
            alignItems: "center",
            gap: "4px"
          }}
        >
          Secure
          <span
            style={{
              background: "linear-gradient(135deg, #00ffa6, #00c3ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            QR
          </span>
        </h2>
      </div>

      {/* Security Badge */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "8px 16px",
          background: "rgba(0, 255, 166, 0.1)",
          border: "1.5px solid rgba(0, 255, 166, 0.3)",
          borderRadius: "12px",
          fontSize: "0.85rem",
          fontWeight: "600",
          color: "#00ffa6",
        }}
      >
        <FaShieldAlt size={16} />
        <span>AI-Protected</span>
      </motion.div>
    </motion.header>
  )
}