// import axios from "axios";
// import React, { useState, useEffect } from "react";
// import toast from "react-hot-toast";
// import { useSelector } from "react-redux";

// const QueryHistory = () => {
//   const user = useSelector((state) => state.user.currentUser);
//   const [history, setHistory] = useState([]);
//   const [query, setQuery] = useState("");

//   useEffect(() => {
//     fetchHistory();
//   }, []);

//   const fetchHistory = async () => {
//     try {
//       const response = await axios.post(
//         `http://localhost:5000/api/admin/getUserHistory/${user._id}`
//       );
//       setHistory(response?.data?.userHistory);
//     } catch (error) {
//       toast.error("Failed to fetch history");
//       console.log(error);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!query) {
//       toast.error("Please type a query");
//       return;
//     }

//     try {
//       const response = await axios.post("http://localhost:5000/api/query/ask", {
//         userId: user._id,
//         query,
//       });
//       toast.success("Query sent successfully");
//       setQuery("");
//       fetchHistory();
//     } catch (error) {
//       toast.error("Failed to submit query");
//       console.error(error.message);
//     }
//   };

//   return (
//     <div className="chat-app">
//       <header className="header">
//         <h1>User Query History</h1>
//       </header>

//       <div className="chat-window">
//         {history.length > 0 ? (
//           history.map((item) => (
//             <div
//               key={item._id}
//               className="message assistant"
//               style={{
//                 border: "1px solid #ccc",
//                 padding: "10px",
//                 marginBottom: "10px",
//                 borderRadius: "8px",
//               }}
//             >
//               <div className="message-content">
//                 <strong>Query:</strong> {item.query}
//                 <br />
//                 <strong>Response:</strong>{" "}
//                 {typeof item.response === "string"
//                   ? item.response
//                   : JSON.stringify(item.response)}
//                 <br />
//                 <strong>Date:</strong>{" "}
//                 {new Date(item.createdAt).toLocaleString()}
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No history found.</p>
//         )}
//       </div>

//       <form onSubmit={handleSubmit} className="chat-input">
//         <input
//           type="text"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           placeholder="Type your query here..."
//           className="flex-1 border border-gray-300 p-2 rounded"
//         />
//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default QueryHistory;
  

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import "../App.css"; // Assuming your chat styles are here too

const QueryHistory = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [history, setHistory] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const fetchHistory = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/admin/getUserHistory/${user._id}`
      );
      setHistory(response?.data?.userHistory);
    } catch (error) {
      toast.error("Failed to fetch history");
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      toast.error("Please type a query");
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/query/ask", {
        userId: user._id,
        query,
      });
      toast.success("Query sent successfully");
      setQuery("");
      fetchHistory();
    } catch (error) {
      toast.error("Failed to submit query");
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-app">
      <header className="header">
        <h1>💬 Query </h1>
      </header>

      <div className="chat-window">
        {history.length > 0 ? (
          history.map((item) => (
            <div key={item._id}>
              <div className="message user">
                <div className="message-content">
                  <span className="message-text">{item.query}</span>
                  <span className="timestamp">
                    {new Date(item.createdAt).toLocaleTimeString()}
                  </span>
                </div>
              </div>

              <div className="message assistant">
                <div className="message-content">
                  <span className="message-text">
                    {typeof item.response === "string"
                      ? item.response
                      : JSON.stringify(item.response)}
                  </span>
                  <span className="timestamp">
                    {new Date(item.createdAt).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No history found.</p>
        )}

        {loading && (
          <div className="message assistant">
            <div className="message-content">⏳Loading Please wait...</div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="chat-input">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type your query here..."
          disabled={loading}
          aria-label="Enter your query"
        />
        <button type="submit" disabled={loading} aria-label="Send query">
          ➤ Send
        </button>
      </form>
    </div>
  );
};

export default QueryHistory;
