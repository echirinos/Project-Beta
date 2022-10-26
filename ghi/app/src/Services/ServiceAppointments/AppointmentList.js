import React from 'react';

class AppointmentList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            appointments: [],
        }
    }

    async componentDidMount() {
        const url = "http://localhost:8080/api/appointment/";
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            this.setState({ appointments: data.appointments.filter(appt => !appt.isCompleted) })
        }
    }

    async cancelAppointment(appointmentID, customerName) {
        const isConfirmed = window.confirm(`Delete this appointment for ${customerName}?`)
        if (isConfirmed) {
            const url = `http://localhost:8080/api/appointment/${appointmentID}/`;
            const fetchConfig = { method: "delete" };
            const response = await fetch(url, fetchConfig);

            const filteredAppointments = this.state.appointments.filter(appointment => appointment.id !== appointmentID)
            if (response.ok) {
                this.setState({ appointments: filteredAppointments })
            }
        }
    }

    async completeAppointment(appointmentID) {
        const URL = `http://localhost:8080/api/appointment/${appointmentID}/`;
        const data = { isCompleted: true };
        const fetchConfig = {
            method: "put",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        };

        const response = await fetch(URL, fetchConfig);
        if (response.ok) {
            const appointments = this.state.appointments;
            const filteredState = appointments.filter(appt => appt.id !== appointmentID);
            this.setState({ appointments: filteredState });
        }
    }

    render() {
        return (
            <>
                <h1 className="text-center">Service Appointments</h1>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>VIN</th>
                            <th>Customer Name</th>
                            <th>Appointment Date</th>
                            <th>VIP Status</th>
                            <th>Reason</th>
                            <th>Assigned Technician</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.appointments.map(appointment => (
                                <tr key={appointment.id}>
                                    <td>{appointment.vin}</td>
                                    <td>{appointment.customer_name}</td>
                                    <td>{new Date(appointment.appointment_date).toLocaleString()}</td>
                                    <td>{appointment.isVIP ? "VIP" : "Not VIP"}</td>
                                    <td>{appointment.reason}</td>
                                    <td>{appointment.assigned_technician.name}</td>
                                    <td>
                                        <button className='btn btn-danger' onClick={() => this.cancelAppointment(appointment.id, appointment.customer_name)} >Cancel</button>
                                        <button className='btn btn-success' onClick={() => this.completeAppointment(appointment.id)} >Finish</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </>
        )
    }
}

export default AppointmentList
