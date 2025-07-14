import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const accessToken = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8080/api/employees")
      .then((response) => {
        setEmployees(response.data);
      });
  }, [accessToken]);

  function logout() {
    localStorage.removeItem('token');
    window.location.href = "/login";
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center text-success mb-4">Employee Dashboard</h2>

      <div className="d-flex justify-content-between mb-3">
        <button className="btn btn-primary" onClick={() => navigate("add")}>
          Add Employee
        </button>

        <div>
          <button
            className="btn btn-outline-secondary me-2"
            onClick={() => navigate("/change-password")}
          >
            Change Password
          </button>
          <button className="btn btn-danger" onClick={logout}>
            Logout
          </button>
        </div>
      </div>

      {employees.length === 0 ? (
        <p className="text-center">No employees found.</p>
      ) : (
        employees.map((employee) => (
          <div key={employee.empno} className="card mb-3 shadow-sm">
            <div className="card-body d-flex align-items-center">
              <img
                src={`http://localhost:8080/${employee.photo}`}
                alt="Employee"
                className="img-thumbnail me-3"
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
              />

              <div className="flex-grow-1">
                <h5 className="mb-1">{employee.ename}</h5>
                <p className="mb-0 text-muted">{employee.job}</p>
              </div>

              <button
                className="btn btn-outline-info btn-sm"
                onClick={() => navigate(`view/${employee.empno}`)}
              >
                View
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
