import React from 'react';

class AppointmentForm extends React.Component {
    constructor() {
        super();
        this.state = {
            vin: "",
            customerName: "",
            appointmentDate: "",
            reason: "",
            technician: "",
            technicians: [],
            alertClass: "d-none",
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        const url = 'http://localhost:8080/api/technician/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            this.setState({ technicians: data.technicians });
        }
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    async handleSubmit(e) {
        e.preventDefault();

        const data = { ...this.state };
        data.appointment_date = data.appointmentDate;
        data.customer_name = data.customerName;
        data.assigned_technician = data.technician;
        delete data.technician;
        delete data.appointmentDate;
        delete data.customerName;
        delete data.technicians;
        delete data.alertClass;

        const URL = 'http://localhost:8080/api/appointment/';
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
                vin: "",
                customerName: "",
                appointmentDate: "",
                reason: "",
                technician: "",
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
                        <h1 className="text-center">Create Service Appointment</h1>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-floating mb-3">
                                <input
                                    placeholder="VIN"
                                    required
                                    type="text"
                                    id="vin"
                                    name="vin"
                                    className="form-control"
                                    onChange={this.handleChange}
                                    value={this.state.vin}
                                />
                                <label htmlFor="vin">VIN</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    placeholder="Customer Name"
                                    required
                                    type="text"
                                    id="customerName"
                                    name="customerName"
                                    className="form-control"
                                    onChange={this.handleChange}
                                    value={this.state.customerName}
                                />
                                <label htmlFor="customerName">Customer Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    placeholder="mm/dd/yyyy"
                                    required
                                    type="datetime-local"
                                    id="appointmentDate"
                                    name="appointmentDate"
                                    className="form-control"
                                    onChange={this.handleChange}
                                    value={this.state.appointmentDate}
                                />
                                <label htmlFor="appointmentDate">Appointment Date</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    placeholder="Reason for Appointment"
                                    required
                                    type="text"
                                    id="reason"
                                    name="reason"
                                    className="form-control"
                                    onChange={this.handleChange}
                                    value={this.state.reason}
                                />
                                <label htmlFor="reason">Reason for Appointment</label>
                            </div>
                            <div className="mb-3">
                                <select
                                    required
                                    id="technician"
                                    name="technician"
                                    className="form-select"
                                    onChange={this.handleChange}
                                    value={this.state.technician}
                                >
                                    <option value="">Assign a technician</option>
                                    {
                                        this.state.technicians.map(technician => (
                                            <option key={technician.employee_number} value={technician.employee_number}>
                                                {technician.name}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className={this.state.alertClass} role="alert">
                                Could not create appointment.
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default AppointmentForm;
