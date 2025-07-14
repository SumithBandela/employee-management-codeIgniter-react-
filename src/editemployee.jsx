import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";

export function EditEmployee() {
  const [employee, setEmployee] = useState({});
  let { empno } = useParams();
  let navigate = useNavigate()
  useEffect(() => {
    axios.get(`http://localhost:8080/api/employees/${empno}`)
      .then(response => {
        setEmployee(response.data);
      });
  }, [empno]);

      const formik = useFormik({
      enableReinitialize: true,
      initialValues: {
        ename: employee.ename || "",
        job: employee.job || "",
        hiredate: employee.hiredate || "",
        sal: employee.salary || "",
        deptno: employee.deptno || "",
        mail_id: employee.mail_id || "",
        photo: null
      },
      validationSchema: yup.object({
        ename: yup.string().required('Name is required'),
        job: yup.string().required('Job is required'),
        hiredate: yup.date().required('Hire date is required'),
        salary: yup.string().required('Salary is required'),
        deptno: yup.string().required('Department number is required'),
        mail_id: yup.string().email('Invalid email').required('Email is required')
      }),
      onSubmit: async (formData) => {
        try {
          const form = new FormData();
          for (const key in formData) {
            if (formData[key]) {
              form.append(key, formData[key]);
            }
          }

          await axios.post(`http://localhost:8080/api/employees/update/${empno}`, form, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

          alert('Employee updated successfully!');
          navigate('/dashboard');

        } catch (error) {
          console.error('Error updating employee:', error.response?.data || error.message);
        }
      }
    });

  return (
    <div className="d-flex justify-content-center align-items-center mt-5 container">
      <form className="m-2 p-4 w-50 border border-2" onSubmit={formik.handleSubmit} encType="multipart/form-data">
        <h2><i className="bi bi-pen-fill me-2"></i>Edit Employee</h2>
        <dl>
          <dt>Employee Name</dt>
          <dd>
            <input type="text" name="ename" className="form-control" onChange={formik.handleChange} value={formik.values.ename} />
            <div className="text-danger">{formik.errors.ename}</div>
          </dd>

          <dt>Job</dt>
          <dd>
            <select name="job" className="form-select" onChange={formik.handleChange} value={formik.values.job}>
              <option value="">Select Job</option>
              <option value="CLERK">CLERK</option>
              <option value="MANAGER">MANAGER</option>
              <option value="SALESMAN">SALESMAN</option>
              <option value="ANALYST">ANALYST</option>
              <option value="PRESIDENT">PRESIDENT</option>
            </select>
          </dd>

          <dt>Hire Date</dt>
          <dd>
            <input type="date" name="hiredate" className="form-control" onChange={formik.handleChange} value={formik.values.hiredate} />
          </dd>

          <dt>Salary</dt>
          <dd>
            <input type="text" name="salary" className="form-control" onChange={formik.handleChange} value={formik.values.sal} />
          </dd>

          <dt>Department</dt>
          <dd>
            <select name="deptno" className="form-select" onChange={formik.handleChange} value={formik.values.deptno}>
              <option value="">Select Department</option>
              <option value="10">10 - ACCOUNTING</option>
              <option value="20">20 - RESEARCH</option>
              <option value="30">30 - SALES</option>
              <option value="40">40 - OPERATIONS</option>
            </select>
          </dd>

          <dt>Email</dt>
          <dd>
            <input type="text" name="mail_id" className="form-control" onChange={formik.handleChange} value={formik.values.mail_id} />
          </dd>

          <dt>Photo</dt>
          <dd>
            <input
              type="file"
              name="photo"
              accept="image/*"
              className="form-control"
              onChange={(event) =>
                formik.setFieldValue("photo", event.currentTarget.files[0])
              }
            />
          </dd>

          {employee.photo && (
            <dd>
              <img
                src={`http://localhost:8080/${employee.photo}`}
                alt="Current"
                width="100"
                className="mt-2"
              />
            </dd>
          )}

        </dl>

        <button className="btn btn-primary w-25" type="submit" disabled={formik.isSubmitting}>
            {formik.isSubmitting ? "Updating..." : "Update"}
        </button>
        <Link onClick={()=>navigate(-1)} className="btn btn-success ms-3">Back</Link>
      </form>
    </div>
  );
}
