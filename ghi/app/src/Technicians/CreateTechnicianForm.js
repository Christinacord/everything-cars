import React, { useState } from 'react';

function CreateTechnicianForm() {

    const [formData, setFormData] = useState({
        tech_name: '',
        employee_number: '',
    })

    const handleSubmit = async (event) => {
        event.preventDefault();
        const technicianUrl = 'http://localhost:8080/api/technicians/'
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            }
        };

        const response = await fetch(technicianUrl, fetchConfig);
        if (response.ok) {
            setFormData({
                tech_name: '',
                employee_number: '',
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

    return (
        <>
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a new technician</h1>
                        <form onSubmit={handleSubmit} id="create-technician-form">
                            <div className="form-floating mb-3">
                                <input onChange={handleFormChange} value={formData.tech_name} placeholder="tech name" required type="text" name="tech_name" id="tech_name" className="form-control" />
                                <label htmlFor="tech_name">Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={handleFormChange} value={formData.employee_number} placeholder="employee number" required type="text" name="employee_number" id="employee_number" className="form-control" />
                                <label htmlFor="employee_number">Employee number</label>
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CreateTechnicianForm;
