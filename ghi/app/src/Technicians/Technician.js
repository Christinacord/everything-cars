import React, { useEffect, useState } from 'react';

function TechnicianList() {

    const [technicians, setTechnicians] = useState([])

    const fetchData = async () => {
        const url = 'http://localhost:8080/api/technicians/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setTechnicians(data.technicians);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <h1>List of Techs</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Technician name</th>
                        <th>Employee number</th>
                    </tr>
                </thead>
                <tbody>
                    {technicians.map(technician => {
                        return (
                            <tr key={technician.employee_number}>
                                <td>{technician.tech_name}</td>
                                <td>{technician.employee_number}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    );
}

export default TechnicianList;
