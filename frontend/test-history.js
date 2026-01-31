// History Fix Script - Add this to any page to test history functionality

async function testHistoryFunctionality() {
    console.log('Testing history functionality...');
    
    // Check if user is logged in
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData || !userData._id) {
        console.error('User not logged in or missing ID');
        return;
    }
    
    console.log('User ID:', userData._id);
    
    // Test adding to history
    try {
        const testItem = {
            type: 'recipes',
            name: 'Test Recipe - ' + new Date().toLocaleTimeString(),
            data: { calories: 300, protein: 20, carbs: 30, fat: 10 }
        };
        
        console.log('Adding test item to history:', testItem);
        
        const response = await fetch(`http://localhost:5000/api/history/${userData._id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(testItem)
        });
        
        if (response.ok) {
            const result = await response.json();
            console.log('Successfully added to history:', result);
        } else {
            const error = await response.text();
            console.error('Failed to add to history:', error);
        }
        
        // Test loading history
        const historyResponse = await fetch(`http://localhost:5000/api/history/${userData._id}`);
        if (historyResponse.ok) {
            const history = await historyResponse.json();
            console.log('Current history:', history);
        } else {
            console.error('Failed to load history');
        }
        
    } catch (error) {
        console.error('Network error:', error);
    }
}

// Run test
testHistoryFunctionality();