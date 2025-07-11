import axios from "axios";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";

export function AddEmployee() {
  const navigate = useNavigate();
  
  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      salary: '',
      designation: '',
      joined_date: '',
      photo: null   
    },
    validationSchema: yup.object({
      firstname: yup.string().required('Firstname is required'),
      lastname: yup.string().required('Lastname is required'),
      email: yup.string().email('Invalid email').required('Email is required'),
      phone: yup.string().matches(/^\d{10}$/, "Phone number must be 10 digits").required("Phone number is required"),
      salary: yup.string().required('Salary is required'),
      designation: yup.string().required('Designation is required'),
      joined_date: yup.date().required('Joining date is required'),
    }),
    onSubmit: async (formData, { setSubmitting, resetForm }) => {
      setSubmitting(true);

      try {
        if (!formData.photo) {
          alert("Please select a photo.");
          setSubmitting(false);
          return;
        }

        // Create a new FormData object and append form fields
        const formDataToSend = new FormData();
        formDataToSend.append('firstname', formData.firstname);
        formDataToSend.append('lastname', formData.lastname);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('phone', formData.phone);
        formDataToSend.append('salary', formData.salary);
        formDataToSend.append('designation', formData.designation);
        formDataToSend.append('joined_date', formData.joined_date);
        formDataToSend.append('photo', formData.photo); // Sending the file directly

        // Post the form data
        const response = await axios.post('http://localhost:8080/api/employees', formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log('Employee added:', response.data);
        navigate('/dashboard');
        resetForm();
        
      } catch (error) {
        console.error('Error adding employee:', error.response?.data || error.message);
      } finally {
        setSubmitting(false);
      }
    }
  });

  return (
    <div className="d-flex justify-content-center align-items-center mt-5 container">
      <form className="m-2 p-4 w-50 border border-2" onSubmit={formik.handleSubmit} encType="multipart/form-data">
        <h2>Add Employee</h2>
        <dl>
          <dt>Firstname</dt>
          <dd>
            <input
              type="text"
              name="firstname"
              className="form-control"
              onChange={formik.handleChange}
              value={formik.values.firstname}
            />
            {formik.touched.firstname && formik.errors.firstname && (
              <div className="text-danger">{formik.errors.firstname}</div>
            )}
          </dd>

          <dt>Lastname</dt>
          <dd>
            <input
              type="text"
              name="lastname"
              className="form-control"
              onChange={formik.handleChange}
              value={formik.values.lastname}
            />
            {formik.touched.lastname && formik.errors.lastname && (
              <div className="text-danger">{formik.errors.lastname}</div>
            )}
          </dd>

          <dt>Email</dt>
          <dd>
            <input
              type="text"
              name="email"
              className="form-control"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-danger">{formik.errors.email}</div>
            )}
          </dd>

          <dt>Phone</dt>
          <dd>
            <input
              type="text"
              name="phone"
              className="form-control"
              onChange={formik.handleChange}
              value={formik.values.phone}
            />
            {formik.touched.phone && formik.errors.phone && (
              <div className="text-danger">{formik.errors.phone}</div>
            )}
          </dd>

          <dt>Salary</dt>
          <dd>
            <input
              type="text"
              name="salary"
              className="form-control"
              onChange={formik.handleChange}
              value={formik.values.salary}
            />
            {formik.touched.salary && formik.errors.salary && (
              <div className="text-danger">{formik.errors.salary}</div>
            )}
          </dd>

          <dt>Designation</dt>
          <dd>
            <select
              name="designation"
              className="form-select"
              onChange={formik.handleChange}
              value={formik.values.designation}
            >
              <option value="">Select Designation</option>
              <option value="Python Developer">Python Developer</option>
              <option value="Java Developer">Java Developer</option>
              <option value="Php Developer">Php Developer</option>
              <option value="React Js Developer">React Js Developer</option>
            </select>
            {formik.touched.designation && formik.errors.designation && (
              <div className="text-danger">{formik.errors.designation}</div>
            )}
          </dd>

          <dt>Joined Date</dt>
          <dd>
            <input
              type="date"
              name="joined_date"
              className="form-control"
              onChange={formik.handleChange}
              value={formik.values.joined_date}
            />
            {formik.touched.joined_date && formik.errors.joined_date && (
              <div className="text-danger">{formik.errors.joined_date}</div>
            )}
          </dd>

          <dt>Photo</dt>
          <dd>
            <input
              type="file"
              name="photo"
              accept="image/*"
              className="form-control"
              onChange={(event) => {
                formik.setFieldValue("photo", event.currentTarget.files[0]);
              }}
            />
            {formik.touched.photo && formik.errors.photo && (
              <div className="text-danger">{formik.errors.photo}</div>
            )}
          </dd>
        </dl>

        <button className="btn btn-primary" type="submit" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? "Adding Employee..." : "Add Employee"}
        </button>

        <Link to='/dashboard' className="btn btn-success ms-3">Back to Dashboard</Link>
      </form>
    </div>
  );
}
