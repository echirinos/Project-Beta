import React from 'react';
/*
You need to show a list of the service appointments for a specific VIN.
To do this, create a page that has an input that allows someone to type in the VIN.
On form submission, fetch all of the service appointments for an automobile with the VIN in the input.
Then, show that list of service appointments to include the customer name, date and time of the appointment,
the assigned technician's name, and the reason for the service.

You need to create a link in the navbar to get to the page that shows the service history for a specific VIN.
*/
function TableStatusMessage(props) {
    const { displayAppointmentsLength, hasSearched } = props;

    // Initial page state, before user interaction.
    if (!hasSearched && displayAppointmentsLength === 0) {
        return (
            <h3 className="text-center">Input a valid VIN to view its service history</h3>
        )
    }

    // Page state after user has completed at least one search
    if (hasSearched && displayAppointmentsLength === 0) {
        return (
            <h3 className="text-center">No past service appointments found for that VIN.</h3>
        )
    }
}

class AppointmentHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allAppointments: [],
            displayAppointments: [],
            searchVIN: "",
            hasSearched: false
        }
        this.handleSearch = this.handleSearch.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async componentDidMount() {
        const url = "http://localhost:8080/api/appointment/";
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            const completedAppointments = data.appointments.filter(appt => appt.isCompleted)
            this.setState({ allAppointments: completedAppointments })
        }
    }

    handleSearch(e) {
        e.preventDefault();
        const filteredAppointments = this.state.allAppointments.filter(appt => appt.vin === this.state.searchVIN);
        this.setState(
            {
                displayAppointments: filteredAppointments,
                hasSearched: true
            });
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    render() {
        return (
            <>
                <div className="d-flex justify-content-between">
                    <h1>Service Appointment History</h1>
                    <form className="d-flex align-items-center" onSubmit={this.handleSearch}>
                        <input
                            className="form-control"
                            type="text"
                            name="searchVIN"
                            id="searchVIN"
                            placeholder="Vehicle VIN"
                            onChange={this.handleChange}
                            value={this.state.searchVIN}
                        />
                        <button className="btn btn-primary text-nowrap">Search VIN</button>
                    </form>
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>VIN</th>
                            <th>Customer name</th>
                            <th>Date</th>
                            <th>Assigned Technician</th>
                            <th>Reason</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.displayAppointments.map(appointment => (
                                <tr key={appointment.id}>
                                    <td>{appointment.vin}</td>
                                    <td>{appointment.customer_name}</td>
                                    <td>{new Date(appointment.appointment_date).toLocaleString()}</td>
                                    <td>{appointment.assigned_technician.name}</td>
                                    <td>{appointment.reason}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <TableStatusMessage
                    displayAppointmentsLength={this.state.displayAppointments.length}
                    hasSearched={this.state.hasSearched}
                />
            </>
        )
    }
}

export default AppointmentHistory
