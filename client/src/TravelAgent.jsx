import { useState, useEffect, useRef } from "react";
import "./ChatBot.css"; // Import styles

function TravelAgent() {
  const [messages, setMessages] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSendMessage() {
    if (!query.trim()) return;
    setLoading(true);

    const userMessage = { sender: "user", text: query };
    setMessages((prev) => [...prev, userMessage]); // Show user's query

    try {
      const res = await fetch("http://localhost:5000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      const data = await res.json();
      console.log(data)
      if (!res.ok || !data.data) throw new Error("Invalid response format.");

      const structuredResponse = parseStructuredResponse(data.data);

      const botMessage = { sender: "bot", text: structuredResponse };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Error: Unable to process your request." },
      ]);
    } finally {
      setQuery("");
      setLoading(false);
    }
  }

  function parseStructuredResponse(text) {
    const days = text.split(/Day \d+:/).slice(1); // Splitting at "Day X:"
    return days.map((day, index) => {
      const lines = day.trim().split("\n").filter((line) => line); // Splitting into lines
      const title = lines.shift(); // First line is the title
      const activities = lines.map((line) => line.replace(/^- /, "")); // Removing bullet points

      return {
        title: `Day ${index + 1}: ${title}`,
        activities,
      };
    });
  }

  return (
    <div className="chat-container">
      <h1>AI Travel Assistant</h1>

      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.sender === "bot" && Array.isArray(msg.text) ? (
              <div className="structured-response">
                {msg.text.map((day, i) => (
                  <div key={i}>
                    <h3>{day.title}</h3>
                    <ul>
                      {day.activities.map((activity, j) => (
                        <li key={j}>{activity}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <span>{msg.text}</span>
            )}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className="input-box">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask about your travel plan..."
        />
        <button onClick={handleSendMessage} disabled={loading}>
          {loading ? "Thinking..." : "Send"}
        </button>
      </div>
    </div>
  );
}

export default TravelAgent;
