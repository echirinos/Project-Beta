import React from 'react';

class CreateSalesRecord extends React.Component {
  constructor() {
    super();
    this.state = {
      sale_price: "",
      salesperson: "",
      customer: "",
      automobile: "",
      customers: [],
      salespersons: [],
      autos: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const customersURL = 'http://localhost:8090/api/customers/';
    const customersresponse = await fetch(customersURL);
    if (customersresponse.ok) {
        const data = await customersresponse.json();
        this.setState({ customers: data.customers});
    }
    const salespersonURL = 'http://localhost:8090/api/salespersons/';
    const salespersonresponse = await fetch(salespersonURL);
    if (salespersonresponse.ok) {
        const data = await salespersonresponse.json();
        this.setState({ salespersons: data.salespersons});
    }
    const autourl = 'http://localhost:8100/api/automobiles/';
    const autoresponse = await fetch(autourl);
    if (autoresponse.ok) {
        const data = await autoresponse.json();
        this.setState({ autos: data.autos});
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  async handleSubmit(e) {
    e.preventDefault();

    const data = {...this.state};
    delete data.customers
    delete data.salespersons
    delete data.autos

    const URL = 'http://localhost:8090/api/salesrecords/';
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      }
    };

    const response = await fetch(URL, fetchConfig)

    if (response.ok) {
        const deleteURL = `http://localhost:8100/api/automobiles/${this.state.automobile}`
        const fetchConfig = {
            method: "delete"
        }
        await fetch(deleteURL, fetchConfig)

        const filtered_state = this.state.autos.filter(auto => auto.vin === this.state.automobile)
        this.setState({autos: filtered_state})
    }
    if (response.ok)  {
        const cleared = {
            sale_price: "",
            salesperson: "",
            customer: "",
            automobile: "",
        };

      this.setState(cleared);
    }
  }



  async handleSubmit(e) {
    e.preventDefault();

    const data = {...this.state};
    delete data.customers
    delete data.salespersons
    delete data.autos

    const URL = 'http://localhost:8090/api/salesrecords/';
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      }
    };

    const response = await fetch(URL, fetchConfig)

    if (response.ok) {
        const deleteURL = `http://localhost:8100/api/automobiles/${this.state.automobile}`
        const fetchConfig = {
            method: "delete"
        }
        await fetch(deleteURL, fetchConfig)

        const filtered_state = this.state.autos.filter(auto => auto.vin === this.state.automobile)
        this.setState({autos: filtered_state})
    }
    if (response.ok)  {
        const cleared = {
            sale_price: "",
            salesperson: "",
            customer: "",
            automobile: "",
        };

      this.setState(cleared);
    }
  }

  render() {
    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1 className="text-center"></h1>
            <form onSubmit={this.handleSubmit}>
              <div className="form-floating mb-3">
                <input 
                  placeholder="Sale Price"
                  required 
                  type="text" 
                  id="sale_price" 
                  name="sale_price" 
                  className="form-control"
                  onChange={this.handleChange}
                  value={this.state.sale_price}
                />
                <label htmlFor="name">Sale Price</label>
              </div>

              <div className="mb-3">
                <select 
                  required 
                  id="automobile" 
                  name="automobile"
                  className="form-select"
                  onChange={this.handleChange}
                  value={this.state.automobile}
                >
                  <option value="">Choose an Automobile</option>
                  {
                    this.state.autos.map(auto => (
                      <option key={auto.vin} value={auto.vin}>
                        {auto.year}, {auto.color}, {auto.model.name}, {auto.vin}
                      </option>
                    ))
                  }
                </select>
              </div>

              <div className="mb-3">
                <select 
                  required 
                  id="salesperson" 
                  name="salesperson"
                  className="form-select"
                  onChange={this.handleChange}
                  value={this.state.salesperson}
                >
                  <option value="">Choose a Salesperson</option>
                  {
                    this.state.salespersons.map(person => (
                      <option key={person.employee_number} value={person.employee_number}>
                        {person.name}
                      </option>
                    ))
                  }
                </select>
              </div>

              <div className="mb-3">
                <select 
                  required 
                  id="customer" 
                  name="customer"
                  className="form-select"
                  onChange={this.handleChange}
                  value={this.state.customer}
                >
                  <option value="">Choose a Customer</option>
                  {
                    this.state.customers.map(customer => (
                      <option key={customer.phone} value={customer.phone}>
                        {customer.name}, {customer.phone}
                      </option>
                    ))
                  }
                </select>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateSalesRecord;
