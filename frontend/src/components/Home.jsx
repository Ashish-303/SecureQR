import { motion } from "framer-motion"
import { FaCamera, FaUpload, FaLink } from "react-icons/fa"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

export default function Home({ openScanner, openUpload, openURL }) {
  const features = [
    {
      icon: FaCamera,
      title: "Scan QR",
      description: "Use your camera",
      gradient: "linear-gradient(135deg, #00ffa6, #00c3ff)",
      onClick: openScanner,
    },
    {
      icon: FaUpload,
      title: "Upload QR",
      description: "From gallery",
      gradient: "linear-gradient(135deg, #00c3ff, #7c3aed)",
      onClick: openUpload,
    },
    {
      icon: FaLink,
      title: "Enter URL",
      description: "Paste link",
      gradient: "linear-gradient(135deg, #7c3aed, #ec4899)",
      onClick: openURL,
    },
  ]

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{
        textAlign: "center",
        marginTop: "100px",
        padding: "0 20px",
      }}
    >
      {/* Hero Section */}
      <motion.div variants={itemVariants}>
        <h1
          style={{
            fontSize: "clamp(2.5rem, 8vw, 4.5rem)",
            fontWeight: "900",
            lineHeight: "1.1",
            marginBottom: "20px",
            letterSpacing: "-0.03em",
          }}
        >
          Scan &{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #00ffa6, #00c3ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              position: "relative",
            }}
          >
            Protect
          </span>
        </h1>

        <p
          style={{
            fontSize: "clamp(1rem, 2vw, 1.25rem)",
            color: "#94a3b8",
            maxWidth: "600px",
            margin: "0 auto",
            fontWeight: "500",
            lineHeight: "1.6",
          }}
        >
          Instantly analyze QR codes and URLs for phishing, malware, and other
          cyber threats with AI-powered detection
        </p>
      </motion.div>

      {/* Feature Cards */}
      <motion.div
        variants={itemVariants}
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "30px",
          marginTop: "70px",
          maxWidth: "1200px",
          margin: "70px auto 0",
        }}
      >
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <motion.div
              key={index}
              className="card"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={feature.onClick}
            >
              <div className="card-icon">
                <Icon size={28} color="#00ffa6" />
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Trust Indicators */}
      <motion.div
        variants={itemVariants}
        style={{
          marginTop: "80px",
          display: "flex",
          justifyContent: "center",
          gap: "40px",
          flexWrap: "wrap",
          color: "#64748b",
          fontSize: "0.9rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#00ffa6",
              boxShadow: "0 0 10px rgba(0, 255, 166, 0.5)",
            }}
          />
          <span>AI-Powered Detection</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#00c3ff",
              boxShadow: "0 0 10px rgba(0, 195, 255, 0.5)",
            }}
          />
          <span>640K+ URL Database</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#7c3aed",
              boxShadow: "0 0 10px rgba(124, 58, 237, 0.5)",
            }}
          />
          <span>Real-time Analysis</span>
        </div>
      </motion.div>
    </motion.div>
  )
}