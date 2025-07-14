import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

export function DeleteEmployee() {
  const [employee, setEmployee] = useState({});
  const { empno } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8080/api/employees/${empno}`)
      .then(response => {
        setEmployee(response.data);
      });
  }, [empno]);

  const handleDelete = async (event) => {
    event.preventDefault();
    try {
      await axios.delete(`http://localhost:8080/api/employees/${empno}`);
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
          <dt>Name</dt>
          <dd><input type="text" className="form-control" value={employee.ename || ''} readOnly /></dd>

          <dt>Email</dt>
          <dd><input type="text" className="form-control" value={employee.mail_id || ''} readOnly /></dd>

          <dt>Job</dt>
          <dd><input type="text" className="form-control" value={employee.job || ''} readOnly /></dd>

          <dt>Hire Date</dt>
          <dd><input type="text" className="form-control" value={employee.hiredate || ''} readOnly /></dd>

          <dt>Salary</dt>
          <dd><input type="text" className="form-control" value={employee.salary || ''} readOnly /></dd>

          <dt>Department No</dt>
          <dd><input type="text" className="form-control" value={employee.deptno || ''} readOnly /></dd>

          <dt>Photo</dt>
          <dd>
            {employee.photo ? (
              <img
                src={`http://localhost:8080/uploads/${employee.photo}`}
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
        <Link onClick={()=>navigate(-1)} className="btn btn-success ms-3 w-25">No</Link>
      </form>
    </div>
  );
}
