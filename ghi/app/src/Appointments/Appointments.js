import React, { useEffect, useState } from 'react';


function AppointmentsList() {

    const [appointments, setAppointments] = useState([])
    const [automobiles, setAutomobiles] = useState([])

    const fetchData = async () => {
        const url = 'http://localhost:8080/api/appointments/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setAppointments(data.appointments);
        }
    }

    const fetchAutomobiles = async () => {
        const url = 'http://localhost:8100/api/automobiles/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            const vinlist = []
            data.autos.map((automobile) => vinlist.push(automobile.vin))
            setAutomobiles(vinlist);
        }
    }

    const handleAppointment = async (href) => {
        const url = `http://localhost:8080${href}`;
        const fetchConfig = {
            method: "delete"
        }
        const response = await fetch(url, fetchConfig)
        if (response.ok) {
            fetchData()
        }
    };

    useEffect(() => {
        fetchData();
        fetchAutomobiles();
    }, []);

    const isVip = (vin) => {
        if (automobiles.includes(vin)) {
            return "VIP"
        } else {
            return ""
        }
    }

    return (
        <>
            <h1>Service appointments</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>VIP</th>
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
                                <td>{isVip(appointment.vin)}</td>
                                <td>{appointment.vin}</td>
                                <td>{appointment.customer_name}</td>
                                <td>{appointment.date}</td>
                                <td>{appointment.time}</td>
                                <td>{appointment.tech_name.tech_name}</td>
                                <td>{appointment.reason}</td>
                                <td><button className="btn btn-danger" onClick={() => handleAppointment(appointment.href)}>Cancel</button><button className="btn btn-success" onClick={() => handleAppointment(appointment.href)}>Finished</button></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>

    );
}

export default AppointmentsList;
