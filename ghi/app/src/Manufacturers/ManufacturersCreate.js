import React from "react";

class ManufacturerCreate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        const url = 'http://localhost:8100/api/manufacturers/'
        const response = await fetch(url)
        if (response.ok) {
            const data = await response.json()
            this.setState({ manufacturers: data.manufacturers })
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
        delete data.manufacturers

        const manufacturerURL = 'http://localhost:8100/api/manufacturers/'
        const fetchConfig = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const response = await fetch(manufacturerURL, fetchConfig)
        if (response.ok) {
            const newManufacturer = await response.json()
            const cleared = {
                name: ''
            }
            this.setState(cleared)
        }
    }
    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a new manufacturer</h1>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="name" name="name" value={this.state.name} placeholder="Manufacturer Name" onChange={this.handleChange} />
                                <label htmlFor="name">Manufacturer Name</label>
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>

        )
    }
}

export default ManufacturerCreate;