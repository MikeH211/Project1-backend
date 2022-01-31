import { Employee, Reimbursement } from "../entities";

export interface EmployeeDao {
  //Create
  createEmployee(employee: Employee): Promise<Employee>;

  addReimbursementToEmployee(
    id: string,
    reimbursement: Reimbursement
  ): Promise<Employee>;

  // Read
  getAllEmployees(): Promise<Employee[]>;

  getAllReimbursements(): Promise<Reimbursement[]>;

  // getReimbursementsByDate(date: string): Promise<Reimbursement[]>;

  getEmployeeByUsername(username: string): Promise<Employee>;

  getReimbursementById(id: string): Promise<Reimbursement>;

  getAllReimbursementsByEmployeeId(id: string): Promise<Reimbursement[]>;

  getEmployeeById(id: string): Promise<Employee>;
  //Update

  updateReimbursement(id: string, status: string): Promise<Reimbursement>;

  updateReimbursementMessage(
    id: string,
    message: string
  ): Promise<Reimbursement>;

  updateEmployee(employee: Employee): Promise<Employee>;
}
