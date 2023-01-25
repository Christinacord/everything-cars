import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AutomobileForm() {
    const [models, SetModels] = useState([])
    const [formData, setFormData] = useState({
        color: "",
        year: "",
        vin: "",
        model_id: "",
    })
    const navigate = useNavigate()

    const getModelsData = async () => {
        const url = 'http://localhost:8100/api/models/'
        const response = await fetch(url)

        if (response.ok) {
            const data = await response.json()
            SetModels(data.models)
        }
    }

    useEffect(() => {
        getModelsData()
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault()

        const automobileUrl = 'http://localhost:8100/api/automobiles/'
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const response = await fetch(automobileUrl, fetchConfig)
        if (response.ok) {
            setFormData({
                color: "",
                year: "",
                vin: "",
                model_id: "",
            })
        }
    }

    const handleClick = () => {
        alert("Success!")
        navigate("/automobiles")
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
                    <h1>Create an Automobile</h1>
                    <form onSubmit={handleSubmit} id="create-automobile-form">
                        <div className="form-floating mb-3">
                            <input onChange={handleChangeName} value={formData.color} placeholder="Color" required type="text" name="color" id="color" className="form-control" />
                            <label htmlFor="color">Color</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleChangeName} value={formData.year} placeholder="Year" required type="number" name="year" id="year" className="form-control" />
                            <label htmlFor="year">Year</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleChangeName} value={formData.vin} placeholder="VIN" required type="text" name="vin" id="vin" className="form-control" />
                            <label htmlFor="vin">VIN</label>
                        </div>
                        <div className="mb-3">
                            <select onChange={handleChangeName} value={formData.model_id} name="model_id" id="model_id" className="form-select">
                                <option value="">Choose a Model</option>
                                {models.map(model => {
                                    return (
                                        <option key={model.id} value={model.id}>{model.name}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
