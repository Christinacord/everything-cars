import { useEffect, useState } from "react"

export default function SalesList() {
    const [sales, setSales] = useState([])
    const [filterValue, setFilterValue] = useState("")
    const [employees, setEmployees] = useState([])

    const getSalesData = async () => {
        const response = await fetch("http://localhost:8090/api/sales/")

        if (response.ok) {
            const data = await response.json()
            setSales(data.sales)
        }
    }
    const getEmployeesData = async () => {
        const response = await fetch("http://localhost:8090/api/employees/")

        if (response.ok) {
            const data = await response.json()
            setEmployees(data.employees)
        }
    }

    useEffect(() => {
        getSalesData()
        getEmployeesData()
    }, [])

    const handleDeleteSale = async (id) => {
        const url = `http://localhost:8090/api/sales/${id}/`
        const fetchConfig = {
            method: 'delete',
        }
        const response = await fetch(url, fetchConfig)
        if (response.ok) {
            getSalesData()
        }
    }

    const handleChange = (e) => {
        setFilterValue(e.target.value)
    }

    const filteredSales = () => {
        if (filterValue === " " || filterValue === "Select a Sales Person") {
            return sales
        } else {
            return sales.filter((sale) =>
                sale.employee.name.includes(filterValue)
            )
        }
    }

    return (
        <>
            <h1>Sales</h1>
            <form>
                <select onChange={handleChange} placeholder="Filter for Sale Person" className="form-select" >
                    <option>Select a Sales Person</option>
                    {employees.map(employee => {
                        return (
                            <option key={employee.pk} value={employee.name}>{employee.name}</option>
                        )
                    })}
                </select>
            </form>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th></th>
                        <th>Sales Person</th>
                        <th>Customer</th>
                        <th>VIN</th>
                        <th>Sales Price</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredSales().map(sale => {
                        return (
                            <tr key={sale.id}>
                                <td>
                                    <button onClick={() => handleDeleteSale(sale.id)}>Delete</button>
                                </td>
                                <td>{sale.employee.name}</td>
                                <td>{sale.customer.name}</td>
                                <td>{sale.automobile}</td>
                                <td>{sale.price}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )

}
