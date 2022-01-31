import { EmployeeDao } from "../daos/emp-dao";
import { Employee, Reimbursement } from "../entities";
import { EmployeeService } from "./employee-service";

export class EmployeeServiceImpl implements EmployeeService {
  private employeeDao: EmployeeDao;

  constructor(employeeDao: EmployeeDao) {
    this.employeeDao = employeeDao;
  }

  logEmployee(employee: Employee): Promise<Employee> {
    return this.employeeDao.createEmployee(employee);
  }

  retrieveAllEmployees(): Promise<Employee[]> {
    return this.employeeDao.getAllEmployees();
  }

  async retrieveAllReimbursements(): Promise<Reimbursement[]> {
    const employees: Employee[] = await this.employeeDao.getAllEmployees();
    let updatedReimbursements: Reimbursement[] = [];
    for (let i = 0; i < employees.length; i++) {
      for (let a = 0; a < employees[i].reimbursements.length; a++) {
        updatedReimbursements.push(employees[i].reimbursements[a]);
      }
    }
    return updatedReimbursements;
  }

  async retrievePendingReimbursements(): Promise<Reimbursement[]> {
    const reimbursements = await this.retrieveAllReimbursements();
    let pendingReimbursements = [];
    for (let i = 0; i < reimbursements.length; i++) {
      if (reimbursements[i].status == "pending") {
        pendingReimbursements.push(reimbursements[i]);
      }
    }
    return pendingReimbursements;
  }
}
