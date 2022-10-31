import React from 'react';

class VehicleModelForm extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      picture_url: "",
      manufacturer_id: "",
      manufacturers: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const url = 'http://localhost:8100/api/manufacturers/';
    const response = await fetch(url);
    if (response.ok) {
        const data = await response.json();
        this.setState({ manufacturers: data.manufacturers});
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  async handleSubmit(e) {
    e.preventDefault();

    const data = {...this.state};
    delete data.manufacturers;

    const URL = 'http://localhost:8100/api/models/';
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      }
    };

    const response = await fetch(URL, fetchConfig);
    if (response.ok) {
      const cleared = {
        name: "",
        picture_url: "",
        manufacturer_id: "",
      };

      this.setState(cleared);
    }
  }


    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1 className="text-center">Add Vehicle Model</h1>
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
                                <label htmlFor="name">Model Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    placeholder="Picture Url"
                                    required
                                    type="url"
                                    id="picture_url"
                                    name="picture_url"
                                    className="form-control"
                                    onChange={this.handleChange}
                                    value={this.state.picture_url}
                                />
                                <label htmlFor="url">Picture Url</label>
                            </div>
                            <div className="mb-3">
                                <select
                                    required
                                    id="manufacturer_id"
                                    name="manufacturer_id"
                                    className="form-select"
                                    onChange={this.handleChange}
                                    value={this.state.manufacturer_id}
                                >
                                    <option value="">Choose a manufacturer</option>
                                    {
                                        this.state.manufacturers.map(manufacturer => (
                                            <option key={manufacturer.href} value={manufacturer.id}>
                                                {manufacturer.name}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default VehicleModelForm;
