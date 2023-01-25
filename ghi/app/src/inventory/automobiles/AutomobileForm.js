import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AutomobileForm() {
    const [models, SetModels] = useState([])

    const [formData, setFormData] = useState({
        color: "",
        year: "",
        vin: "",
        model: "",
    })

    // const getModelsData

}
