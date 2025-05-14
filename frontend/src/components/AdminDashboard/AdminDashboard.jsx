import { useState, useEffect, React } from 'react';

function AdminDashboard() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('/api/users', {
                    method: 'GET',
                    credentials: 'include', // sends the session cookie with the request
                });
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);


    const handleDelete = async (userId) => {
        const confirmed = window.confirm("Are you sure you want to delete this user?");
        if (!confirmed) return;

        const response = await fetch(`/api/users/${userId}`, {
            method: 'DELETE',
            credentials: 'include',
        });

        const data = await response.json();
        if (response.ok) {
            setUsers(users.filter(user => user.id !== userId)); // update UI
            alert(data.message);
        } else {
            alert(data.error || "Failed to delete user.");
        }
    };


    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <h2>User List</h2>
            <ul>
                {users.map(user => (
                    <React.Fragment key={user.id}>
                        <li>{user.username}</li>
                        <button onClick={() => handleDelete(user.id)}>Delete</button>
                    </React.Fragment>
                ))}
            </ul>

        </div>
    );
}

export default AdminDashboard