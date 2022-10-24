import React from 'react';

class InventoryForm extends React.Component {
  constructor() {
    super();
    this.state = {
      color: "",
      year: "",
      vin: "",
      model_id: "",
      alertClass: "d-none",
      models: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const url = 'http://localhost:8100/api/models/';
    const response = await fetch(url);
    if (response.ok) {
        const data = await response.json();
        this.setState({ models: data.models});
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
    delete data.models;
    delete data.alertClass;

    const URL = 'http://localhost:8100/api/automobiles/';
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
        color: "",
        year: "",
        vin: "",
        model_id: "",
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
            <h1 className="text-center">Add Automobile to Inventory</h1>
            <form onSubmit={this.handleSubmit}>
              <div className="form-floating mb-3">
                <input 
                  placeholder="Color"
                  required 
                  type="text" 
                  id="color" 
                  name="color" 
                  className="form-control"
                  onChange={this.handleChange}
                  value={this.state.color}
                />
                <label htmlFor="name">Color</label>
              </div>
              <div className="form-floating mb-3">
                <input 
                  placeholder="Year"
                  required 
                  type="text" 
                  id="year" 
                  name="year" 
                  className="form-control"
                  onChange={this.handleChange}
                  value={this.state.year}
                />
                <label htmlFor="year">Year</label>
              </div>
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
              <div className="mb-3">
                <select 
                  required 
                  id="model_id" 
                  name="model_id"
                  className="form-select"
                  onChange={this.handleChange}
                  value={this.state.model_id}
                >
                  <option value="">Choose a model</option>
                  {
                    this.state.models.map(model => (
                      <option key={model.href} value={model.id}>
                        {model.name}
                      </option>
                    ))
                  }
                </select>
              </div>
              <div className={this.state.alertClass} role="alert">
                  Could not add automobile to inventory. Check if VIN is unique.
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default InventoryForm;
