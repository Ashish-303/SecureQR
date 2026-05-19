import { useState } from "react";
import UrlInput from "../components/UrlInput";
import ResultBox from "../components/ResultBox";

export default function Home() {
  const [result, setResult] = useState(null);

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto" }}>
      <h2>SecureQR Detection</h2>

      <UrlInput onResult={setResult} />

      <ResultBox result={result} />
    </div>
  );
}
