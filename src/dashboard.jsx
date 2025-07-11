import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Dashboard() {
    const [employees, setEmployees] = useState([]);
    const [expandedRow, setExpandedRow] = useState(null);
    const accessToken = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("http://localhost:8080/api/employees")
            .then((response) => {
                setEmployees(response.data);
            });
    }, [accessToken]);

    function toggleDetails(id) {
        setExpandedRow(expandedRow === id ? null : id);
    }

    function logout() {
        localStorage.removeItem('token');
        window.location.href = "/login";
    }

    return (
        <div className="container mt-5">
            <h2 className="text-center text-success mb-4">Employee Dashboard</h2>

            <div className="d-flex justify-content-end mb-3">
                <button
                    className="btn btn-primary me-2"
                    onClick={() => navigate("add")}
                >
                    Add Employee
                </button>
                <button className="btn btn-danger" onClick={logout}>
                    Logout
                </button>
            </div>

            {employees.length === 0 ? (
                <p className="text-center">No employees found.</p>
            ) : (
                employees.map((employee) => (
                    <div key={employee.id} className="card mb-3 shadow-sm">
                        <div className="card-body d-flex align-items-center">
                            {/* Employee Photo */}
                            <img
                                src={`http://localhost:8080${employee.photo}`}
                                alt="Employee"
                                className="img-thumbnail me-3"
                                style={{
                                    width: "80px",
                                    height: "80px",
                                    objectFit: "cover",
                                    borderRadius: "50%",
                                }}
                            />

                            {/* Basic Info */}
                            <div className="flex-grow-1">
                                <h5 className="mb-1">
                                    {employee.firstname} {employee.lastname}
                                </h5>
                                <p className="mb-0 text-muted">{employee.email}</p>
                            </div>

                            {/* Action Buttons */}
                            <div>
                                <button
                                    className="btn btn-info btn-sm me-2"
                                    onClick={() => toggleDetails(employee.id)}
                                >
                                    {expandedRow === employee.id ? "Hide" : "View"}
                                </button>
                                <button
                                    className="btn btn-outline-primary btn-sm me-2"
                                    onClick={() => navigate(`edit/${employee.id}`)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-outline-danger btn-sm"
                                    onClick={() => navigate(`delete/${employee.id}`)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>

                        {/* Expandable Details */}
                        {expandedRow === employee.id && (
                            <div className="card-footer bg-light">
                                <div className="row">
                                    <div className="col-md-4">
                                        <strong>Phone:</strong> {employee.phone}
                                    </div>
                                    <div className="col-md-4">
                                        <strong>Designation:</strong> {employee.designation}
                                    </div>
                                    <div className="col-md-4">
                                        <strong>Salary:</strong> ₹{employee.salary}
                                    </div>
                                    <div className="col-md-4">
                                        <strong>Joined Date:</strong> {employee.joined_date}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    );
}
