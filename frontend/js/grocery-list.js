// Grocery List functionality
class GroceryList {
  constructor() {
    this.groceryItems = this.loadGroceryList();
    this.initializeEventListeners();
    this.renderGroceryList();
    this.updateStats();
  }

  initializeEventListeners() {
    // Add item buttons
    document.querySelectorAll('.add-item-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.showAddItemForm(e.target.dataset.category);
      });
    });
  }

  generateFromMealPlan() {
    // Get meal plan from localStorage
    const mealPlan = JSON.parse(localStorage.getItem('mealPlan') || '{}');
    
    if (Object.keys(mealPlan).length === 0) {
      this.showNotification('No meal plan found. Please create a meal plan first.', 'warning');
      return;
    }

    // Sample ingredient mapping for meals
    const ingredientMap = {
      'Oatmeal with Berries': ['Rolled oats', 'Mixed berries', 'Milk', 'Honey'],
      'Avocado Toast': ['Bread', 'Avocado', 'Salt', 'Pepper', 'Lemon'],
      'Scrambled Eggs': ['Eggs', 'Butter', 'Salt', 'Pepper'],
      'Grilled Chicken Salad': ['Chicken breast', 'Mixed greens', 'Tomatoes', 'Cucumber', 'Olive oil'],
      'Quinoa Bowl': ['Quinoa', 'Black beans', 'Bell peppers', 'Corn', 'Lime'],
      'Turkey Sandwich': ['Turkey slices', 'Bread', 'Lettuce', 'Tomato', 'Mayo'],
      'Baked Salmon': ['Salmon fillet', 'Lemon', 'Garlic', 'Olive oil', 'Herbs'],
      'Beef Stir Fry': ['Beef strips', 'Broccoli', 'Bell peppers', 'Soy sauce', 'Ginger'],
      'Pasta Primavera': ['Pasta', 'Zucchini', 'Bell peppers', 'Tomatoes', 'Parmesan'],
      'Greek Yogurt': ['Greek yogurt', 'Honey', 'Granola'],
      'Protein Smoothie': ['Protein powder', 'Banana', 'Milk', 'Peanut butter'],
      'Mixed Nuts': ['Almonds', 'Walnuts', 'Cashews']
    };

    // Extract ingredients from meal plan
    const ingredients = new Set();
    Object.values(mealPlan).forEach(day => {
      if (day.meals) {
        day.meals.forEach(meal => {
          if (meal.name && ingredientMap[meal.name]) {
            ingredientMap[meal.name].forEach(ingredient => {
              ingredients.add(ingredient);
            });
          }
        });
      }
    });

    // Categorize ingredients
    const categories = {
      proteins: ['Chicken breast', 'Turkey slices', 'Salmon fillet', 'Beef strips', 'Eggs', 'Protein powder'],
      vegetables: ['Mixed greens', 'Tomatoes', 'Cucumber', 'Bell peppers', 'Broccoli', 'Zucchini', 'Lettuce'],
      fruits: ['Mixed berries', 'Banana', 'Lemon', 'Lime'],
      grains: ['Rolled oats', 'Bread', 'Quinoa', 'Pasta'],
      dairy: ['Milk', 'Greek yogurt', 'Butter', 'Parmesan'],
      pantry: ['Honey', 'Salt', 'Pepper', 'Olive oil', 'Soy sauce', 'Ginger', 'Garlic', 'Mayo', 'Black beans', 'Corn', 'Granola', 'Peanut butter', 'Herbs', 'Almonds', 'Walnuts', 'Cashews']
    };

    // Add ingredients to grocery list
    let addedCount = 0;
    ingredients.forEach(ingredient => {
      const category = this.categorizeIngredient(ingredient, categories);
      if (!this.groceryItems[category]) {
        this.groceryItems[category] = [];
      }
      
      // Check if item already exists
      const exists = this.groceryItems[category].some(item => item.name === ingredient);
      if (!exists) {
        this.groceryItems[category].push({
          id: Date.now() + Math.random(),
          name: ingredient,
          quantity: '1',
          checked: false,
          estimatedCost: this.getEstimatedCost(ingredient)
        });
        addedCount++;
      }
    });

    this.saveGroceryList();
    this.renderGroceryList();
    this.updateStats();
    this.showNotification(`Generated grocery list with ${addedCount} new items from your meal plan!`);
  }

  categorizeIngredient(ingredient, categories) {
    for (const [category, items] of Object.entries(categories)) {
      if (items.includes(ingredient)) {
        return category;
      }
    }
    return 'pantry'; // Default category
  }

  getEstimatedCost(ingredient) {
    // Simple cost estimation
    const costs = {
      'Chicken breast': 8.99,
      'Salmon fillet': 12.99,
      'Beef strips': 9.99,
      'Turkey slices': 5.99,
      'Eggs': 3.49,
      'Milk': 3.99,
      'Greek yogurt': 4.99,
      'Mixed berries': 4.49,
      'Avocado': 1.99,
      'Bread': 2.99,
      'Quinoa': 5.99,
      'Pasta': 1.99
    };
    return costs[ingredient] || Math.random() * 5 + 1; // Random price between $1-6
  }

  showAddItemForm(category) {
    // Remove any existing forms
    document.querySelectorAll('.add-item-form').forEach(form => form.remove());

    const section = document.querySelector(`[data-category="${category}"]`).parentElement;
    const form = document.createElement('div');
    form.className = 'add-item-form active';
    form.innerHTML = `
      <div class="form-group">
        <label>Item Name</label>
        <input type="text" id="item-name" placeholder="Enter item name" required>
      </div>
      <div class="form-group">
        <label>Quantity</label>
        <input type="text" id="item-quantity" placeholder="e.g., 2 lbs, 1 bottle" value="1">
      </div>
      <div class="form-actions">
        <button class="btn-save">Add Item</button>
        <button class="btn-cancel">Cancel</button>
      </div>
    `;

    section.insertBefore(form, section.querySelector('.add-item-btn'));

    // Form event listeners
    form.querySelector('.btn-save').addEventListener('click', () => {
      const name = form.querySelector('#item-name').value.trim();
      const quantity = form.querySelector('#item-quantity').value.trim();
      
      if (name) {
        this.addItem(category, name, quantity);
        form.remove();
      }
    });

    form.querySelector('.btn-cancel').addEventListener('click', () => {
      form.remove();
    });

    form.querySelector('#item-name').focus();
  }

  addItem(category, name, quantity) {
    if (!this.groceryItems[category]) {
      this.groceryItems[category] = [];
    }

    const newItem = {
      id: Date.now() + Math.random(),
      name: name,
      quantity: quantity,
      checked: false,
      estimatedCost: this.getEstimatedCost(name)
    };

    this.groceryItems[category].push(newItem);
    this.saveGroceryList();
    this.renderGroceryList();
    this.updateStats();
    this.showNotification(`Added "${name}" to ${category}!`);
  }

  toggleItem(category, itemId) {
    const item = this.groceryItems[category]?.find(item => item.id === itemId);
    if (item) {
      item.checked = !item.checked;
      this.saveGroceryList();
      this.updateStats();
      this.renderGroceryList();
    }
  }

  deleteItem(category, itemId) {
    if (this.groceryItems[category]) {
      this.groceryItems[category] = this.groceryItems[category].filter(item => item.id !== itemId);
      this.saveGroceryList();
      this.renderGroceryList();
      this.updateStats();
      this.showNotification('Item deleted!');
    }
  }

  renderGroceryList() {
    const categories = ['proteins', 'vegetables', 'fruits', 'grains', 'dairy', 'pantry'];
    
    categories.forEach(category => {
      const container = document.querySelector(`[data-category="${category}"]`);
      if (!container) return;

      container.innerHTML = '';
      
      if (this.groceryItems[category]) {
        this.groceryItems[category].forEach(item => {
          const itemElement = document.createElement('div');
          itemElement.className = `grocery-item ${item.checked ? 'checked' : ''}`;
          itemElement.innerHTML = `
            <div class="item-content">
              <input type="checkbox" class="item-checkbox" ${item.checked ? 'checked' : ''}>
              <div class="item-details">
                <div class="item-name">${item.name}</div>
                <div class="item-quantity">${item.quantity}</div>
              </div>
            </div>
            <div class="item-actions">
              <button class="edit-btn" title="Edit">✏️</button>
              <button class="delete-btn" title="Delete">🗑️</button>
            </div>
          `;

          // Event listeners
          itemElement.querySelector('.item-checkbox').addEventListener('change', () => {
            this.toggleItem(category, item.id);
          });

          itemElement.querySelector('.delete-btn').addEventListener('click', () => {
            this.deleteItem(category, item.id);
          });

          container.appendChild(itemElement);
        });
      }
    });
  }

  updateStats() {
    let totalItems = 0;
    let checkedItems = 0;
    let estimatedCost = 0;

    Object.values(this.groceryItems).forEach(categoryItems => {
      if (Array.isArray(categoryItems)) {
        categoryItems.forEach(item => {
          totalItems++;
          if (item.checked) checkedItems++;
          estimatedCost += item.estimatedCost || 0;
        });
      }
    });

    document.getElementById('total-items').textContent = totalItems;
    document.getElementById('checked-items').textContent = checkedItems;
    document.getElementById('estimated-cost').textContent = `$${estimatedCost.toFixed(2)}`;
  }

  clearAllItems() {
    if (confirm('Are you sure you want to clear all items from your grocery list?')) {
      this.groceryItems = {};
      this.saveGroceryList();
      this.renderGroceryList();
      this.updateStats();
      this.showNotification('Grocery list cleared!');
    }
  }

  downloadGroceryList() {
    let listContent = 'GROCERY LIST\n\n';
    const categories = {
      proteins: '🥩 PROTEINS',
      vegetables: '🥬 VEGETABLES', 
      fruits: '🍎 FRUITS',
      grains: '🌾 GRAINS & CARBS',
      dairy: '🥛 DAIRY',
      pantry: '🧂 PANTRY ITEMS'
    };

    Object.entries(categories).forEach(([key, title]) => {
      if (this.groceryItems[key] && this.groceryItems[key].length > 0) {
        listContent += `${title}\n`;
        listContent += '='.repeat(title.length) + '\n';
        
        this.groceryItems[key].forEach(item => {
          const status = item.checked ? '✓' : '☐';
          listContent += `${status} ${item.name} (${item.quantity})\n`;
        });
        listContent += '\n';
      }
    });

    // Calculate totals
    let totalItems = 0;
    let checkedItems = 0;
    let estimatedCost = 0;

    Object.values(this.groceryItems).forEach(categoryItems => {
      if (Array.isArray(categoryItems)) {
        categoryItems.forEach(item => {
          totalItems++;
          if (item.checked) checkedItems++;
          estimatedCost += item.estimatedCost || 0;
        });
      }
    });

    listContent += `SUMMARY\n`;
    listContent += `=======\n`;
    listContent += `Total Items: ${totalItems}\n`;
    listContent += `Checked Off: ${checkedItems}\n`;
    listContent += `Estimated Cost: $${estimatedCost.toFixed(2)}\n`;

    // Download as text file
    const blob = new Blob([listContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'grocery-list.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    this.showNotification('Grocery list downloaded!');
  }

  loadGroceryList() {
    return JSON.parse(localStorage.getItem('groceryList') || '{}');
  }

  saveGroceryList() {
    localStorage.setItem('groceryList', JSON.stringify(this.groceryItems));
  }

  showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    const bgColor = type === 'warning' ? '#ffc107' : '#28a745';
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${bgColor};
      color: white;
      padding: 15px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
      z-index: 1000;
      animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }
}

// Initialize grocery list when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new GroceryList();
});