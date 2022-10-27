import React from "react";


//relatively the same code as CreatesalesPerson

class CreateCustomer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            address: '' ,
            phone: ''
        };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        const url = 'http://localhost:8090/api/customers/'
        const response = await fetch(url)
        if (response.ok) {
            const data = await response.json()
            this.setState({ customers: data.customers})
        }
    }

    handleChange(event) {
        this.setState({
          [event.target.name]: event.target.value
        });
      }
    
      async handleSubmit(event) {
        event.preventDefault();

        const data = { ...this.state }
        delete data.customers;

        const URL = 'http://localhost:8090/api/customers/'
        const fetchConfig = {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          }
        }
        const response = await fetch(URL, fetchConfig)
        if (response.ok) {
          const cleared = {
            name: '',
            address: '',
            phone: '',
          };
          this.setState(cleared)
        }
      }

      render() {
        return (
          <div className="row">
            <div className="offset-3 col-6">
              <div className="shadow p-4 mt-4">
                <h1 className="text-center">Add Customer</h1>
                <form onSubmit={this.handleSubmit}>
                  <div className="form-floating mb-3">
                    <input 
                      placeholder="Name"
                      required 
                      type="text"
                      id="name" 
                      name="name" 
                      className="form-control"
                      onChange={this.handleChange}
                      value={this.state.name}
                    />
                    <label htmlFor="name">Name</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input 
                      placeholder="Address"
                      required 
                      type="text" 
                      id="address" 
                      name="address" 
                      className="form-control"
                      onChange={this.handleChange}
                      value={this.state.address}
                    />
                    <label htmlFor="name">Address</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input 
                      placeholder="Phone"
                      required 
                      type="text"
                      id="phone" 
                      name="phone" 
                      className="form-control"
                      onChange={this.handleChange}
                      value={this.state.phone}
                    />
                    <label htmlFor="name">Phone Number</label>
                  </div>
                  <button className="btn btn-primary">Create</button>
                </form>
              </div>
            </div>
          </div>
        );
      }
    }
    
export default CreateCustomer;
    