import axios from "axios";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";

export function AddEmployee() {
  const navigate = useNavigate();
  
    const formik = useFormik({
    initialValues: {
      ename: '',
      job: '',
      hiredate: '',
      salary: '',
      deptno: '',
      mail_id: '',
      photo: null,
    },
    validationSchema: yup.object({
      ename: yup.string().required('Employee name is required'),
      job: yup.string().required('Job is required'),
      hiredate: yup.date().required('Hire date is required'),
      salary: yup.number().required('Salary is required'),
      deptno: yup.number().required('Department number is required'),
      mail_id: yup.string().email('Invalid email').required('Email is required'),
    }),
    onSubmit: async (formData, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      try {
        if (!formData.photo) {
          alert("Please select a photo.");
          setSubmitting(false);
          return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append('ename', formData.ename);
        formDataToSend.append('job', formData.job);
        formDataToSend.append('hiredate', formData.hiredate);
        formDataToSend.append('salary', formData.salary);
        formDataToSend.append('deptno', formData.deptno);
        formDataToSend.append('mail_id', formData.mail_id);
        formDataToSend.append('photo', formData.photo);

        const response = await axios.post('http://localhost:8080/api/employees', formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' },
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
          <dt>Employee Name</dt>
          <dd>
            <input type="text" name="ename" className="form-control" onChange={formik.handleChange} value={formik.values.ename} />
            {formik.touched.ename && formik.errors.ename && <div className="text-danger">{formik.errors.ename}</div>}
          </dd>

          <dt>Job</dt>
          <dd>
            <select name="job" className="form-select" onChange={formik.handleChange} value={formik.values.job}>
              <option value="">Select Job</option>
              <option value="CLERK">CLERK</option>
              <option value="SALESMAN">SALESMAN</option>
              <option value="MANAGER">MANAGER</option>
              <option value="ANALYST">ANALYST</option>
              <option value="PRESIDENT">PRESIDENT</option>
            </select>
            {formik.touched.job && formik.errors.job && <div className="text-danger">{formik.errors.job}</div>}
          </dd>

          <dt>Hire Date</dt>
          <dd>
            <input type="date" name="hiredate" className="form-control" onChange={formik.handleChange} value={formik.values.hiredate} />
            {formik.touched.hiredate && formik.errors.hiredate && <div className="text-danger">{formik.errors.hiredate}</div>}
          </dd>

          <dt>Salary</dt>
          <dd>
            <input type="number" name="salary" className="form-control" onChange={formik.handleChange} value={formik.values.sal} />
            {formik.touched.salary && formik.errors.salary && <div className="text-danger">{formik.errors.salary}</div>}
          </dd>

          <dt>Department Number</dt>
          <dd>
            <select name="deptno" className="form-select" onChange={formik.handleChange} value={formik.values.deptno}>
              <option value="">Select Department</option>
              <option value="10">10 - ACCOUNTING</option>
              <option value="20">20 - RESEARCH</option>
              <option value="30">30 - SALES</option>
              <option value="40">40 - OPERATIONS</option>
            </select>
            {formik.touched.deptno && formik.errors.deptno && <div className="text-danger">{formik.errors.deptno}</div>}
          </dd>

          <dt>Email (Mail ID)</dt>
          <dd>
            <input type="email" name="mail_id" className="form-control" onChange={formik.handleChange} value={formik.values.mail_id} />
            {formik.touched.mail_id && formik.errors.mail_id && <div className="text-danger">{formik.errors.mail_id}</div>}
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
