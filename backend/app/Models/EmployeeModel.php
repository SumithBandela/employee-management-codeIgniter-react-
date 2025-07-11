<?php namespace App\Models;
use CodeIgniter\Model;

class EmployeeModel extends Model{
    protected $table = "employees";
    protected $primaryKey = "id";
    protected $allowedFields = ['firstname','lastname','email','phone','photo','salary','designation','joined_date'];
    protected $useTimestamps = true;
}