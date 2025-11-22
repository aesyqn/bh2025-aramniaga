const API_URL = 'http://localhost:5000/api';

// Test user data
const testUser = {
    username: 'aitest_' + Date.now(),
    email: `aitest_${Date.now()}@example.com`,
    password: 'password123'
};

async function testAI() {
    try {
        // 1. Register
        console.log('1. Registering new user...');
        const registerRes = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(testUser)
        });

        const registerData = await registerRes.json();
        if (!registerRes.ok) throw new Error(`Registration failed: ${JSON.stringify(registerData)}`);

        const token = registerData.token;
        console.log('Token received.');

        // 2. Test Chat
        console.log('\n2. Testing AI Chat...');
        const chatRes = await fetch(`${API_URL}/ai/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                message: "Macam mana mau mula bisnes kopi di KK?"
            })
        });

        const chatData = await chatRes.json();

        if (!chatRes.ok) {
            console.error('AI Chat Failed:', chatData);
        } else {
            console.log('AI Chat Successful!');
            console.log('Response:', chatData.response.substring(0, 100) + '...');
        }

    } catch (error) {
        console.error('Test Failed:', error.message);
    }
}

testAI();
