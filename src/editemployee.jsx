import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";

export function EditEmployee() {
  const [employee, setEmployee] = useState({});
  let { id } = useParams();
  let navigate = useNavigate()
  useEffect(() => {
    axios.get(`http://localhost:8080/api/employees/${id}`)
      .then(response => {
        setEmployee(response.data);
      });
  }, [id]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstname: employee.firstname || "",
      lastname: employee.lastname || "",
      email: employee.email || "",
      phone: employee.phone || "",
      designation: employee.designation || "",
      salary: employee.salary || "",
      joined_date: employee.joined_date || "",
      photo: null
    },
    validationSchema: yup.object({
      firstname: yup.string().required('Firstname is required'),
      lastname: yup.string().required('Lastname is required'),
      email: yup.string().email('Invalid email').required('Email is required'),
      phone: yup.string().matches(/^\d{10}$/, "Invalid phone number").required("Phone number is required"),
      salary: yup.string().required('Salary is required')
    }),
    onSubmit: async (formData) => {
      try {
        const form = new FormData();
        for (const key in formData) {
          if (formData[key]) {
            form.append(key, formData[key]);
          }
        }

        await axios.put(`http://localhost:8080/api/employees/${id}`, form, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        alert('Employee updated successfully!');
        navigate('/dashboard')
        
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
          <dt>Firstname</dt>
          <dd><input type="text" name="firstname" className="form-control" onChange={formik.handleChange} value={formik.values.firstname} /></dd>
          <dd className="text-danger">{formik.errors.firstname}</dd>

          <dt>Lastname</dt>
          <dd><input type="text" name="lastname" className="form-control" onChange={formik.handleChange} value={formik.values.lastname} /></dd>
          <dd className="text-danger">{formik.errors.lastname}</dd>

          <dt>Email</dt>
          <dd><input type="text" name="email" className="form-control" onChange={formik.handleChange} value={formik.values.email} /></dd>
          <dd className="text-danger">{formik.errors.email}</dd>

          <dt>Phone</dt>
          <dd><input type="text" name="phone" className="form-control" onChange={formik.handleChange} value={formik.values.phone} /></dd>
          <dd className="text-danger">{formik.errors.phone}</dd>

          <dt>Salary</dt>
          <dd><input type="text" name="salary" className="form-control" onChange={formik.handleChange} value={formik.values.salary} /></dd>
          <dd className="text-danger">{formik.errors.salary}</dd>

          <dt>Designation</dt>
          <dd>
            <select name="designation" className="form-select" onChange={formik.handleChange} value={formik.values.designation}>
              <option value="Python Developer">Python Developer</option>
              <option value="Java Developer">Java Developer</option>
              <option value="Php Developer">Php Developer</option>
              <option value="React Js Developer">React Js Developer</option>
            </select>
          </dd>

          <dt>Joined Date</dt>
          <dd><input type="date" name="joined_date" className="form-control" onChange={formik.handleChange} value={formik.values.joined_date} /></dd>

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
                src={`http://localhost:8080/writeable/uploads/${employee.photo}`}
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
        <Link to='/dashboard' className="btn btn-success ms-3">Back to Dashboard</Link>
      </form>
    </div>
  );
}
