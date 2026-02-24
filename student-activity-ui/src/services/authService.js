export const authService = {
    signup: (userData) => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        if (users.find(u => u.email === userData.email)) {
            throw new Error('User already exists');
        }
        const newUser = { ...userData, id: Date.now() };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        return newUser;
    },

    login: (credentials) => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email === credentials.email && u.password === credentials.password);
        if (!user) {
            throw new Error('Invalid email or password');
        }
        const { password: _password, ...userWithoutPassword } = user;
        localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
        return userWithoutPassword;
    },

    logout: () => {
        localStorage.removeItem('currentUser');
    },

    getCurrentUser: () => {
        return JSON.parse(localStorage.getItem('currentUser'));
    }
};
