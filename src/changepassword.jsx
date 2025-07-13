import axios from 'axios';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
export function ChangePassword() {
  const formik = useFormik({
    initialValues: {
      old_password: '',
      new_password: '',
      confirm_password: ''
    },
    validationSchema: Yup.object({
      old_password: Yup.string().required('Old password is required'),
      new_password: Yup.string()
        .min(6, 'New password must be at least 6 characters')
        .required('New password is required'),
      confirm_password: Yup.string()
        .oneOf([Yup.ref('new_password'), null], 'Passwords must match')
        .required('Confirm password is required')
    }),
    onSubmit: async (values, { setSubmitting, setStatus, resetForm }) => {
      try {
        const token = localStorage.getItem('token'); // Adjust if using other storage
        const response = await axios.post(
          'http://localhost:8080/auth/change-password',
          values,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        );
        setStatus({ success: response.data.message || 'Password changed successfully!' });
        resetForm();
      } catch (error) {
        setStatus({
          error:
            error.response?.data?.message ||
            'Failed to change password. Please try again.'
        });
      } finally {
        setSubmitting(false);
      }
    }
  });

  return (
    <div className="container mt-5 w-50 border border-2 p-4">
      <h3 className="mb-4">Change Password</h3>

      {formik.status?.success && (
        <div className="alert alert-success">{formik.status.success}</div>
      )}
      {formik.status?.error && (
        <div className="alert alert-danger">{formik.status.error}</div>
      )}

      <form onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label htmlFor="old_password">Old Password</label>
          <input
            type="password"
            name="old_password"
            className="form-control"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.old_password}
          />
          {formik.touched.old_password && formik.errors.old_password && (
            <div className="text-danger">{formik.errors.old_password}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="new_password">New Password</label>
          <input
            type="password"
            name="new_password"
            className="form-control"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.new_password}
          />
          {formik.touched.new_password && formik.errors.new_password && (
            <div className="text-danger">{formik.errors.new_password}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="confirm_password">Confirm New Password</label>
          <input
            type="password"
            name="confirm_password"
            className="form-control"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirm_password}
          />
          {formik.touched.confirm_password && formik.errors.confirm_password && (
            <div className="text-danger">{formik.errors.confirm_password}</div>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? 'Changing...' : 'Change Password'}
        </button>
        <div className="text-center mt-2">
          <Link to="/dashboard">Back to dashboard</Link>
        </div>
      </form>
    </div>
  );
}
