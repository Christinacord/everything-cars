import React, { useEffect, useState } from 'react';

function VehicleModels() {

    const [models, setModels] = useState([])

    const fetchData = async () => {
        const url = 'http://localhost:8100/api/models/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setModels(data.models);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <h1>Vehicle models</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Picture</th>
                    </tr>
                </thead>
                <tbody>
                    {models.map(model => {
                        return (
                            <tr key={model.href}>
                                <td>{model.name}</td>
                                <td><img src={model.picture_url} alt="Car" className="img-thumbnail" width="200" height="220" /></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    );
}

export default VehicleModels;
