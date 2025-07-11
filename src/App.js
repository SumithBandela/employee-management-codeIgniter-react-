import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './login';
import { Dashboard } from './dashboard';
import { AddEmployee } from './addemployee';
import { EditEmployee } from './editemployee';
import { DeleteEmployee } from './deleteemployee';
import { Signup } from './signup';
import { PrivateRoute } from './privateroute';
function App() {
  return (
    <BrowserRouter>
     <Routes>
      <Route path='/' element={<Login />} />
      <Route path='login' element={<Login />} />
      <Route path='signup' element={<Signup />} />

      <Route path='dashboard' element={
        <PrivateRoute><Dashboard /></PrivateRoute>
      } />

      <Route path='dashboard/add' element={
        <PrivateRoute><AddEmployee /></PrivateRoute>
      } />

      <Route path='dashboard/edit/:id' element={
        <PrivateRoute><EditEmployee /></PrivateRoute>
      } />

      <Route path='dashboard/delete/:id' element={
        <PrivateRoute><DeleteEmployee /></PrivateRoute>
      } />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
