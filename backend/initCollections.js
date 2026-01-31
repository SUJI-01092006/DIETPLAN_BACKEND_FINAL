const mongoose = require('mongoose');
require('./db');

const Recipe = require('./models/Recipe');
const Plan = require('./models/Plan');
const Progress = require('./models/Progress');
const History = require('./models/History');

async function initializeCollections() {
  try {
    console.log('Initializing collections...');

    // Create sample recipe
    const sampleRecipe = new Recipe({
      userId: new mongoose.Types.ObjectId(),
      name: 'Sample Recipe',
      category: 'breakfast',
      tags: ['healthy'],
      calories: 300,
      protein: 15,
      carbs: 30,
      fat: 10,
      fiber: 5,
      time: '10 min',
      description: 'Sample recipe for initialization',
      ingredients: ['Sample ingredient'],
      instructions: ['Sample instruction']
    });
    await sampleRecipe.save();
    console.log('✓ Recipes collection created');

    // Create sample plan
    const samplePlan = new Plan({
      userId: new mongoose.Types.ObjectId(),
      planName: 'Sample Plan',
      calories: 2000,
      protein: 150,
      carbs: 200,
      fat: 80,
      fiber: 25,
      sugar: 50,
      duration: 7,
      mealsPerDay: 4,
      dietType: 'balanced',
      activityLevel: 'moderate'
    });
    await samplePlan.save();
    console.log('✓ Plans collection created');

    // Create sample progress
    const sampleProgress = new Progress({
      userId: new mongoose.Types.ObjectId(),
      weightEntries: [{
        weight: 70,
        date: new Date()
      }],
      measurements: {
        waist: 80,
        chest: 100,
        hips: 95,
        arms: 35
      },
      goals: {
        targetWeight: 65,
        targetDate: new Date(),
        weeklyGoal: 0.5
      }
    });
    await sampleProgress.save();
    console.log('✓ Progress collection created');

    // Create sample history
    const sampleHistory = new History({
      userId: new mongoose.Types.ObjectId(),
      type: 'plan',
      name: 'Sample History Item',
      data: { sample: 'data' }
    });
    await sampleHistory.save();
    console.log('✓ History collection created');

    console.log('All collections initialized successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error initializing collections:', error);
    process.exit(1);
  }
}

initializeCollections();