import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

export function DeleteEmployee() {
  const [employee, setEmployee] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(`http://localhost:8080/api/employees/${id}/`)
      .then(response => {
        setEmployee(response.data);
      });
  }, [id]);

  const handleDelete = async (event) => {
    event.preventDefault();
    try {
      await axios.delete(`http://localhost:8080/api/employees/${id}`);
      alert('Employee deleted successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error deleting employee:', error.response?.data || error.message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-5 container">
      <form className="m-2 p-4 w-50 border border-2" onSubmit={handleDelete}>
        <h2><i className="bi bi-trash me-2"></i>Are you sure you want to delete?</h2>
        <dl>
          <dt>Firstname</dt>
          <dd><input type="text" className="form-control" value={employee.firstname} readOnly /></dd>

          <dt>Lastname</dt>
          <dd><input type="text" className="form-control" value={employee.lastname} readOnly /></dd>

          <dt>Email</dt>
          <dd><input type="text" className="form-control" value={employee.email} readOnly /></dd>

          <dt>Phone</dt>
          <dd><input type="text" className="form-control" value={employee.phone} readOnly /></dd>

          <dt>Salary</dt>
          <dd><input type="text" className="form-control" value={employee.salary} readOnly /></dd>

          <dt>Designation</dt>
          <dd><input type="text" className="form-control" value={employee.designation} readOnly /></dd>

          <dt>Joined Date</dt>
          <dd><input type="text" className="form-control" value={employee.joined_date} readOnly /></dd>

          <dt>Photo</dt>
          <dd>
            {employee.photo ? (
              <img
                src={`http://localhost:8080/writeable/uploads/${employee.photo}`}
                alt="Employee"
                width="100"
                className="border rounded mt-2"
              />
            ) : (
              <p>No photo uploaded</p>
            )}
          </dd>
        </dl>

        <button className="btn btn-danger w-25" type="submit">Yes</button>
        <Link to='/dashboard' className="btn btn-success ms-3 w-25">No</Link>
      </form>
    </div>
  );
}
