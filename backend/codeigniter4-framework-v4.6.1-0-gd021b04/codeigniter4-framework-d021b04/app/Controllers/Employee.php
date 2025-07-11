<?php namespace App\Controllers;
use CodeIgniter\RESTful\ResourceController;
use App\Models\EmployeeModel;

class Employee extends ResourceController{
    protected $modelName = 'App\Models\EmployeeModel';
    protected $format = 'json';
    public function index(){
        return $this->respond($this->model->findAll());
    }

    public function show($id = null){
        $data = $this->model->find($id);
        if(!$data){
            return $this->failNotFound('Employee not found');
        }
          return $this->respond($data);
    }
    public function create(){
       
        $rules = [
            'firstname' => 'required',
            'lastname' => 'required',
            'email' => 'required|valid_email|is_unique[employees.email]',
            'phone' => 'required',
            'salary' => 'required',
            'designation' => 'required',
            'photo' => 'uploaded[photo]|is_image[photo]|mime_in[photo,image/jpg,image/jpeg,image/png]|max_size[photo,2048]',
            'joined_date' => 'required|valid_date[Y-m-d]'
        ];

        if(!$this->validate($rules)){
            return $this->fail($this->validator->getErrors());
        }

       $file = $this->request->getFile('photo');
       if($file and !$file->hasMoved()){
        $newName = $file->getRandomName();
        $file->move(WRITEPATH.'uploads',$newName);
       }
        $joinedDate = $this->request->getPost('joined_date') ?: date('Y-m-d'); 
         $data = [
            'firstname' => $this->request->getPost('firstname'),
            'lastname' => $this->request->getPost('lastname'),
            'email' => $this->request->getPost('email'),
            'phone' => $this->request->getPost('phone'),
            'salary' => $this->request->getPost('salary'),
            'designation' => $this->request->getPost('designation'),
            'photo' => $newName || null,
            'joined_date' =>$joinedDate
         ];
         $this->model->save($data);
         return $this->respondCreated(['message'=>'Employee Created Successfully']);
    }

    public function update($id = null){
        $data = $this->request->getJSON(true);
        if(!$this->model->update($id,$data)){
            return $this->failValidationErrors($this->model->errors());
        }
        return $this->respond(['message'=>'Employee Updated']);

    }

    public function delete($id = null){
        if(!$this->model->find($id)){
            return $this->failNotFound('Employee Not Found');
        }

        $this->model->delete($id);

        return $this->respondDeleted(['message'=>'Employee Deleted']);

    }
}