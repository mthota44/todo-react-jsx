const API_URL = 'http://localhost:8000';

const getHeaders = (token) => ({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
});

export const authApi = {
    login: async ({ username, password }) => {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);

        const response = await fetch(`${API_URL}/token`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) throw new Error('Login failed');
        return response.json();
    },

    register: async ({ username, password }) => {
        const response = await fetch(`${API_URL}/users/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            let errorMsg = 'Registration failed';
            try {
                const errData = await response.json();
                errorMsg = errData.detail || errorMsg;
            } catch (e) { /* ignore */ }
            throw new Error(errorMsg);
        }
        return response.json();
    }
};

export const todosApi = {
    fetchAll: async (token) => {
        const response = await fetch(`${API_URL}/todos/`, {
            headers: getHeaders(token)
        });

        if (!response.ok) {
            if (response.status === 401) throw new Error('Unauthorized');
            throw new Error('Failed to fetch todos');
        }
        return response.json();
    },

    create: async ({ token, todo }) => {
        const response = await fetch(`${API_URL}/todos/`, {
            method: 'POST',
            headers: getHeaders(token),
            body: JSON.stringify(todo)
        });
        if (!response.ok) throw new Error('Failed to create todo');
        return response.json();
    },

    update: async ({ token, todo }) => {
        const response = await fetch(`${API_URL}/todos/${todo.id}`, {
            method: 'PUT',
            headers: getHeaders(token),
            body: JSON.stringify(todo)
        });
        if (!response.ok) throw new Error('Failed to update todo');
        return response.json();
    },

    delete: async ({ token, id }) => {
        const response = await fetch(`${API_URL}/todos/${id}`, {
            method: 'DELETE',
            headers: getHeaders(token)
        });
        if (!response.ok) throw new Error('Failed to delete todo');
        return response.json();
    }
};
