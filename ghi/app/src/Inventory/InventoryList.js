import React from "react";

class InventoryList extends React.Component {
    constructor(props) {
        super(props)
        this.state = { inventory: [] }
        this.deleteinventory = this.deleteinventory.bind(this);
    }

    async componentDidMount() {
        const response = await fetch('http://localhost:8100/api/automobiles/')
        if (response.ok) {
            const data = await response.json()
            this.setState({ inventory: data.autos })
        }
    }

    async deleteinventory(inventory) {
        const deleteURL = "http://localhost:8100/api/automobiles/${automobiles.VIN}"
        const fetchConfig = {
            method: "delete"
        }
        await fetch(deleteURL, fetchConfig)

        const id = this.state.inventory.indexOf(inventory)
        const updated_inventory = [...this.state.inventory]
        updated_inventory.splice(id, 1)
        this.setState({ inventory: updated_inventory })
    }

    render() {
        return (
            <><table className="table table-striped mt-4">
                <thead>
                    <tr>
                        <th>Color</th>
                        <th>Year</th>
                        <th>VIN</th>
                        <th>Model</th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.inventory.map(inventories => {
                        return (
                            <tr key={inventories.id}>
                                <td>{inventories.color}</td>
                                <td>{inventories.year}</td>
                                <td>{inventories.vin}</td>
                                <td>{inventories.model.name}</td>
                                <td><button className="btn btn-danger" onClick={() => this.deleteinventory(inventories)}>Delete</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            </>
        )
    }

}

export default InventoryList;