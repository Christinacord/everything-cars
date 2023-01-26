import React, { useEffect, useState } from 'react'

export default function VehicleModelForm() {
    const [manufacturers, SetManufacturers] = useState([])
    const [formData, setFormData] = useState({
        name: "",
        picture_url: "",
        manufacturer_id: "",
    })

    const getManufacturerData = async () => {
        const url = "http://localhost:8100/api/manufacturers/"
        const response = await fetch(url)

        if (response.ok) {
            const data = await response.json()
            SetManufacturers(data.manufacturers)
        }
    }

    useEffect(() => {
        getManufacturerData()
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault()

        const modelUrl = 'http://localhost:8100/api/models/'
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const response = await fetch(modelUrl, fetchConfig)
        if (response.ok) {
            setFormData({
                name: "",
                picture_url: "",
                manufacturer_id: "",
            })
        }
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
                    <h1>Create a Vehicle Model</h1>
                    <form onSubmit={handleSubmit} id="create-vehicle-model-form">
                        <div className="form-floating mb-3">
                            <input onChange={handleChangeName} value={formData.name} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
                            <label htmlFor="name">Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleChangeName} value={formData.picture_url} placeholder="Picture Url" required type="url" name="picture_url" id="picture_url" className="form-control" />
                            <label htmlFor="picture_url">Picture Url</label>
                        </div>
                        <div className="mb-3">
                            <select onChange={handleChangeName} value={formData.manufacturer_id} name="manufacturer_id" id="manufacturer_id" className="form-select">
                                <option value="">Choose a Manufacturer</option>
                                {manufacturers.map(manufacturer => {
                                    return (
                                        <option key={manufacturer.id} value={manufacturer.id}>{manufacturer.name}</option>
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
