import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" aria-current="page">
          CarBook
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* Manufacturer dropdown links */}
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="/manufacturers"
                id="navbarDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Manufacturers
              </Link>
              <ul
                className="dropdown-menu dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li className="nav-item">
                  <Link className="dropdown-item" to="/manufacturers">
                    List Manufacturers
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="dropdown-item" to="/manufacturers/new">
                    Add a Manufacturer
                  </Link>
                </li>
              </ul>
            </li>
            {/* Vehicle model dropdown links */}
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="/"
                id="navbarDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Vehicle Models
              </Link>
              <ul
                className="dropdown-menu dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li className="nav-item">
                  <Link className="dropdown-item" to="/vehicle-models">
                    List Vehicle Models
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="dropdown-item" to="/vehicle-models/new">
                    Add a Vehicle Model
                  </Link>
                </li>
              </ul>
            </li>
            {/* Inventory dropdown links */}
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="/inventory"
                id="navbarDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Inventory
              </Link>
              <ul
                className="dropdown-menu dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li className="nav-item">
                  <Link className="dropdown-item" to="/inventory">
                    List all Inventory
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="dropdown-item" to="/inventory/new">
                    Add to Inventory
                  </Link>
                </li>
              </ul>
            </li>
            {/* Appointment dropdown links */}
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="/appointments/"
                id="navbarDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Automobile Service
              </Link>
              <ul
                className="dropdown-menu dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
              <li className="nav-item">
                <Link className="dropdown-item" to="/technician">
                Add Technician
                 </Link>
                </li>
                <li className="nav-item">
                  <Link className="dropdown-item" to="/appointments/new">
                    Create Service Appointment
                  </Link>
                </li>                
                <li className="nav-item">
                  <Link className="dropdown-item" to="/appointments">
                    List Service Appointments
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="dropdown-item" to="/appointments/history">
                    Service History
                  </Link>
                </li>
              </ul>
            </li>
            {/* Salesperson dropdown links */}
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="/salesperson/"
                id="navbarDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Salespeople
              </Link>
              <ul
                className="dropdown-menu dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li className="nav-item">
                  <Link className="dropdown-item" to="/salesperson">
                    Add Salesperson
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="dropdown-item" to="/salesrecords/new">
                    Create Sales Record
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="dropdown-item" to="/salesrecords">
                    List Sales Records
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="dropdown-item" to="/salesperson/history">
                    Salesperson History
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link className="nav-link" to="/customer">
                Add Potential Customer
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
