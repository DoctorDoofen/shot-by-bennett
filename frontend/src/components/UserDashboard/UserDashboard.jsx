import axios from 'axios';
import { useEffect, useState } from 'react';


function UserDashboard() {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axios.get('/api/appointments/my_appointments');
                setAppointments(response.data.appointments);
            } catch (err) {
                console.error('Failed to fetch appointments:', err);
            }
        };

        fetchAppointments();
    }, []);

    return (

        <div>
            <h1>User Dashboard</h1>
            <h2>Your Appointments</h2>
            <ul>
                {appointments.map(appointment => (
                    <li key={appointment.id}>
                        {appointment.date} - {appointment.time}
                    </li>
                ))}
            </ul>
        </div>
    );
}


export default UserDashboard;