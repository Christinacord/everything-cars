import React, {useEffect, useState } from 'react';

function AppointmentsList() {
    
    const [appointments, setAppointments] = useState([])

    const fetchData = async () => {
        const url = 'http://localhost:8080/api/appointments/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setAppointments(data.appointments);
        }
    }

    useEffect(() => {
        fetchData();
      }, []);
    
    return (
        <>
            <h1>Service appointments</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>VIN</th>
                        <th>Customer Name</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Tech</th>
                        <th>Reason</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map(appointment => {
                    return (
                        <tr key={appointment.href}>
                            <td>{ appointment.automobile.vin }</td>
                            <td>{ appointment.customer_name }</td>
                            <td>{ appointment.date }</td>
                            <td>{ appointment.time }</td>
                            <td>{ appointment.tech_name.tech_name }</td>
                            <td>{ appointment.reason }</td>
                            <td><button>Placeholder</button></td>
                        </tr>
                    );
                    })}
                </tbody>
            </table>
        </>
        
    );
}

export default AppointmentsList;
