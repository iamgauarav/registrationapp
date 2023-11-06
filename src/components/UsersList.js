import React, { useEffect, useState } from 'react';

function UsersList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // Add error state

    useEffect(() => {
        fetch('http://localhost:3001/users')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setUsers(data.users); // Assuming the user data is returned as { users: [...] }
                setLoading(false);
            })
            .catch((error) => {
                setError(error); // Capture and set the error
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>; // Display the error
    }

    if (users.length === 0) {
        return <p>No users found.</p>;
    }

    return (
        <div>
            <h2>User List</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        <p>Username: {user.username}</p>
                        <p>Email: {user.email}</p>
                        <p>Mobile: {user.mobile}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UsersList;
