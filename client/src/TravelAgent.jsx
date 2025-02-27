import { useState } from "react";

function TravelAgent() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleAsk() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("http://localhost:5000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      const data = await res.json();
      console.log("API Response:", data); // Debugging step

      if (!res.ok || !data.data) {
        throw new Error(data.message || "Invalid itinerary response format.");
      }

      // Convert itinerary text to structured format
      const structuredItinerary = parseItinerary(data.data);

      if (!structuredItinerary.length) {
        throw new Error("Could not parse itinerary. Please try again.");
      }

      setResponse(structuredItinerary);
    } catch (err) {
      setError(err.message);
      setResponse(null);
    } finally {
      setLoading(false);
    }
  }

  // Function to parse text response into structured format
  function parseItinerary(text) {
    const days = text.split(/Day \d+:/).slice(1); // Split on 'Day X:' and remove empty first element

    return days.map((day, index) => {
      const lines = day.trim().split("\n").filter(line => line); // Split into lines and remove empty ones
      const title = lines.shift(); // First line is the title
      const activities = lines.map(line => line.replace(/^- /, "")); // Remove leading '- '

      return { title, activities };
    });
  }

  return (
    <div className="container">
      <h1>AI Travel Agent</h1>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Describe your tour plan..."
      />
      <button onClick={handleAsk} disabled={loading}>
        {loading ? "Generating..." : "Generate Itinerary"}
      </button>

      {error && <p className="error">{error}</p>}

      {response ? (
        <div className="itinerary">
          <h2>Itinerary</h2>
          {response.map((day, index) => (
            <div key={index} className="day">
              <h3>Day {index + 1}: {day.title}</h3>
              <ul>
                {day.activities.map((activity, i) => (
                  <li key={i}>{activity}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p>No itinerary available. Please try again.</p>
      )}
    </div>
  );
}

export default TravelAgent;
