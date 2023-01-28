import { useEffect, useState } from "react";

export default function SalesList() {
    const [sales, setSales] = useState([]);
    const getData = async () => {
        const response = await fetch("http://localhost:8090/api/sales/");
        if (response.ok) {
            const data = await response.json();
            setSales(data.sales);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
        <h1>Sales List</h1>
        <table className="table table-hover">
            <thead>
                <tr>
                    <th>Sales Associate</th>
                    <th>Employee Number</th>
                    <th>Purchaser Name</th>
                    <th>VIN</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {sales.map((sale) => {
                    return (
                        <tr key={sale.id}>
                            <td>{sale.employee.name}</td>
                            <td>{sale.employee.employee_id}</td>
                            <td>{sale.customer.name}</td>
                            <td>{sale.automobile}</td>
                            <td>{sale.price}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
        </>
    );
}
