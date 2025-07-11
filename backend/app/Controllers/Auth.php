<?php namespace App\Controllers;

use App\Models\UserModel;
use CodeIgniter\RESTful\ResourceController;
use Firebase\JWT\JWT;

class Auth extends ResourceController
{
    private $key;

    public function __construct()
    {
        $this->key = 'd6f7a94c5e1b8e81f842a87d72b7593f8434c5a4b9e5b0b30f2aebd5c4839c52';
        helper(['form']);
    }

    public function signup()
    {
        $rules = [
            'name'     => 'required',
            'email'    => 'required|valid_email|is_unique[users.email]',
            'password' => 'required|min_length[6]',
        ];

        if (!$this->validate($rules)) {
            return $this->fail($this->validator->getErrors());
        }

        $userModel = new UserModel();
        $data = [
            'name'     => $this->request->getVar('name'),
            'email'    => $this->request->getVar('email'),
            'password' => password_hash($this->request->getVar('password'), PASSWORD_DEFAULT),
        ];

        $userModel->save($data);

        return $this->respondCreated(['message' => 'User Created Successfully']);
    }

    public function login()
    {
        // Get raw JSON input as an associative array
        $data = $this->request->getJSON(true);

        // Validation rules
        $rules = [
            'email'    => 'required|valid_email',
            'password' => 'required',
        ];

        // Validate JSON data
        if (!$this->validateData($data, $rules)) {
            return $this->fail($this->validator->getErrors());
        }

        // Load user by email
        $userModel = new UserModel();
        $user = $userModel->where('email', $data['email'])->first();

        // Verify user and password
        if (!$user || !password_verify($data['password'], $user['password'])) {
            return $this->failUnauthorized('Invalid email or password');
        }

        // JWT payload
        $payload = [
            'iat'   => time(),
            'exp'   => time() + 3600, // Token valid for 1 hour
            'uid'   => $user['id'],
            'email' => $user['email'],
        ];

        // Encode token using your secret key
        $token = JWT::encode($payload, $this->key, 'HS256');

        // Respond with token
        return $this->respond([
            'message' => 'Login Successful',
            'token'   => $token,
        ]);
    }

}
