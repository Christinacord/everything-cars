import React, { useEffect, useState } from 'react';

function ServiceHistory() {
    
    const [appointments, setAppointments] = useState([]);
    const [filterValue, setFilterValue] = useState(" ");

    const appointmentsData = async () => {
        const url = 'http://localhost:8080/api/appointments/'
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setAppointments(data.appointments);
        }
    }

    const handleChange = (e) => {
        setFilterValue(e.target.value);
    };

    const filteredAppointments = () => {
        if (filterValue === " ") {
            return appointments;
        } else {
            return appointments.filter((appointment) => 
                appointment.vin.toLowerCase().includes(filterValue)
            );
        }
    };
    
    useEffect(() => {
        appointmentsData();
      }, []);

    return (
        <>
            <h1>Service history</h1>
            <input onChange={handleChange} placeholder="Filter For VIN" />
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>VIN</th>
                        <th>Customer Name</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Tech</th>
                        <th>Reason</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredAppointments().map(appointment => {
                    return (
                        <tr key={appointment.href}>
                            <td>{ appointment.vin }</td>
                            <td>{ appointment.customer_name }</td>
                            <td>{ appointment.date }</td>
                            <td>{ appointment.time }</td>
                            <td>{ appointment.tech_name.tech_name }</td>
                            <td>{ appointment.reason }</td>
                        </tr>
                    );
                    })}
                </tbody>
            </table>
        </>
    );
}

export default ServiceHistory;
