// Sample meal database
const mealDatabase = {
  breakfast: [
    { name: "Oatmeal with Berries", calories: 320, protein: 12, carbs: 45, fat: 8 },
    { name: "Avocado Toast", calories: 280, protein: 8, carbs: 30, fat: 18 },
    { name: "Scrambled Eggs", calories: 300, protein: 18, carbs: 5, fat: 24 },
    { name: "Greek Yogurt Parfait", calories: 250, protein: 15, carbs: 35, fat: 6 },
    { name: "Protein Pancakes", calories: 350, protein: 20, carbs: 40, fat: 12 }
  ],
  lunch: [
    { name: "Grilled Chicken Salad", calories: 450, protein: 35, carbs: 20, fat: 25 },
    { name: "Quinoa Bowl", calories: 380, protein: 16, carbs: 55, fat: 12 },
    { name: "Turkey Sandwich", calories: 420, protein: 28, carbs: 45, fat: 15 },
    { name: "Buddha Bowl", calories: 400, protein: 18, carbs: 50, fat: 16 },
    { name: "Chicken Wrap", calories: 390, protein: 25, carbs: 35, fat: 18 }
  ],
  dinner: [
    { name: "Baked Salmon", calories: 520, protein: 40, carbs: 15, fat: 30 },
    { name: "Beef Stir Fry", calories: 480, protein: 32, carbs: 25, fat: 28 },
    { name: "Pasta Primavera", calories: 450, protein: 18, carbs: 65, fat: 16 },
    { name: "Grilled Chicken Breast", calories: 400, protein: 45, carbs: 10, fat: 18 },
    { name: "Vegetable Curry", calories: 380, protein: 15, carbs: 55, fat: 14 }
  ],
  snack: [
    { name: "Greek Yogurt", calories: 150, protein: 15, carbs: 12, fat: 6 },
    { name: "Protein Smoothie", calories: 200, protein: 20, carbs: 15, fat: 8 },
    { name: "Mixed Nuts", calories: 180, protein: 6, carbs: 8, fat: 16 },
    { name: "Apple with Peanut Butter", calories: 190, protein: 8, carbs: 20, fat: 12 },
    { name: "Protein Bar", calories: 220, protein: 18, carbs: 22, fat: 9 }
  ]
};

// Meal planner functionality
class MealPlanner {
  constructor() {
    this.currentPlan = {};
    this.loadNutritionTargets();
    this.initializeEventListeners();
  }

  loadNutritionTargets() {
    const currentPlan = localStorage.getItem('currentPlan');
    if (currentPlan) {
      const plan = JSON.parse(currentPlan);
      this.updateNutritionTargets(plan);
    }
  }

  updateNutritionTargets(plan) {
    const targetCards = document.querySelectorAll('.target-card');
    if (targetCards.length >= 4) {
      targetCards[0].querySelector('.target-value').textContent = plan.calories || '2000';
      targetCards[1].querySelector('.target-value').textContent = `${plan.protein || '150'}g`;
      targetCards[2].querySelector('.target-value').textContent = `${plan.carbs || '250'}g`;
      targetCards[3].querySelector('.target-value').textContent = `${plan.fat || '67'}g`;
    }
  }

  initializeEventListeners() {
    // Generate meal plan button
    document.querySelector('.btn-generate')?.addEventListener('click', () => {
      this.generateMealPlan();
    });

    // Save plan button
    document.querySelector('.btn-save')?.addEventListener('click', () => {
      this.saveMealPlan();
    });

    // Download PDF button
    document.querySelector('.btn-download')?.addEventListener('click', () => {
      this.downloadPDF();
    });

    // Add meal buttons
    document.querySelectorAll('.add-meal-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.addMeal(e.target);
      });
    });

    // Swap meal buttons
    document.querySelectorAll('.swap-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.swapMeal(e.target);
      });
    });
  }

  generateMealPlan() {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const mealTypes = ['breakfast', 'lunch', 'dinner', 'snack'];
    
    days.forEach((day, dayIndex) => {
      const dayColumn = document.querySelectorAll('.day-column')[dayIndex];
      if (!dayColumn) return;

      let dailyTotal = { calories: 0, protein: 0, carbs: 0, fat: 0 };

      mealTypes.forEach((mealType, mealIndex) => {
        const mealSlot = dayColumn.querySelectorAll('.meal-slot')[mealIndex];
        if (!mealSlot) return;

        // Get random meal from database
        const meals = mealDatabase[mealType];
        const randomMeal = meals[Math.floor(Math.random() * meals.length)];

        // Update meal slot
        this.updateMealSlot(mealSlot, randomMeal, mealType);
        
        // Add to daily total
        dailyTotal.calories += randomMeal.calories;
        dailyTotal.protein += randomMeal.protein;
        dailyTotal.carbs += randomMeal.carbs;
        dailyTotal.fat += randomMeal.fat;
      });

      // Update daily total
      const totalElement = dayColumn.querySelector('.daily-total');
      if (totalElement) {
        totalElement.innerHTML = `<strong>Total: ${dailyTotal.calories} cal</strong>`;
      }
    });

    this.showNotification('Meal plan generated successfully!');
  }

  updateMealSlot(mealSlot, meal, mealType) {
    const mealContent = mealSlot.querySelector('.meal-content');
    const addBtn = mealSlot.querySelector('.add-meal-btn');
    
    if (addBtn) {
      // Replace add button with swap button
      addBtn.outerHTML = '<button class="swap-btn">🔄</button>';
      // Re-attach event listener
      mealSlot.querySelector('.swap-btn').addEventListener('click', (e) => {
        this.swapMeal(e.target);
      });
    }

    if (!mealContent) {
      // Create meal content if it doesn't exist
      const newContent = document.createElement('div');
      newContent.className = 'meal-content';
      mealSlot.appendChild(newContent);
    }

    const content = mealSlot.querySelector('.meal-content');
    content.innerHTML = `
      <h4>${meal.name}</h4>
      <p>${meal.calories} cal • ${meal.protein}g protein • ${meal.carbs}g carbs • ${meal.fat}g fat</p>
    `;
  }

  addMeal(button) {
    const mealSlot = button.closest('.meal-slot');
    const mealTypeElement = mealSlot.querySelector('.meal-type');
    const mealTypeText = mealTypeElement.textContent.toLowerCase();
    
    let mealType = 'breakfast';
    if (mealTypeText.includes('lunch')) mealType = 'lunch';
    else if (mealTypeText.includes('dinner')) mealType = 'dinner';
    else if (mealTypeText.includes('snack')) mealType = 'snack';

    // Get random meal from database
    const meals = mealDatabase[mealType];
    const randomMeal = meals[Math.floor(Math.random() * meals.length)];

    // Update meal slot
    this.updateMealSlot(mealSlot, randomMeal, mealType);
    
    // Add to history via API
    this.saveToHistory('recipes', randomMeal.name, randomMeal);
    
    // Update daily total for this day
    this.updateDayTotal(mealSlot.closest('.day-column'));
    
    this.showNotification(`${randomMeal.name} added to your meal plan!`);
  }

  swapMeal(button) {
    const mealSlot = button.closest('.meal-slot');
    const mealTypeElement = mealSlot.querySelector('.meal-type');
    const mealTypeText = mealTypeElement.textContent.toLowerCase();
    
    let mealType = 'breakfast';
    if (mealTypeText.includes('lunch')) mealType = 'lunch';
    else if (mealTypeText.includes('dinner')) mealType = 'dinner';
    else if (mealTypeText.includes('snack')) mealType = 'snack';

    // Get different random meal from database
    const meals = mealDatabase[mealType];
    const currentMealName = mealSlot.querySelector('h4')?.textContent;
    let newMeal;
    
    do {
      newMeal = meals[Math.floor(Math.random() * meals.length)];
    } while (newMeal.name === currentMealName && meals.length > 1);

    // Update meal slot
    this.updateMealSlot(mealSlot, newMeal, mealType);
    
    // Update daily total for this day
    this.updateDayTotal(mealSlot.closest('.day-column'));
    
    this.showNotification(`Meal swapped to ${newMeal.name}!`);
  }

  updateDayTotal(dayColumn) {
    const mealSlots = dayColumn.querySelectorAll('.meal-slot');
    let dailyTotal = { calories: 0, protein: 0, carbs: 0, fat: 0 };

    mealSlots.forEach(slot => {
      const mealContent = slot.querySelector('.meal-content p');
      if (mealContent) {
        const text = mealContent.textContent;
        const calories = parseInt(text.match(/(\d+) cal/)?.[1] || 0);
        dailyTotal.calories += calories;
      }
    });

    const totalElement = dayColumn.querySelector('.daily-total');
    if (totalElement) {
      totalElement.innerHTML = `<strong>Total: ${dailyTotal.calories} cal</strong>`;
    }
  }

  saveMealPlan() {
    // Save to localStorage
    const planData = this.extractPlanData();
    planData.id = Date.now().toString();
    planData.name = `Meal Plan - ${new Date().toLocaleDateString()}`;
    planData.date = new Date().toISOString();
    planData.totalCalories = this.calculateTotalCalories(planData);
    
    localStorage.setItem('mealPlan', JSON.stringify(planData));
    
    // Save to database via API
    this.saveToHistory('meals', planData.name, planData);
    
    this.showNotification('Meal plan saved successfully!');
  }
  
  calculateTotalCalories(planData) {
    let total = 0;
    Object.values(planData).forEach(day => {
      if (day.meals) {
        day.meals.forEach(meal => {
          const calories = meal.nutrition.match(/(\d+) cal/)?.[1];
          if (calories) total += parseInt(calories);
        });
      }
    });
    return total;
  }

  extractPlanData() {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const plan = {};

    days.forEach((day, dayIndex) => {
      const dayColumn = document.querySelectorAll('.day-column')[dayIndex];
      if (!dayColumn) return;

      plan[day] = {
        meals: [],
        total: dayColumn.querySelector('.daily-total')?.textContent || 'Total: 0 cal'
      };

      const mealSlots = dayColumn.querySelectorAll('.meal-slot');
      mealSlots.forEach(slot => {
        const mealType = slot.querySelector('.meal-type')?.textContent || '';
        const mealContent = slot.querySelector('.meal-content');
        
        if (mealContent) {
          const name = mealContent.querySelector('h4')?.textContent || '';
          const nutrition = mealContent.querySelector('p')?.textContent || '';
          
          plan[day].meals.push({
            type: mealType,
            name: name,
            nutrition: nutrition
          });
        }
      });
    });

    return plan;
  }

  downloadPDF() {
    // Simple PDF generation (in a real app, you'd use a library like jsPDF)
    const planData = this.extractPlanData();
    let pdfContent = 'WEEKLY MEAL PLAN\n\n';
    
    Object.keys(planData).forEach(day => {
      pdfContent += `${day.toUpperCase()}\n`;
      pdfContent += '='.repeat(day.length) + '\n';
      
      planData[day].meals.forEach(meal => {
        if (meal.name) {
          pdfContent += `${meal.type}: ${meal.name}\n`;
          pdfContent += `  ${meal.nutrition}\n\n`;
        }
      });
      
      pdfContent += `${planData[day].total}\n\n`;
    });

    // Create downloadable text file (in lieu of PDF)
    const blob = new Blob([pdfContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'meal-plan.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    this.showNotification('Meal plan downloaded!');
  }

  showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #28a745;
      color: white;
      padding: 15px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
      z-index: 1000;
      animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }

  async saveToHistory(type, name, data) {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData || !userData._id) {
      console.error('No user data found for history save');
      return;
    }

    // Save to database
    fetch(`http://localhost:5000/api/history/${userData._id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, name, data })
    }).catch(error => console.error('Database save failed:', error));
    
    // Save to localStorage
    if (userData.email) {
      const userHistoryKey = `mealPlanHistory_${userData.email}`;
      const history = JSON.parse(localStorage.getItem(userHistoryKey)) || [];
      const historyItem = {
        id: Date.now().toString(),
        type: type,
        name: name,
        date: new Date().toISOString(),
        data: data
      };
      history.unshift(historyItem);
      if (history.length > 50) history.pop();
      localStorage.setItem(userHistoryKey, JSON.stringify(history));
      localStorage.setItem('mealPlanHistory', JSON.stringify(history));
    }
  }
}

// Add CSS for notifications
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  @keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }
`;
document.head.appendChild(style);

// Initialize meal planner when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Ensure API is available
  if (typeof api === 'undefined') {
    console.warn('API not loaded, history may not save to database');
  }
  new MealPlanner();
});