'use client'

import React, { useState } from "react";

const StreamTest = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleStream = async () => {
    setOutput(""); // clear previous output

    const response = await fetch("http://127.0.0.1:8000/stream-test/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: input,
      }),
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      setOutput((prev) => prev + chunk); // append live output
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>Groq Streaming Test</h2>

      <textarea
        rows={3}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message…"
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
      />

      <button onClick={handleStream} style={{ padding: "10px 16px" }}>
        Stream Response
      </button>

      <div
        style={{
          marginTop: "20px",
          padding: "15px",
          minHeight: "100px",
          whiteSpace: "pre-wrap",
        }}
      >
        {output}
      </div>
    </div>
  );
};

export default StreamTest;