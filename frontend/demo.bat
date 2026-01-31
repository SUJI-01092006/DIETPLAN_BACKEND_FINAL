@echo off
echo ================================
echo   Meal Planner Clone Demo
echo ================================
echo.
echo Starting the Meal Planner application...
echo.
echo 1. Landing Page: landing.html
echo 2. Main Dashboard: index.html  
echo 3. Create Plan: pages/create-plan.html
echo 4. Meal Planner: pages/meal.html
echo 5. Sign Up: signup.html
echo 6. Login: login.html
echo.
echo Opening landing page in your default browser...
echo.

REM Try to open the landing page in the default browser
start "" "landing.html"

echo.
echo ================================
echo   Demo Instructions
echo ================================
echo.
echo 1. Start with the landing page (should open automatically)
echo 2. Click "Get Started For Free" to create an account
echo 3. Fill out the signup form and submit
echo 4. Navigate to "Create Plan" to set up your nutrition targets
echo 5. Choose a template or customize your own plan settings
echo 6. Click "Generate My Personalized Meal Plan" to create your plan
echo 7. Navigate to the Meal Planner to see your customized targets
echo 8. Try these features:
echo    - Click "Generate Meal Plan" to auto-fill meals
echo    - Click "Add Meal" buttons to add individual meals
echo    - Click the swap (🔄) buttons to change meals
echo    - Click "Save Plan" to store your plan
echo    - Click "Download PDF" to export your plan
echo.
echo ================================
echo   Key Features to Test
echo ================================
echo.
echo ✓ Personalized nutrition target setting
echo ✓ Quick start templates (Weight Loss, Muscle Gain, etc.)
echo ✓ Responsive design (try resizing your browser)
echo ✓ Meal generation and swapping
echo ✓ Nutrition tracking and daily totals
echo ✓ Local storage (your data persists between sessions)
echo ✓ User authentication flow
echo ✓ Interactive notifications
echo ✓ Plan history and data persistence
echo.
echo Press any key to exit...
pause >nul