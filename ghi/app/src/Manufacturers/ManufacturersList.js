import React from "react";

class ManufacturersList extends React.Component {
    constructor(props) {
        super(props)
        this.state = { manufacturers: [] }
        this.deletemanufacturer = this.deletemanufacturer.bind(this);
    }

    async componentDidMount() {
        const response = await fetch('http://localhost:8100/api/manufacturers/')
        if (response.ok) {
            const data = await response.json()
            this.setState({ manufacturers: data.manufacturers })
        }
    }

    async deletemanufacturer(manufacturers) {
        const deleteURL = `http://localhost:8100/api/manufacturers/${manufacturers.id}/`
        const fetchConfig = {
            method: "delete"
        }
        await fetch(deleteURL, fetchConfig)

        const id = this.state.manufacturers.indexOf(manufacturers)
        const updated_manufacturers = [...this.state.manufacturers]
        updated_manufacturers.splice(id, 1)
        this.setState({ manufacturers: updated_manufacturers })
    }    

    render() {
        return (
            <><table className="table table-striped mt-4">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.manufacturers.map(manufacturer => {
                        return (
                            <tr key={manufacturer.id}>
                                <td>{manufacturer.name}</td>
                                <td><button className="btn btn-danger" onClick={() => this.deletemanufacturer(manufacturer)}>Delete</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            </>
        )
    }

}

export default ManufacturersList