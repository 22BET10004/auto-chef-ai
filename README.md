# Nutrition Planner Web App

A production-style student project built with Next.js (React), Node-style API routes, and MongoDB-ready models.  
It upgrades a simple planner into an intelligent diet and health assistant with modular architecture and demo-friendly AI features.

## Implemented Features

- AI-based diet recommendation (rule-based): BMI, BMR, calories, personalized meal plan
- Health analytics dashboard: BMI status, calories trend, weekly progress charts
- Grocery list generator: category-wise list with PDF + CSV export
- Food image recognition (simplified AI): image filename mapping to food + calories
- Reminder system: breakfast/lunch/dinner alert simulation
- Personalization filters: veg/non-veg/vegan/high-protein/keto/Indian + region choice
- Workout + diet integration: goal-based exercise suggestions
- Chatbot assistant: rule-based nutrition responses
- Authentication: JWT signup/login routes
- Indian diet localization: north/south/punjabi filters
- Extra features: dark mode, water intake tracker, full diet plan PDF export

## Updated Folder Structure

- `app/`
  - `layout.jsx`
  - `page.jsx`
  - `globals.css`
  - `login/page.jsx`
  - `dashboard/page.jsx`
  - `planner/page.jsx`
  - `chat/page.jsx`
  - `profile/page.jsx`
  - `api/auth/login/route.js`
  - `api/auth/logout/route.js`
  - `api/auth/signup/route.js`
  - `api/profile/route.js`
  - `api/recommendation/route.js`
  - `api/progress/route.js`
  - `api/chatbot/route.js`
  - `api/food-recognition/route.js`
  - `api/diet-plan/route.js`
- `middleware.js`
- `components/`
  - `UserProfileForm.jsx`
  - `MealPlanner.jsx`
  - `HealthDashboard.jsx`
  - `GroceryList.jsx`
  - `FoodRecognition.jsx`
  - `ReminderPanel.jsx`
  - `ChatbotAssistant.jsx`
  - `ThemeAndWater.jsx`
- `models/`
  - `User.js`
  - `DietPlan.js`
  - `ProgressLog.js`
- `services/`
  - `db.js`
  - `auth.js`
  - `api.js`
- `utils/`
  - `health.js`
  - `mealDataset.js`
  - `foodImageMock.js`
- `jsconfig.json`

## Data Models

- `User`: profile + auth + goal fields
- `DietPlan`: generated plan, meals, calories, BMI status, workouts
- `ProgressLog`: date-wise calories, water, weight tracking

## Run Instructions

1. Install dependencies:
   - `npm install`
2. Create `.env.local`:
   - `MONGODB_URI=mongodb://127.0.0.1:27017/nutrition_planner`
   - `JWT_SECRET=replace_with_a_secure_value`
3. Start dev server:
   - `npm run dev`
4. Open:
   - `http://localhost:3000`

## Notes for Viva

- Core backend logic:
  - `app/api/recommendation/route.js`
  - `app/api/auth/*`
  - `models/*`
- Core AI/rule logic:
  - `utils/health.js`
  - `utils/mealDataset.js`
  - `utils/foodImageMock.js`
- Frontend architecture and reusable components:
  - `app/page.jsx`
  - `components/*`

