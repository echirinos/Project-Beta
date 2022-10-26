import React from 'react';

class VehicleModelsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      models: [],
    }
  }

  async componentDidMount() {
    const url = "http://localhost:8100/api/models/";
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      this.setState({models: data.models})
    }
  }

  async deleteModel(modelID, modelName) {
    const isConfirmed = window.confirm(`Delete this ${modelName}?`)
    if (isConfirmed) {
      const url = `http://localhost:8100/api/models/${modelID}/`;
      const fetchConfig = { method: "delete" };
      const response = await fetch(url, fetchConfig);

      const filteredModels = this.state.models.filter(model => model.id !== modelID)
      if (response.ok) {
        this.setState({models: filteredModels})
      }
    }
  }


    render() {
        return (
            <>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Manufacturer</th>
                            <th>Model</th>
                            <th>Picture</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.models.map(model => (
                                <tr key={model.id}>
                                    <td>{model.manufacturer.name}</td>
                                    <td>{model.name}</td>
                                    <td>
                                        <img src={model.picture_url} alt="Car Model" width="150" />
                                    </td>
                                    <td>
                                        <button className='btn btn-danger' onClick={() => this.deleteModel(model.id, model.name)} >Delete</button>
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

export default VehicleModelsList