import { Employee, Reimbursement } from "../entities";

export interface EmployeeService {
  retrieveAllEmployees(): Promise<Employee[]>;

  retrieveAllReimbursements(): Promise<Reimbursement[]>;

  retrievePendingReimbursements(): Promise<Reimbursement[]>;

  logEmployee(employee: Employee): Promise<Employee>;
}
