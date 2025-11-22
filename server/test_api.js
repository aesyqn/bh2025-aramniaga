const API_URL = 'http://localhost:5000/api';

// Test user data
const testUser = {
    username: 'testuser_' + Date.now(),
    email: `test_${Date.now()}@example.com`,
    password: 'password123'
};

async function testAuth() {
    try {
        console.log('1. Registering new user...');
        const registerRes = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(testUser)
        });

        const registerData = await registerRes.json();

        if (!registerRes.ok) {
            throw new Error(`Registration failed: ${JSON.stringify(registerData)}`);
        }

        console.log('Registration successful!');
        console.log('User ID:', registerData._id);

        const token = registerData.token;
        console.log('\nToken received:', token ? 'Yes (Hidden)' : 'No');

        if (!token) {
            console.error('Error: No token received during registration');
            return;
        }

        console.log('\n2. Accessing protected route (/api/user/me)...');
        const profileRes = await fetch(`${API_URL}/user/me`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const profileData = await profileRes.json();

        if (!profileRes.ok) {
            throw new Error(`Profile access failed: ${JSON.stringify(profileData)}`);
        }

        console.log('Profile access successful!');
        console.log('User Profile:', {
            username: profileData.username,
            email: profileData.email,
            stats: profileData.stats
        });

        console.log('\nSUCCESS: Authentication flow is working correctly!');

    } catch (error) {
        console.error('\nFAILED:', error.message);
    }
}

testAuth();
