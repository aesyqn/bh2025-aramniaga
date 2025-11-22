const API_URL = 'http://localhost:5000/api';

// Test user data
const testUser = {
    username: 'testuser_' + Date.now(),
    email: `test_${Date.now()}@example.com`,
    password: 'password123'
};

async function testUpdate() {
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

        // 2. Update Profile
        console.log('\n2. Updating user profile...');
        const updateRes = await fetch(`${API_URL}/user/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                businessName: "My Coffee Shop",
                niche: "Cafe",
                description: "Artisan coffee in KL"
            })
        });

        const updateData = await updateRes.json();

        if (!updateRes.ok) {
            console.error('Update Failed:', updateData);
        } else {
            console.log('Update Successful:', updateData);
        }

    } catch (error) {
        console.error('Test Failed:', error.message);
    }
}

testUpdate();
