import React, {useEffect, useState } from 'react';

function CreateAppointmentForm () {
    
    const [automobiles, setAutomobiles] = useState([]);
    const [technicians, setTechnicians] = useState([]);
    const [formData, setFormData] = useState({
        vin: '',
        customer_name: '',
        date: '',
        time: '',
        tech_name: '',
    })
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        const appointmentUrl = 'http://localhost:8080/api/appointments/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            }
        };

        const response = await fetch(appointmentUrl, fetchConfig);
        if (response.ok) {
            setFormData({
                vin: '',
                customer_name: '',
                date: '',
                time: '',
                tech_name: '',
            });
        }

    }
        

    const handleFormChange = (e) => {
        const value = e.target.value;
        const inputName = e.target.name;
        setFormData({
            ...formData,
            [inputName]: value
        });
    }

    const fetchData = async () => {
        const url1 = 'http://localhost:8100/api/automobiles/';
        const url2 = 'http://localhost:8080/api/technicians/';
        const response1 = await fetch(url1);
        const response2 = await fetch(url2);
        if (response1.ok && response2.ok) {
            const data1 = await response1.json();
            const data2 = await response2.json();
            setAutomobiles(data1.automobiles);
            setTechnicians(data2.technicians);
        }
    }
    
    useEffect(() => {
        fetchData();
        }, []);

    return (
        <>
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Schedule service appointment</h1>
                        <form onSubmit={handleSubmit} id="create-appointment-form">
                            <div className="form-floating mb-3">
                                <input onChange={handleFormChange} value={formData.vin} placeholder="VIN" required type="text" name="vin" id="vin" className="form-control" />
                                <label htmlFor="fabric">VIN</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={handleFormChange} value={formData.customer_name} placeholder="Customer Name" required type="text" name="customer_name" id="customer_name" className="form-control" />
                                <label htmlFor="style">Customer Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={handleFormChange} value={formData.date} placeholder="Color" required type="date" name="date" id="date" className="form-control" />
                                <label htmlFor="color">Date</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={handleFormChange} value={formData.time} placeholder="Time" required type="time" name="time" id="time" className="form-control" />
                                <label htmlFor="color">Time</label>
                            </div>
                            <div className="mb-3">
                                <select onChange={handleFormChange} value={formData.tech_name} required name="tech_name" id="tech_name" className="form-select">
                                    <option value="">Select a technician</option>
                                    {technicians.map(technician => {
                                        return (
                                            <option key={technician.employee_number} value={technician.employee_number}>{technician.tech_name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={handleFormChange} value={formData.reason} placeholder="Reason for appointment" required type="text" name="reason" id="reason" className="form-control" />
                                <label htmlFor="color">Reason</label>
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
        
    );
}

export default CreateAppointmentForm;
