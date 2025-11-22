const API_URL = 'http://localhost:5000/api';

// Test user data
const testUser = {
    username: 'testuser_' + Date.now(),
    email: `test_${Date.now()}@example.com`,
    password: 'password123'
};

async function testProgress() {
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

        // 2. Update Progress
        console.log('\n2. Updating user progress (Day 1)...');
        const progressRes = await fetch(`${API_URL}/user/progress`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                dayCompleted: 1
            })
        });

        const progressData = await progressRes.json();

        if (!progressRes.ok) {
            console.error('Progress Update Failed:', progressData);
        } else {
            console.log('Progress Update Successful:', progressData);
        }

    } catch (error) {
        console.error('Test Failed:', error.message);
    }
}

testProgress();
