import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authApi, todosApi } from './api';
import './TodoApp.css';

/**
 * TodoManager Component
 * Handles the actual fetching and displaying of todos when mounted.
 */
const TodoManager = ({ token, onLogout }) => {
    const queryClient = useQueryClient();

    // Internal state for form
    const [newTodoTitle, setNewTodoTitle] = useState('');
    const [newTodoDesc, setNewTodoDesc] = useState('');

    // 1. QUERIES (Fetching Data)
    // staleTime: 20000ms (20s). Data remains "Fresh" for 20s.
    // If you unmount and remount this component within 20s, it won't fetch.
    const {
        data: todos = [],
        isLoading,
        isError,
        error,
        isFetching
    } = useQuery({
        queryKey: ['todos', token],
        queryFn: () => todosApi.fetchAll(token),
        enabled: !!token,
        retry: 2,
        staleTime: 20000,
    });

    const addTodoMutation = useMutation({
        mutationFn: (newTodo) => todosApi.create({ token, todo: newTodo }),
        onSuccess: () => {
            queryClient.invalidateQueries(['todos']);
            setNewTodoTitle('');
            setNewTodoDesc('');
        },
    });

    const updateTodoMutation = useMutation({
        mutationFn: (updatedTodo) => todosApi.update({ token, todo: updatedTodo }),
        onSuccess: () => queryClient.invalidateQueries(['todos']),
    });

    const deleteTodoMutation = useMutation({
        mutationFn: (id) => todosApi.delete({ token, id }),
        onSuccess: () => queryClient.invalidateQueries(['todos']),
    });

    const handleAddTodo = (e) => {
        e.preventDefault();
        addTodoMutation.mutate({
            title: newTodoTitle,
            description: newTodoDesc,
            completed: false
        });
    };

    return (
        <>
            <div className="todo-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h2>My Tasks</h2>
                    {isFetching ? <span style={{ color: 'orange', fontSize: '0.8rem' }}>Fetching from Backend (10s delay)...</span> : <span style={{ color: 'green', fontSize: '0.8rem' }}>Data from Cache</span>}
                </div>
                <button onClick={onLogout} className="btn-secondary">Logout</button>
            </div>

            <form className="auth-form" onSubmit={handleAddTodo} style={{ maxWidth: '100%', flexDirection: 'row', alignItems: 'center' }}>
                <div style={{ flex: 1, display: 'flex', gap: '10px' }}>
                    <input
                        type="text"
                        placeholder="What needs to be done?"
                        value={newTodoTitle}
                        onChange={(e) => setNewTodoTitle(e.target.value)}
                        required
                        style={{ flex: 2, padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
                    />
                    <input
                        type="text"
                        placeholder="Description (optional)"
                        value={newTodoDesc}
                        onChange={(e) => setNewTodoDesc(e.target.value)}
                        style={{ flex: 3, padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
                    />
                </div>
                <button type="submit" className="btn-primary" disabled={addTodoMutation.isPending} style={{ whiteSpace: 'nowrap' }}>
                    {addTodoMutation.isPending ? 'Adding...' : 'Add Task'}
                </button>
            </form>

            <div className="todo-list">
                {isLoading && <p style={{ textAlign: 'center' }}>Loading tasks...</p>}
                {isError && <p style={{ textAlign: 'center', color: 'red' }}>Error: {error.message}</p>}

                {todos.map(todo => (
                    <div key={todo.id} className={`todo-item ${todo.completed ? 'completed-task' : ''}`}>
                        <div className="todo-content" onClick={() => updateTodoMutation.mutate({ ...todo, completed: !todo.completed })} style={{ cursor: 'pointer', flex: 1 }}>
                            <h3>
                                {todo.title}
                                {todo.completed && <span className="status-badge done">Done</span>}
                            </h3>
                            {todo.description && <p>{todo.description}</p>}
                        </div>
                        <div className="todo-actions">
                            <button
                                onClick={() => updateTodoMutation.mutate({ ...todo, completed: !todo.completed })}
                                className="btn-edit"
                                disabled={updateTodoMutation.isPending}
                            >
                                {todo.completed ? 'Undo' : 'Complete'}
                            </button>
                            <button
                                onClick={() => deleteTodoMutation.mutate(todo.id)}
                                className="btn-delete"
                                disabled={deleteTodoMutation.isPending}
                            >
                                {deleteTodoMutation.isPending && deleteTodoMutation.variables === todo.id ? 'Deleting...' : 'Delete'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

const TodoApp = () => {
    const [token, setToken] = useState(localStorage.getItem('todo_token'));
    const [view, setView] = useState(token ? 'app' : 'login');
    const [mountApp, setMountApp] = useState(true);

    // Query client for manual cleanup if needed
    const queryClient = useQueryClient();

    // Local Form State
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [authError, setAuthError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setAuthError('');
        try {
            const data = await authApi.login({ username, password });
            localStorage.setItem('todo_token', data.access_token);
            setToken(data.access_token);
            setView('app');
            setUsername('');
            setPassword('');
        } catch (err) {
            setAuthError('Invalid credentials');
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setAuthError('');
        try {
            await authApi.register({ username, password });
            await handleLogin(e);
        } catch (err) {
            setAuthError(err.message);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('todo_token');
        setToken(null);
        queryClient.removeQueries(['todos']);
        setView('login');
    };

    if (!token) {
        return (
            <div className="todo-container">
                <div className="todo-header">
                    <h2>{view === 'login' ? 'Login' : 'Register'}</h2>
                </div>
                {authError && <p style={{ color: 'red', textAlign: 'center' }}>{authError}</p>}
                <form className="auth-form" onSubmit={view === 'login' ? handleLogin : handleRegister}>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn-primary">
                        {view === 'login' ? 'Sign In' : 'Sign Up'}
                    </button>
                </form>
                <p className="auth-switch" onClick={() => setView(view === 'login' ? 'register' : 'login')}>
                    {view === 'login' ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
                </p>
            </div>
        );
    }

    return (
        <div className="todo-container">
            <div style={{ marginBottom: '20px', padding: '15px', background: '#eef', borderRadius: '8px', border: '1px dashed #667eea' }}>
                <h4 style={{ marginTop: 0 }}>TanStack Caching Demo (StaleTime: 20s)</h4>
                <p style={{ fontSize: '0.9rem', marginBottom: '10px' }}>
                    1. <b>Initial Load:</b> Takes 10s (Backend Delay).<br />
                    2. <b>Unmount & Remount (within 20s):</b> Instant Load (Cache).<br />
                    3. <b>Unmount & Remount (after 20s):</b> Takes 10s (Refetch).
                </p>
                <button
                    onClick={() => setMountApp(!mountApp)}
                    className="btn-secondary"
                    style={{ width: '100%', fontWeight: 'bold' }}
                >
                    {mountApp ? "Unmount Todo List" : "Remount Todo List (Trigger Fetch Check)"}
                </button>
            </div>

            {mountApp && <TodoManager token={token} onLogout={handleLogout} />}
        </div>
    );
};

export default TodoApp;
