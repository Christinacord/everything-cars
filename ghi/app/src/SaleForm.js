import React, { useEffect, useState } from 'react'

export default function SaleForm() {
    const [automobiles, setAutomobiles] = useState([])
    const [customers, setCustomers] = useState([])
    const [employees, setEmployees] = useState([])
    const [formData, setFormData] = useState({
        automobile: "",
        employee: "",
        customer: "",
        price: "",
    })

    const getAutomobileData = async () => {
        const url = 'http://localhost:8100/api/automobiles/'
        const response = await fetch(url)

        if (response.ok) {
            const data = await response.json()
            setAutomobiles(data.autos)
            console.log(data)
            console.log(automobiles)
        }
    }
    const getCustomerData = async () => {
        const url = 'http://localhost:8090/api/customers/'
        const response = await fetch(url)

        if (response.ok) {
            const data = await response.json()
            setCustomers(data.customers)
        }
    }
    const getEmployeeData = async () => {
        const url = 'http://localhost:8090/api/employees/'
        const response = await fetch(url)

        if (response.ok) {
            const data = await response.json()
            setEmployees(data.employees)
        }
    }

    useEffect(() => {
        getAutomobileData();
        getCustomerData();
        getEmployeeData();
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault()

        const saleUrl = 'http://localhost:8090/api/sales/'
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const response = await fetch(saleUrl, fetchConfig)
        if (response.ok) {
            setFormData({
                automobile: "",
                employee: "",
                customer: "",
                price: "",
            })
        }
    }

    const handleChangeName = (e) => {
        const value = e.target.value;
        const inputName = e.target.name;

        //We can condense our form data event handling
        //into on function by using the input name to update it

        setFormData({
            ...formData,
            [inputName]: value
        });
    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a Sale</h1>
                    <form onSubmit={handleSubmit} id="create-sale-form">
                        <div className="mb-3">
                            <select onChange={handleChangeName} value={formData.automobile} name="automobile" id="automobile" className="form-select">
                                <option value="">Choose a Automobile</option>
                                {automobiles.map(automobile => {
                                    return (
                                        <option key={automobile.id} value={automobile.id}>{automobile.name}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="mb-3">
                            <select onChange={handleChangeName} value={formData.customer} name="customer" id="customer" className="form-select">
                                <option value="">Choose a Customer</option>
                                {customers.map(customer => {
                                    return (
                                        <option key={customer.id} value={customer.id}>{customer.name}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="mb-3">
                            <select onChange={handleChangeName} value={formData.employee} name="employee" id="employee" className="form-select">
                                <option value="">Choose an Employee</option>
                                {employees.map(employee => {
                                    return (
                                        <option key={employee.pk} value={employee.pk}>{employee.name}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleChangeName} value={formData.price} placeholder="Price" required type="number" name="price" id="price" className="form-control" />
                            <label htmlFor="price">Price</label>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )

}
