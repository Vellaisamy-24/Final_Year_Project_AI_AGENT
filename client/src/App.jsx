import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./App.css";

// Main App Component
const App = () => {
  // --------------------- STATE MANAGEMENT ---------------------
  const [messages, setMessages] = useState([
    {
      sender: "assistant",
      text: "Hello! I’m your Travel Assistant. Tell me about your trip (e.g., '4-day trip to Ooty with ₹20000 budget, I like nature').",
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Ref for auto-scrolling to the latest message
  const messagesEndRef = useRef(null);

  // --------------------- EFFECTS ---------------------
  // Auto-scroll to the latest message when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // --------------------- HELPER FUNCTIONS ---------------------
  // Extract query, budget, and preferences from user input
  const extractDetails = (input) => {
    const budgetMatch = input.match(/₹\d+/);
    const budget = budgetMatch ? budgetMatch[0] : null;

    const preferencesMatch = input.match(/I like (.*)$/i);
    const preferences = preferencesMatch ? preferencesMatch[1].trim() : null;

    const query = input.split(" with ")[0].trim() || input;

    return { query, budget, preferences };
  };

  // Format API response into a readable chat message with subheadings and bullet points
  const formatResponseText = ({ itinerary, budgetPlan, recommendations }) => {
    let responseText = "";

    // Itinerary Section
    if (itinerary) {
      responseText += `🌟 **Itinerary: ${itinerary.split("\n")[0].replace("Title: ", "")}**\n`;
      const days = itinerary.split("\n\n"); // Split into days
      days.forEach((dayText) => {
        const lines = dayText.trim().split("\n");
        const dayHeader = lines[0].replace("Day ", "**Day ").replace(":", ":**"); // Format day header
        responseText += `\n${dayHeader}\n`;
        lines.slice(1).forEach((line) => {
          if (line.trim()) {
            responseText += `  - ${line.trim()}\n`;
          }
        });
      });
      responseText += "\n";
    }

    // Budget Plan Section
    if (budgetPlan && budgetPlan !== "Budget not provided.") {
      responseText += `💰 **Budget Plan: Cost Breakdown**\n`;
      responseText += `- ${budgetPlan}\n`;
    } else {
      responseText += `💰 **Budget Plan:** No budget details provided.\n`;
    }

    // Recommendations Section
    if (recommendations) {
      responseText += `✨ **Recommendations: ${recommendations.split("\n")[0].replace("Title: ", "")}**\n`;
      const days = recommendations.split("\n\n"); // Split into days
      days.forEach((dayText) => {
        const lines = dayText.trim().split("\n");
        const dayHeader = lines[0].replace("Day ", "**Day ").replace(":", ":**"); // Format day header
        responseText += `\n${dayHeader}\n`;
        lines.slice(1).forEach((line) => {
          if (line.trim()) {
            responseText += `  - ${line.trim()}\n`;
          }
        });
      });
    }

    return responseText || "Hmm, I couldn’t generate a plan. Could you clarify your request?";
  };

  // Reset chat to initial state
  const resetChat = () => {
    setMessages([
      {
        sender: "assistant",
        text: "Hello! I’m your Travel Assistant. Tell me about your trip (e.g., '4-day trip to Ooty with ₹20000 budget, I like nature').",
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);
    setInput("");
    setError(null);
  };

  // --------------------- EVENT HANDLERS ---------------------
  // Handle sending a message and fetching response from backend
  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) {
      setError("Please enter a trip request!");
      return;
    }

    const userMessage = {
      sender: "user",
      text: input,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    setError(null);

    const { query, budget, preferences } = extractDetails(input);

    try {
      // Fetch response from backend
      const res = await axios.post("http://localhost:5000/ask", {
        query: query || input,
        budget,
        preferences,
        agentType: "all",
      });

      const assistantMessage = {
        sender: "assistant",
        text: formatResponseText(res.data.data),
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      setError(err.response?.data?.error || "Oops! Something went wrong. Try again?");
      setMessages((prev) => [
        ...prev,
        {
          sender: "assistant",
          text: `Error: ${err.response?.data?.error || "Failed to connect. Please retry!"}`,
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // --------------------- UI RENDERING ---------------------
  return (
    <div className="chat-app">
      {/* HEADER */}
      <header className="header">
        <h1>🌍 Travel Assistant Chat</h1>
        <button className="reset-btn" onClick={resetChat} aria-label="Reset chat">
          🔄 Reset
        </button>
      </header>

      {/* WELCOME BANNER */}
      <div className="welcome-banner">
        <p>
          Plan your perfect trip! Type something like: "4-day trip to Ooty with ₹20000 budget, I like nature."
        </p>
      </div>

      {/* CHAT WINDOW */}
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.sender === "user" ? "user" : "assistant"}`}
          >
            <div className="message-content">
              <span className="message-text">{msg.text}</span>
              <span className="timestamp">{msg.timestamp}</span>
            </div>
          </div>
        ))}

        {loading && (
          <div className="message assistant">
            <div className="message-content">
              ⏳ Planning your trip... <span className="spinner" />
            </div>
          </div>
        )}

        {error && <div className="error-message">{error}</div>}

        <div ref={messagesEndRef} />
      </div>

      {/* INPUT AREA */}
      <form onSubmit={handleSend} className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g., 4-day trip to Ooty with ₹20000, I like nature"
          disabled={loading}
          aria-label="Enter your travel request"
        />
        <button type="submit" disabled={loading} aria-label="Send message">
          ➤ Send
        </button>
      </form>
    </div>
  );
};

export default App;