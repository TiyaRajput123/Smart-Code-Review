import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import logo from './assets/logo.png'
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from 'axios'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [code, setCode] = useState(`function sum() {
  return 1 + 1
}`)

  const [review, setReview] = useState(``)

  useEffect(() => {
    prism.highlightAll()
  }, [])

  async function reviewCode() {
    const response = await axios.post('http://localhost:3000/ai/get-review', { code })
    setReview(response.data)
  }

  return (
    <>
      {/* Header */}
 <header style={{
  backgroundColor: "#34383eff",
  padding: "40px 80px",
  color: "white",
  boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
  borderBottom: "3px solid #00ffcc",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative"
}}>
  {/* Logo on the left - absolute positioning */}
  <div style={{
    position: "absolute",
    left: "30px",
    display: "flex",
    alignItems: "center",
    gap: "10px"
  }}>
    <img src={logo} alt="Logo" style={{ height: "125px", width: "125px", borderRadius: "8px" }} />

  </div>
  {/* Centered Title and Subtitle */}
  <div style={{ textAlign: "center" }}>
    <h1 style={{ fontSize: "3.1rem", margin: "0 0 6px 0" }}>AI Code Review Tool</h1>
    <p style={{ fontSize: "1.1rem", color: "#ccc", margin: 0 }}>
      Paste your code below and get instant feedback powered by AI
    </p>
  </div>
</header>



      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "100%",
                width: "100%"
              }}
            />
          </div>
          <div
            onClick={reviewCode}
            className="review">Review</div>
        </div>
        <div className="right">
          <Markdown rehypePlugins={[rehypeHighlight]}>
            {review}
          </Markdown>
        </div>
      </main>

      {/* Footer */}
   <footer style={{
  backgroundColor: "#1a1a1a",
  color: "#edeaeaff",
  padding: "25px 0",
  textAlign: "center",
  fontSize: "16px",
  marginTop: "30px",
  fontFamily: "Arial, sans-serif"
}}>
  <p style={{ margin: 0 }}>© 2025 CodeReview AI</p>
  <p style={{ margin: 0, fontSize: "14px", color: "#aaa" }}>
    Empowering developers with instant AI-powered feedback.
  </p>
</footer>



    </>
  )
}

export default App
