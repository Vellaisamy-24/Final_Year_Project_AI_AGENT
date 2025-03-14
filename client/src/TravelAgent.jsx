import { useState, useEffect, useRef } from "react";
import "./ChatBot.css"; // Import styles

function TravelAgent() {
  const [messages, setMessages] = useState([]);
  const [query, setQuery] = useState("");
  const [budget, setBudget] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSendMessage() {
    if (!query.trim()) return;
    setLoading(true);

    const userMessage = { sender: "user", text: `Query: ${query}${budget ? `, Budget: ${budget}` : ""}` };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await fetch("http://localhost:5000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, budget }),
      });

      const data = await res.json();
      if (!res.ok || !data?.data) throw new Error("Invalid response format.");

      const structuredResponse = parseStructuredResponse(data.data);
      const botMessage = { sender: "bot", text: structuredResponse };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Error: Unable to process your request. Please try again." },
      ]);
    } finally {
      setQuery("");
      setLoading(false);
    }
  }

  function parseStructuredResponse(data) {
    const { itinerary, budgetPlan } = data;

    const parsedItinerary = itinerary?.split(/Day \d+:/).slice(1).map((day, index) => {
      const [title, ...activities] = day.trim().split("\n").filter(Boolean);
      return { title: `Day ${index + 1}: ${title}`, activities };
    }) || [];

    return [
      ...parsedItinerary,
      budgetPlan && { title: "Budget Plan", activities: [budgetPlan] },
    ].filter(Boolean);
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
        <input
          type="text"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          placeholder="Enter your budget (optional)"
        />
        <button onClick={handleSendMessage} disabled={loading}>
          {loading ? "Thinking..." : "Send"}
        </button>
      </div>
    </div>
  );
}

export default TravelAgent;