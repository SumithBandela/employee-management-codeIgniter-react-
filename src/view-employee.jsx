import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

export function ViewEmployee() {
  const { empno } = useParams();
  const [employee, setEmployee] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8080/api/employees/${empno}`)
      .then(response => {
        setEmployee(response.data);
      });
  }, [empno]);


  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center text-primary">Employee Details</h2>
      <div className="card p-4 shadow-sm">
        <div className="row align-items-center">
          <div className="col-md-4 text-center">
            <img
              src={`http://localhost:8080/uploads/${employee.photo}`}
              alt="Employee"
              className="img-fluid rounded-circle mb-3"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
            />
            <h4 className="text-success mt-2">{employee.ename}</h4>
            <p className="text-muted">{employee.job}</p>
          </div>

          <div className="col-md-8">
           <dl className="row">
            <dt className="col-sm-4">Email</dt>
            <dd className="col-sm-8">{employee.mail_id}</dd>

            <dt className="col-sm-4">Hire Date</dt>
            <dd className="col-sm-8">{employee.hiredate}</dd>

            <dt className="col-sm-4">Salary</dt>
            <dd className="col-sm-8">₹{employee.salary}</dd>

            <dt className="col-sm-4">Department</dt>
            <dd className="col-sm-8">{employee.dname} ({employee.deptno})</dd>

            <dt className="col-sm-4">Location</dt>
            <dd className="col-sm-8">{employee.location}</dd>
          </dl>

            <div className="mt-4">
              <button
                className="btn btn-outline-primary me-3"
                onClick={() => navigate(`/dashboard/edit/${empno}`)}
              >
                Edit
              </button>

              <button
                className="btn btn-outline-danger me-3"
                onClick={() => navigate(`/dashboard/delete/${empno}`)}
              >
                Delete
              </button>

              <Link to="/dashboard" className="btn btn-secondary">
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
