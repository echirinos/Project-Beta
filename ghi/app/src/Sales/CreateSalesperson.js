import React from "react";

class CreateSalesperson extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            employeeNumber: '' ,
            alertClass: "d-none"
        };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        const url = 'http://localhost:8090/api/salespersons/'
        const response = await fetch(url)
        if (response.ok) {
            const data = await response.json()
            this.setState({ salespersons: data.salespersons})
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
        data.employeeNumber = data.employeeNumber
        delete data.salespersons;
        delete data.employeeNumber
        delete data.alertClass
    
        const URL = 'http://localhost:8090/api/salespersons/'
        const fetchConfig = {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          }
        }
        const response = await fetch(URL, fetchConfig)
        if (!response.ok) {
            this.setState({ alertClass: "alert alert-danger" });
    }
        if (response.ok) {
          const cleared = {
            name: '',
            employeeNumber: '',
            alertClass: 'd-none',
          };
          this.setState(cleared)
        }
      }

      render() {
        return (
          <div className="row">
            <div className="offset-3 col-6">
              <div className="shadow p-4 mt-4">
                <h1 className="text-center">Add Salesperson</h1>
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
                      placeholder="Employee Number"
                      required 
                      type="number" 
                      id="employeeNumber" 
                      name="employeeNumber" 
                      className="form-control"
                      onChange={this.handleChange}
                      value={this.state.employeeNumber}
                    />
                    <label htmlFor="year">Employee Number</label>
                  </div>
                  <div className={this.state.alertClass} role="alert">
                      Could not add employee. Check if employee number is unique.
                  </div>
                  <button className="btn btn-primary">Create</button>
                </form>
              </div>
            </div>
          </div>
        );
      }
    }
    
export default CreateSalesperson;
    