import React, { useEffect, useState } from 'react'

export default function SalesPersonForm() {

    const [formData, setFormData] = useState({
        name: "",
        employee_id: "",
    })

    const handleSubmit = async (event) => {
        event.preventDefault()

        const employeeUrl = 'http://localhost:8090/api/employees/'
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const response = await fetch(employeeUrl, fetchConfig)
        if (response.ok) {
            setFormData({
                name: "",
                employee_id: "",
            })
        }
    }

    const handleClick = () => {
        alert("Success!")
    }

    const handleChangeName = (e) => {
        const value = e.target.value
        const inputName = e.target.name

        setFormData({
            ...formData,
            [inputName]: value
        })
    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a Sales Person</h1>
                    <form onSubmit={handleSubmit} id="create-employee-form">
                        <div className="form-floating mb-3">
                            <input onChange={handleChangeName} value={formData.name} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
                            <label htmlFor="name">Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleChangeName} value={formData.employee_id} placeholder="Employee ID" required type="number" name="employee_id" id="employee_id" className="form-control" />
                            <label htmlFor="employee_id">Employee ID</label>
                        </div>
                        <button onClick={handleClick} className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )

}
