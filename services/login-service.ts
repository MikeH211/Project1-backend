import { EmployeeDao } from "../daos/emp-dao";
import { Employee } from "../entities";

export interface LoginService {
  loginWithUsernamePassword(
    username: string,
    password: string
  ): Promise<Employee>;
}

export class LoginServiceImpl implements LoginService {
  private employeeDao: EmployeeDao;

  constructor(employeeDao: EmployeeDao) {
    this.employeeDao = employeeDao;
  }

  async loginWithUsernamePassword(username: string, password: string) {
    const employee: Employee = await this.employeeDao.getEmployeeByUsername(
      username
    );

    if (employee.password !== password) {
      throw new Error("Incorrect Password");
    } else {
      return employee;
    }
  }
}
