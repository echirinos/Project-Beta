import React from 'react';

/*
You need to create a form that allows a person to enter an automotive technician's name
and employee number. When the form is submitted, the automotive technician is created in the application.

You need to create a link in the navbar to get to the Enter a technician form.
*/

class TechnicianForm extends React.Component {
    constructor() {
        super();
        this.state = {
            name: "",
            employeeNumber: "",
            alertClass: "d-none",
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    async handleSubmit(e) {
        e.preventDefault();

        const data = { ...this.state };
        data.employee_number = data.employeeNumber;
        delete data.technicians;
        delete data.employeeNumber;
        delete data.alertClass;

        const URL = 'http://localhost:8080/api/technician/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        };

        const response = await fetch(URL, fetchConfig);
        if (!response.ok) {
            this.setState({ alertClass: "alert alert-danger" });
        }
        if (response.ok) {
            const cleared = {
                name: "",
                employeeNumber: "",
                alertClass: "d-none"
            };

            this.setState(cleared);
        }
    }

    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1 className="text-center">Add Technician</h1>
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
                                You are attempting to add an employee number that is already being used. Make sure the employee number is unique.
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default TechnicianForm;
