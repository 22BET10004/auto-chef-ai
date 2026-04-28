# AI Nutrition Planner

Production-ready, viva-friendly: **React + Tailwind** frontend, **Node + Express + MongoDB** backend.

## Features (5 core)
1. **AI Diet Recommendation** — BMI, BMR, daily calories, personalized meal plan (rule-based)
2. **Health Analytics Dashboard** — BMI status, calorie target vs consumed, weekly chart (Recharts)
3. **Grocery List Generator** — auto-grouped by Vegetables / Grains / Protein, CSV + PDF export
4. **Chatbot Assistant** — rule-based responses, no external AI
5. **Workout + Diet Integration** — workouts auto-suggested by goal

## Folder Structure
```
/frontend
  /src
    /components   MealPlanner, Dashboard, Chatbot, GroceryList, WorkoutSuggestions, MealCards
    /services     api.js
    /utils        health.js
    App.jsx, main.jsx, index.css
/backend
  /routes         recommendation, grocery, chatbot, progress
  /controllers
  /models         UserPlan, ProgressLog
  /utils          health.js, mealDataset.js, db.js
  server.js
```

## Run Locally

### Prerequisites
- Node.js 18+
- MongoDB running locally (`mongod`) at `mongodb://127.0.0.1:27017`

### 1. Backend
```bash
cd backend
cp .env.example .env
npm install
npm run dev          # http://localhost:5000
```

### 2. Frontend (in a new terminal)
```bash
cd frontend
cp .env.example .env
npm install
npm run dev          # http://localhost:5173
```

Open http://localhost:5173 — fill the profile form → **Generate My Plan**.

## API Endpoints
| Method | Path                       | Purpose                       |
|--------|----------------------------|-------------------------------|
| POST   | /api/recommendation        | Generate diet + workout plan  |
| GET    | /api/recommendation        | List recent plans             |
| POST   | /api/grocery               | Build grocery list from plan  |
| POST   | /api/grocery/export-csv    | Server-side CSV export        |
| POST   | /api/chatbot               | Ask the assistant             |
| POST   | /api/progress              | Log daily progress            |
| GET    | /api/progress              | Last 7 progress logs          |

## Viva Cheat Sheet
- **BMI** = weight(kg) / height(m)²
- **BMR** = Mifflin-St Jeor formula in `backend/utils/health.js`
- **Calories** = BMR × activity factor ± goal adjustment
- **Meal selection** = filter by tags (veg / non-veg / high-protein) in `mealDataset.js`
- **Workouts** = mapped by goal (loss → cardio, gain → strength, maintain → mixed)
