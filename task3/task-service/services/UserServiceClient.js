const axios = require('axios');

class UserServiceClient {
    static async getUserById(userId) {
        try {
            const response = await axios.get(`http://localhost:3001/api/users/${userId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching user data:', error);
            return null;
        }
    }
}

module.exports = UserServiceClient;
