import { NavLink } from 'react-router-dom';


function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle"  id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" >
                Sales
              </a>
              <ul className="dropdown-menu dropdown-menu-dark">
                <NavLink className="nav-link" to="/sales">Sales List</NavLink>
                <NavLink className="nav-link" to="/sales/new">Create a Sale Record</NavLink>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" >
                Inventory
              </a>
              <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                <NavLink className="nav-link " to="/automobiles">Automobile List</NavLink>
                <NavLink className="nav-link " to="/automobiles/new">Create an Automobile</NavLink>
                <li><hr className="dropdown-divider"/></li>
                <NavLink className="nav-link " to="/vehicles">Vehicle Model List</NavLink>
                <NavLink className="nav-link " to="/vehicles/new">Create a Vehicle Model</NavLink>
                <NavLink className="nav-link" to="/manufacturers">Manufacturers</NavLink>
                <NavLink className="nav-link" to="/manufacturers/new">Create a manufacturer</NavLink>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle"  id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" >
                Sales People
              </a>
              <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                <NavLink className="nav-link" to="/employees/new">Create an Employee</NavLink>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle"  id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" >
                Customers
              </a>
              <ul className="dropdown-menu dropdown-menu-dark">
                <NavLink className="nav-link" to="/customers/new">Create an Customer</NavLink>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" >
                Services
              </a>
              <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                <NavLink className="nav-link" to="/history">Get service history</NavLink>
                <NavLink className="nav-link" to="/technicians/new">Enter a technician</NavLink>
                <NavLink className="nav-link" to="/appointments/new">Enter a service appointment</NavLink>
                <NavLink className="nav-link" to="/appointments">Appointments</NavLink>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
