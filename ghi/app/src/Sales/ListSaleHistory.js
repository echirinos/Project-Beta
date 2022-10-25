import React from "react";

function TableStatusMessage(props) {
    const { displaySaleLength, hasSearched } = props;

    // Initial page state, before user interaction. Below is code for 0 sales/haven't searched
    if (!hasSearched && displaySaleLength === 0) {
        return (
            <h3 className="text-center">Select a salesperson to view their sales history</h3>
        )
    }
    //below is code for for if saleperson has no sales
    if (hasSearched && displaySaleLength === 0) {
        return (
            <h3 className="text-center">No sales found for that salesperson.</h3>
        )
    }
}

class SalesHistoryList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            allSales: [],
            displaySales: [],
            searchSalesperson: "",
            salespersons: [],
            hasSearched: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        const salespersonURL = 'http://localhost:8090/api/salespersons/';
        const salespersonresponse = await fetch(salespersonURL);
        if (salespersonresponse.ok) {
            const data = await salespersonresponse.json();
            this.setState({ salespersons: data.salespersons });
        }

        const response = await fetch('http://localhost:8090/api/salesrecords/')
        if (response.ok) {
            const data = await response.json()
            this.setState({ allSales: data.salesrecords })
        }
    }


    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const filteredSales = this.state.allSales.filter(sale => sale.salesperson.employee_number === this.state.searchSalesperson);
        this.setState(
            {
                displaySales: filteredSales,
                hasSearched: true
            }
        )
    }

    render() {
        return (
            <>
                <div className="d-flex justify-content-between">
                    <h1>Salesperson's History</h1>
                    <form className="d-flex align-items-center" onSubmit={this.handleSubmit}>
                        <select
                            required
                            name="searchSalesperson"
                            id="searchSalesperson"
                            className="form-select"
                            onChange={this.handleChange}
                            value={this.state.searchSalesperson}
                        >
                            <option value="">Choose a Salesperson</option>
                            {
                                this.state.salespersons.map(salesperson => (
                                    <option key={salesperson.employee_number} value={salesperson.employee_number}>
                                        {salesperson.name}
                                    </option>
                                ))
                            }
                        </select>
                        <button className="btn btn-primary text-nowrap">Search Salesperson</button>
                    </form>
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Salesperson's Name</th>
                            <th>Salesperson's Employee ID</th>
                            <th>Customer</th>
                            <th>VIN</th>
                            <th>Sale Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.displaySales.map(sale => (
                                <tr key={sale.id}>
                                    <td>{sale.salesperson.name}</td>
                                    <td>{sale.salesperson.employee_number}</td>
                                    <td>{sale.customer.name}</td>
                                    <td>{sale.automobile.vin}</td>
                                    <td>{sale.sale_price}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <TableStatusMessage
                    displaySaleLength={this.state.displaySales.length}
                    hasSearched={this.state.hasSearched}
                />
            </>
        )
    }
}

export default SalesHistoryList;