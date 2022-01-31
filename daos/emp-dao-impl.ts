import { Employee, Reimbursement } from "../entities";
import { EmployeeDao } from "./emp-dao";
import { CosmosClient } from "@azure/cosmos";
import { v4 } from "uuid";
import { ResourceNotFoundError } from "../error-handles";
import e from "cors";

export class EmployeeDaoAzure implements EmployeeDao {
  private client = new CosmosClient(process.env.COSMOS_CONNECTION);
  private database = this.client.database("reimbursementapp");
  private container = this.database.container("employees");
  private containerB = this.database.container("reimbursements");

  async createEmployee(employee: Employee): Promise<Employee> {
    employee.id = v4();
    for (let i = 0; i < employee.reimbursements.length; i++) {
      employee.reimbursements[i].id = v4();
    }
    const response = await this.container.items.create<Employee>(employee);
    return response.resource;
  }

  async addReimbursementToEmployee(
    id: string,
    reimbursement: Reimbursement
  ): Promise<Employee> {
    const employee = await this.getEmployeeById(id);
    reimbursement.id = v4();
    reimbursement.amount = Number(reimbursement.amount);
    employee.reimbursements.push(reimbursement);
    const response = await this.container.items.upsert<Employee>(employee);
    return response.resource;
  }

  async getEmployeeByUsername(username: string): Promise<Employee> {
    const response = await this.container.items.readAll<Employee>().fetchAll();
    const employees: Employee[] = response.resources;
    return employees.find((e) => e.username === username);
  }

  async getAllEmployees(): Promise<Employee[]> {
    const response = await this.container.items.readAll<Employee>().fetchAll();
    return response.resources;
  }

  async getEmployeeById(id: string): Promise<Employee> {
    const employees: Employee[] = await this.getAllEmployees();
    const employee: Employee | undefined = employees.find((a) => a.id === id);
    return employee;
  }

  async getAllReimbursements(): Promise<Reimbursement[]> {
    const response = await this.containerB.items
      .readAll<Reimbursement>()
      .fetchAll();
    return response.resources;
  }

  async getReimbursementById(id: string): Promise<Reimbursement> {
    const reimbursements: Reimbursement[] = await this.getAllReimbursements();
    const reimbursement: Reimbursement | undefined = reimbursements.find(
      (a) => a.id === id
    );
    if (!reimbursement) {
      throw new ResourceNotFoundError(`The resource with ${id} was not found`);
    }
    return reimbursement;
  }

  async getAllReimbursementsByEmployeeId(id: string): Promise<Reimbursement[]> {
    const employees: Employee[] = await this.getAllEmployees();
    for (let i = 0; i < employees.length; i++) {
      if (employees[i].id === id) {
        return employees[i].reimbursements;
      }
    }
  }

  // updates reimbursement status, works great
  async updateReimbursement(
    id: string,
    status: string
  ): Promise<Reimbursement> {
    const employees: Employee[] = await this.getAllEmployees();
    for (let i = 0; i < employees.length; i++) {
      for (let a = 0; a < employees[i].reimbursements.length; a++) {
        if (employees[i].reimbursements[a].id === id) {
          employees[i].reimbursements[a].status = status;
          await this.updateEmployee(employees[i]);
          return employees[i].reimbursements[a];
        }
      }
    }
  }
  //updates reimbursement message
  async updateReimbursementMessage(
    id: string,
    message: string
  ): Promise<Reimbursement> {
    const employees: Employee[] = await this.getAllEmployees();
    for (let i = 0; i < employees.length; i++) {
      for (let a = 0; a < employees[i].reimbursements.length; a++) {
        if (employees[i].reimbursements[a].id === id) {
          employees[i].reimbursements[a].message = message;
          await this.updateEmployee(employees[i]);
          return employees[i].reimbursements[a];
        }
      }
    }
  }

  // this works
  async updateEmployee(employee: Employee): Promise<Employee> {
    const response = await this.container.items.upsert<Employee>(employee);
    const { id, username, password, fname, lname, isManager, reimbursements } =
      response.resource;
    return { id, username, password, fname, lname, isManager, reimbursements };
  }
}
