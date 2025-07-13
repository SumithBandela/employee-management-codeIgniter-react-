import axios from 'axios';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

export function Signup() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
    }),
    onSubmit: async (values, { setSubmitting, resetForm, setStatus }) => {
      try {
        const response = await axios.post('http://localhost:8080/auth/signup', values, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        // Show success message
        setStatus({ success: response.data.message || 'Signup successful' });
        resetForm();
        navigate('/login');
      } catch (error) {
        if (error.response && error.response.data) {
          const errors = error.response.data.messages || { general: 'Signup failed' };
          setStatus({ error: errors });
        } else {
          setStatus({ error: { general: 'Something went wrong' } });
        }
      } finally {
        setSubmitting(false);
      }
    }
  });

  return (
    <div className="container mt-5 w-50 border border-2 p-4">
      <h2>Signup</h2>

      {/* Success Alert */}
      {formik.status?.success && (
        <div className="alert alert-success">{formik.status.success}</div>
      )}

      {/* General Error */}
      {formik.status?.error?.general && (
        <div className="alert alert-danger">{formik.status.error.general}</div>
      )}

      <form onSubmit={formik.handleSubmit}>
        {/* Name Field */}
        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name && (
            <div className="text-danger">{formik.errors.name}</div>
          )}
          {formik.status?.error?.name && (
            <div className="text-danger">{formik.status.error.name[0]}</div>
          )}
        </div>

        {/* Email Field */}
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-danger">{formik.errors.email}</div>
          )}
          {formik.status?.error?.email && (
            <div className="text-danger">{formik.status.error.email[0]}</div>
          )}
        </div>

        {/* Password Field */}
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="text-danger">{formik.errors.password}</div>
          )}
          {formik.status?.error?.password && (
            <div className="text-danger">{formik.status.error.password[0]}</div>
          )}
        </div>

        <button type="submit" className="btn btn-primary w-100" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? 'Creating...' : 'Signup'}
        </button>

        <div className="text-center mt-2">
          <Link to="/login">Back to login page</Link>
        </div>
      </form>
    </div>
  );
}
