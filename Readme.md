# AI Travel Agent

## Project Structure
```
AI_AGENT
├── client
│   ├── node_modules
│   ├── public
│   │   ├── vite.svg
│   ├── src
│   │   ├── ChatBot.css
│   │   ├── main.jsx
│   │   ├── TravelAgent.jsx
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   ├── vite.config.js
│
├── server
│   ├── node_modules
│   ├── .env
│   ├── .gitignore
│   ├── aiAgent.js
│   ├── budgetPlannerAgent.js
│   ├── package-lock.json
│   ├── package.json
│   ├── server.js
```

## Problem Description
### Issue: Budget Breakdown Display
- **Current Behavior:** The budget breakdown feature currently provides only the total estimated cost for the trip instead of showing a day-wise breakdown of expenses.
- **Expected Behavior:** The budget breakdown should display detailed costs for each day, including accommodation, transportation, food, and activities.
