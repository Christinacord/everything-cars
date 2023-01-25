import { useEffect, useState } from "react"

export default function SalesList() {
    const [sales, setSales] = useState([])
    const [filterValue, setFilterValue] = useState("")
    const [filterKey, setFilterKey] = useState("employee")

    const getData = async () => {
        const response = await fetch("http://localhost:8090/api/sales/")

        if (response.ok) {
            const data = await response.json()
            setSales(data.sales)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const handleDeleteSale = async (id) => {
        const url = `http://localhost:8090/api/sales/${id}/`
        console.log(url)
        const fetchConfig = {
            method: 'delete',
        }
        const response = await fetch(url, fetchConfig)
        if (response.ok) {
            getData()
        }
    }

    const handleChange = (e) => {
        setFilterValue(e.target.value)
    }

    // const handleKeyChange = (e) => {
    //     setFilterKey(e.target.value)
    // }


    const filteredSales = () => {
        if (filterValue === " ") {
            return sales
        } else {
            return sales.filter((sale) =>
                sale.employee.name.toLowerCase().includes(filterValue)
            )
        }
    }

    return (
        <>
            <h1>Sales</h1>
            <input onChange={handleChange} placeholder="Filter for Sale Person" />
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
