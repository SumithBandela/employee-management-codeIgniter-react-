<?php namespace App\Models;
use CodeIgniter\Model;

class EmployeeModel extends Model{
    protected $table = "employees";
    protected $primaryKey = "empno";
    protected $allowedFields = ['ename','job','salary','hiredate','deptno','mail_id','photo'];
    protected $useTimestamps = true;
}