<?php namespace App\Controllers;
use CodeIgniter\RESTful\ResourceController;
use App\Models\EmployeeModel;

class Employee extends ResourceController{
    protected $modelName = 'App\Models\EmployeeModel';
    protected $format = 'json';
    public function index(){
        return $this->respond($this->model->findAll());
    }

    public function show($empno = null){
        $data = $this->model->find($empno);
        if(!$data){
            return $this->failNotFound('Employee not found');
        }
          return $this->respond($data);
    }
    public function create(){
       
        $rules = [
            'ename' => 'required',
            'job' => 'required',
            'hiredate' => 'required|valid_date[Y-m-d]',
            'salary' => 'required',
            'deptno' => 'required',
            'mail_id' => 'required|valid_email|is_unique[employees.mail_id]',
            'photo' => 'uploaded[photo]|is_image[photo]|mime_in[photo,image/jpg,image/jpeg,image/png]|max_size[photo,2048]',
            
        ];

        if(!$this->validate($rules)){
            return $this->fail($this->validator->getErrors());
        }

       $photoName = null;
        if ($file && !$file->hasMoved()) {
            $photoName = $file->getRandomName();
            $file->move(FCPATH . 'uploads', $photoName);
        }

        $hiredate = $this->request->getPost('hiredate') ?: date('Y-m-d'); 
         $data = [
            'ename' => $this->request->getPost('ename'),
            'job' => $this->request->getPost('job'),
            'hiredate' => $hiredate,
            'salary' => $this->request->getPost('salary'),
            'deptno' => $this->request->getPost('deptno'),
            'mail_id' => $this->request->getPost('mail_id'),
            'photo' => $photoName|| null,
         ];
         $this->model->save($data);
         return $this->respondCreated(['message'=>'Employee Created Successfully']);
    }

    public function update($empno = null){
        $data = $this->request->getJSON(true);
        if(!$this->model->update($empno,$data)){
            return $this->failValidationErrors($this->model->errors());
        }
        return $this->respond(['message'=>'Employee Updated']);

    }

    public function delete($empno = null){
        if(!$this->model->find($empno)){
            return $this->failNotFound('Employee Not Found');
        }

        $this->model->delete($empno);

        return $this->respondDeleted(['message'=>'Employee Deleted']);

    }
}