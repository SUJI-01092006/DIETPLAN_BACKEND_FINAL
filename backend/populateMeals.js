const mongoose = require('mongoose');
require('./db');

// Assuming the existing Meal model structure
const Meal = require('./models/Meal');

async function populateMeals() {
  try {
    console.log('Adding data to meals collection...');

    const sampleUserId = new mongoose.Types.ObjectId();

    // Meal database from the meal planner
    const meals = [
      {
        userId: sampleUserId,
        name: "Oatmeal with Berries",
        category: "breakfast",
        calories: 320,
        protein: 12,
        carbs: 45,
        fat: 8,
        fiber: 6,
        description: "Hearty oatmeal topped with fresh mixed berries",
        ingredients: ["Rolled oats", "Mixed berries", "Milk", "Honey"],
        prepTime: "10 min"
      },
      {
        userId: sampleUserId,
        name: "Avocado Toast",
        category: "breakfast",
        calories: 280,
        protein: 8,
        carbs: 30,
        fat: 18,
        fiber: 12,
        description: "Whole grain toast with mashed avocado",
        ingredients: ["Whole grain bread", "Avocado", "Salt", "Pepper", "Lemon"],
        prepTime: "5 min"
      },
      {
        userId: sampleUserId,
        name: "Scrambled Eggs",
        category: "breakfast",
        calories: 300,
        protein: 18,
        carbs: 5,
        fat: 24,
        fiber: 0,
        description: "Fluffy scrambled eggs with herbs",
        ingredients: ["Eggs", "Butter", "Salt", "Pepper", "Chives"],
        prepTime: "8 min"
      },
      {
        userId: sampleUserId,
        name: "Greek Yogurt Parfait",
        category: "breakfast",
        calories: 250,
        protein: 15,
        carbs: 35,
        fat: 6,
        fiber: 4,
        description: "Layered yogurt with granola and berries",
        ingredients: ["Greek yogurt", "Granola", "Berries", "Honey"],
        prepTime: "5 min"
      },
      {
        userId: sampleUserId,
        name: "Grilled Chicken Salad",
        category: "lunch",
        calories: 450,
        protein: 35,
        carbs: 20,
        fat: 25,
        fiber: 8,
        description: "Fresh salad with grilled chicken breast",
        ingredients: ["Chicken breast", "Mixed greens", "Tomatoes", "Cucumber", "Olive oil"],
        prepTime: "20 min"
      },
      {
        userId: sampleUserId,
        name: "Quinoa Bowl",
        category: "lunch",
        calories: 380,
        protein: 16,
        carbs: 55,
        fat: 12,
        fiber: 8,
        description: "Nutritious quinoa bowl with vegetables",
        ingredients: ["Quinoa", "Black beans", "Bell peppers", "Corn", "Lime"],
        prepTime: "25 min"
      },
      {
        userId: sampleUserId,
        name: "Turkey Sandwich",
        category: "lunch",
        calories: 420,
        protein: 28,
        carbs: 45,
        fat: 15,
        fiber: 6,
        description: "Lean turkey sandwich with vegetables",
        ingredients: ["Turkey slices", "Whole grain bread", "Lettuce", "Tomato", "Mayo"],
        prepTime: "10 min"
      },
      {
        userId: sampleUserId,
        name: "Buddha Bowl",
        category: "lunch",
        calories: 400,
        protein: 18,
        carbs: 50,
        fat: 16,
        fiber: 10,
        description: "Colorful bowl with mixed vegetables and grains",
        ingredients: ["Brown rice", "Chickpeas", "Avocado", "Carrots", "Tahini"],
        prepTime: "30 min"
      },
      {
        userId: sampleUserId,
        name: "Baked Salmon",
        category: "dinner",
        calories: 520,
        protein: 40,
        carbs: 15,
        fat: 30,
        fiber: 4,
        description: "Herb-crusted baked salmon with vegetables",
        ingredients: ["Salmon fillet", "Asparagus", "Lemon", "Herbs", "Olive oil"],
        prepTime: "25 min"
      },
      {
        userId: sampleUserId,
        name: "Beef Stir Fry",
        category: "dinner",
        calories: 480,
        protein: 32,
        carbs: 25,
        fat: 28,
        fiber: 5,
        description: "Quick beef stir fry with mixed vegetables",
        ingredients: ["Beef strips", "Broccoli", "Bell peppers", "Soy sauce", "Ginger"],
        prepTime: "15 min"
      },
      {
        userId: sampleUserId,
        name: "Pasta Primavera",
        category: "dinner",
        calories: 450,
        protein: 18,
        carbs: 65,
        fat: 16,
        fiber: 8,
        description: "Pasta with fresh seasonal vegetables",
        ingredients: ["Pasta", "Zucchini", "Bell peppers", "Tomatoes", "Parmesan"],
        prepTime: "20 min"
      },
      {
        userId: sampleUserId,
        name: "Grilled Chicken Breast",
        category: "dinner",
        calories: 400,
        protein: 45,
        carbs: 10,
        fat: 18,
        fiber: 2,
        description: "Seasoned grilled chicken with herbs",
        ingredients: ["Chicken breast", "Herbs", "Garlic", "Olive oil", "Lemon"],
        prepTime: "18 min"
      },
      {
        userId: sampleUserId,
        name: "Greek Yogurt",
        category: "snack",
        calories: 150,
        protein: 15,
        carbs: 12,
        fat: 6,
        fiber: 0,
        description: "Plain Greek yogurt with honey",
        ingredients: ["Greek yogurt", "Honey"],
        prepTime: "2 min"
      },
      {
        userId: sampleUserId,
        name: "Protein Smoothie",
        category: "snack",
        calories: 200,
        protein: 20,
        carbs: 15,
        fat: 8,
        fiber: 3,
        description: "Post-workout protein smoothie",
        ingredients: ["Protein powder", "Banana", "Milk", "Peanut butter"],
        prepTime: "5 min"
      },
      {
        userId: sampleUserId,
        name: "Mixed Nuts",
        category: "snack",
        calories: 180,
        protein: 6,
        carbs: 8,
        fat: 16,
        fiber: 3,
        description: "Healthy mix of assorted nuts",
        ingredients: ["Almonds", "Walnuts", "Cashews", "Pecans"],
        prepTime: "0 min"
      },
      {
        userId: sampleUserId,
        name: "Apple with Peanut Butter",
        category: "snack",
        calories: 190,
        protein: 8,
        carbs: 20,
        fat: 12,
        fiber: 5,
        description: "Sliced apple with natural peanut butter",
        ingredients: ["Apple", "Peanut butter"],
        prepTime: "3 min"
      }
    ];

    await Meal.insertMany(meals);
    console.log(`✓ Added ${meals.length} meals to database`);
    
    console.log('\n🍽️ Meals collection now contains:');
    console.log(`   - ${meals.filter(m => m.category === 'breakfast').length} breakfast items`);
    console.log(`   - ${meals.filter(m => m.category === 'lunch').length} lunch items`);
    console.log(`   - ${meals.filter(m => m.category === 'dinner').length} dinner items`);
    console.log(`   - ${meals.filter(m => m.category === 'snack').length} snack items`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error populating meals:', error);
    process.exit(1);
  }
}

populateMeals();