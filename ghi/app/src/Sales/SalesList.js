import React from "react";

class SalesList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {sales: []}
        this.deletesale = this.deletesale.bind(this);
    }

    async componentDidMount() {
        const response = await fetch('http://localhost:8090/api/salesrecords/')
        if (response.ok) {
            const data = await response.json()
            this.setState({ sales: data.salesrecords})
        }
    }

    async deletesale(sales) {
        const deleteURL = `http://localhost:8090/api/salesrecords/${sales.id}`
        const fetchConfig = {
            method: "delete"
        }
        await fetch(deleteURL, fetchConfig)

        const id = this.state.sales.indexOf(sales)
        const updated_sales = [...this.state.sales]
        updated_sales.splice(id, 1)
        this.setState({ sales: updated_sales})
    }

    render() {
        return (
            <><table className="table table-striped mt-4">
                <thead>
                    <tr>
                        <th>Salesperson's Name</th>
                        <th>Employee Number</th>
                        <th>Customer</th>
                        <th>VIN</th>
                        <th>Sale Price</th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.sales.map(sale => {
                    return (
                        <tr key={sale.id}>
                            <td>{sale.salesperson.name}</td>
                            <td>{sale.salesperson.employee_number}</td>
                            <td>{sale.customer.name}</td>
                            <td>{sale.automobile.vin}</td>
                            <td>{sale.sale_price}</td>
                            <td><button className="btn btn-danger" onClick={() => this.deletesale(sale)}>Delete</button></td>
                        </tr>
                    )
                    })}
                </tbody>
            </table>
            </>
        )
    }

}

export default SalesList;