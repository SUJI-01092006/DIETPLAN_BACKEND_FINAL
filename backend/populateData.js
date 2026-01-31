const mongoose = require('mongoose');
require('./db');

const Recipe = require('./models/Recipe');
const Plan = require('./models/Plan');
const Progress = require('./models/Progress');
const History = require('./models/History');

async function populateDatabase() {
  try {
    console.log('Populating database with meal planner data...');

    // Clear existing sample data
    await Recipe.deleteMany({});
    await Plan.deleteMany({});
    await Progress.deleteMany({});
    await History.deleteMany({});

    const sampleUserId = new mongoose.Types.ObjectId();

    // Add real recipes from the meal planner
    const recipes = [
      {
        userId: sampleUserId,
        name: "Greek Yogurt Parfait",
        category: "breakfast",
        tags: ["vegetarian", "high-protein"],
        calories: 280,
        protein: 15,
        carbs: 35,
        fat: 6,
        fiber: 4,
        time: "5 min",
        description: "Creamy Greek yogurt layered with fresh berries and granola",
        ingredients: ["1 cup Greek yogurt", "1/2 cup mixed berries", "1/4 cup granola", "1 tbsp honey"],
        instructions: ["Layer yogurt in glass", "Add berries", "Top with granola", "Drizzle with honey"]
      },
      {
        userId: sampleUserId,
        name: "Avocado Toast",
        category: "breakfast",
        tags: ["vegetarian", "healthy"],
        calories: 320,
        protein: 8,
        carbs: 30,
        fat: 18,
        fiber: 12,
        time: "10 min",
        description: "Whole grain toast topped with mashed avocado and seasonings",
        ingredients: ["2 slices whole grain bread", "1 ripe avocado", "Salt and pepper", "Lemon juice", "Red pepper flakes"],
        instructions: ["Toast bread", "Mash avocado with lemon", "Season with salt and pepper", "Spread on toast", "Sprinkle red pepper flakes"]
      },
      {
        userId: sampleUserId,
        name: "Quinoa Buddha Bowl",
        category: "lunch",
        tags: ["vegetarian", "high-protein", "gluten-free"],
        calories: 450,
        protein: 16,
        carbs: 55,
        fat: 12,
        fiber: 8,
        time: "25 min",
        description: "Nutritious bowl with quinoa, roasted vegetables, and tahini dressing",
        ingredients: ["1 cup cooked quinoa", "Mixed vegetables", "Chickpeas", "Tahini", "Lemon juice", "Spinach"],
        instructions: ["Cook quinoa", "Roast vegetables", "Make tahini dressing", "Assemble bowl", "Drizzle with dressing"]
      },
      {
        userId: sampleUserId,
        name: "Grilled Chicken Salad",
        category: "lunch",
        tags: ["high-protein", "low-carb"],
        calories: 380,
        protein: 35,
        carbs: 20,
        fat: 25,
        fiber: 6,
        time: "20 min",
        description: "Fresh mixed greens with grilled chicken and balsamic vinaigrette",
        ingredients: ["Chicken breast", "Mixed greens", "Cherry tomatoes", "Cucumber", "Balsamic vinegar", "Olive oil"],
        instructions: ["Season and grill chicken", "Prepare salad greens", "Make vinaigrette", "Slice chicken", "Toss and serve"]
      },
      {
        userId: sampleUserId,
        name: "Salmon with Asparagus",
        category: "dinner",
        tags: ["high-protein", "low-carb", "omega-3"],
        calories: 420,
        protein: 40,
        carbs: 15,
        fat: 30,
        fiber: 5,
        time: "30 min",
        description: "Pan-seared salmon with roasted asparagus and lemon",
        ingredients: ["Salmon fillet", "Asparagus", "Lemon", "Olive oil", "Garlic", "Herbs"],
        instructions: ["Season salmon", "Prepare asparagus", "Heat pan", "Cook salmon", "Roast asparagus", "Serve with lemon"]
      },
      {
        userId: sampleUserId,
        name: "Mixed Nuts",
        category: "snack",
        tags: ["vegetarian", "high-protein", "keto"],
        calories: 180,
        protein: 6,
        carbs: 8,
        fat: 16,
        fiber: 3,
        time: "0 min",
        description: "A handful of mixed nuts for a healthy snack",
        ingredients: ["Almonds", "Walnuts", "Cashews", "Pecans"],
        instructions: ["Mix nuts in bowl", "Portion into serving size"]
      }
    ];

    await Recipe.insertMany(recipes);
    console.log('✓ Recipes added to database');

    // Add sample meal plans
    const plans = [
      {
        userId: sampleUserId,
        planName: "Weight Loss Plan - 1600 cal",
        calories: 1600,
        protein: 120,
        carbs: 120,
        fat: 60,
        fiber: 25,
        sugar: 40,
        duration: 7,
        mealsPerDay: 4,
        dietType: "low-carb",
        activityLevel: "moderate",
        currentWeight: 75,
        targetWeight: 70,
        height: 170,
        age: 30,
        gender: "female",
        weightLossRate: 0.5
      },
      {
        userId: sampleUserId,
        planName: "Muscle Building Plan - 2800 cal",
        calories: 2800,
        protein: 200,
        carbs: 300,
        fat: 100,
        fiber: 35,
        sugar: 70,
        duration: 14,
        mealsPerDay: 5,
        dietType: "high-protein",
        activityLevel: "active",
        currentWeight: 80,
        targetWeight: 85,
        height: 180,
        age: 25,
        gender: "male",
        weightLossRate: -0.5
      }
    ];

    await Plan.insertMany(plans);
    console.log('✓ Plans added to database');

    // Add sample progress data
    const progressData = {
      userId: sampleUserId,
      weightEntries: [
        { weight: 75.5, date: new Date('2024-01-01') },
        { weight: 75.2, date: new Date('2024-01-08') },
        { weight: 74.8, date: new Date('2024-01-15') },
        { weight: 74.5, date: new Date('2024-01-22') },
        { weight: 74.1, date: new Date('2024-01-29') }
      ],
      measurements: {
        waist: 82,
        chest: 95,
        hips: 98,
        arms: 32,
        date: new Date()
      },
      goals: {
        targetWeight: 70,
        targetDate: new Date('2024-06-01'),
        weeklyGoal: 0.5
      }
    };

    await new Progress(progressData).save();
    console.log('✓ Progress data added to database');

    // Add sample history
    const historyItems = [
      {
        userId: sampleUserId,
        type: 'plan',
        name: 'Weight Loss Plan Created',
        data: { calories: 1600, protein: 120, carbs: 120, fat: 60 }
      },
      {
        userId: sampleUserId,
        type: 'recipes',
        name: 'Greek Yogurt Parfait',
        data: { calories: 280, protein: 15, category: 'breakfast' }
      },
      {
        userId: sampleUserId,
        type: 'meals',
        name: 'Weekly Meal Plan - Jan 2024',
        data: { totalCalories: 11200, days: 7 }
      }
    ];

    await History.insertMany(historyItems);
    console.log('✓ History data added to database');

    console.log('\n🎉 Database populated successfully with real meal planner data!');
    console.log('📊 Collections now contain:');
    console.log(`   - ${recipes.length} recipes`);
    console.log(`   - ${plans.length} meal plans`);
    console.log(`   - 1 progress record with 5 weight entries`);
    console.log(`   - ${historyItems.length} history items`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error populating database:', error);
    process.exit(1);
  }
}

populateDatabase();