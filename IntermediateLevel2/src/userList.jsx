import { useState, useEffect } from 'react';

function UserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users');

                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }

                const data = await response.json();
                setUsers(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchUsers();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            {users.map((user) => (
                <div
                    key={user.id}
                    style={{
                        border: '1px solid #ccc',
                        padding: '16px',
                        width: '250px',
                        borderRadius: '8px',
                    }}
                >
                    <h3>{user.name}</h3>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>City:</strong> {user.address.city}</p>
                </div>
            ))}
        </div>
    );
}

export default UserList;
