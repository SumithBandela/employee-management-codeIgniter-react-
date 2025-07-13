import axios from "axios";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";

export function Login() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: yup.object({
      email: yup.string().email('Invalid email').required('Email is required'),
      password: yup.string().required('Password is required')
    }),
    onSubmit: async (formData, { setSubmitting, setStatus }) => {
      try {
        const response = await axios.post(`http://localhost:8080/auth/login`, formData);

        // Assuming your CodeIgniter login returns token like { token: "..." }
        localStorage.setItem('token', response.data.token);

        setStatus({ success: "Login successful!" });
        navigate('/dashboard');
      } catch (error) {
        console.error(error);
        setStatus({
          error: error.response?.data?.messages?.error || "Invalid email or password"
        });
      } finally {
        setSubmitting(false);
      }
    }
  });

  return (
    <div className="container d-flex align-items-center justify-content-center" style={{ marginTop: '20vh' }}>
      <form className="border border-2 w-25 p-4" onSubmit={formik.handleSubmit}>
        <h2><i className="bi bi-person-fill"></i> Admin Login</h2>
        <dl>
          <dt>Email</dt>
          <dd><input type="email" name='email' className="form-control" onChange={formik.handleChange} /></dd>
          <dd className="text-danger">{formik.errors.email}</dd>

          <dt>Password</dt>
          <dd><input type="password" name='password' className="form-control" onChange={formik.handleChange} /></dd>
          <dd className="text-danger">{formik.errors.password}</dd>
        </dl>

        <button className="btn btn-primary w-100" type="submit" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? 'Logging in...' : 'Login'}
        </button>

        {formik.status?.error && (
          <div className="text-danger text-center mt-2">{formik.status.error}</div>
        )}
         <div className="text-center m-2">
          <span>Don't have an account? <Link to='/signup' className="text-primary">Sign up</Link></span>
      </div>
      </form>
     
    </div>
  );
}
