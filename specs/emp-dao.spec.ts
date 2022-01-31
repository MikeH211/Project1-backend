import { EmployeeDao } from "../daos/emp-dao";
import { EmployeeDaoAzure } from "../daos/emp-dao-impl";
import { EmployeeService } from "../services/employee-service";
import { EmployeeServiceImpl } from "../services/employee-service-impl";
import { Employee, Reimbursement } from "../entities";

describe("Reimbursements DAO Tests", () => {
  const employeeDao: EmployeeDao = new EmployeeDaoAzure();
  const employeeService: EmployeeService = new EmployeeServiceImpl(employeeDao);
  let savedEmployee: Employee = null;
  let savedReimbursement: Reimbursement = null;

  let testEmployee: Employee = {
    id: "",
    username: "",
    password: "",
    fname: "Tambouri",
    lname: "Purinski",
    isManager: false,
    reimbursements: [],
  };
  let testReimbursement: Reimbursement = {
    id: "",
    amount: 0,
    reason: "",
    status: "",
    message: "",
    requestDate: "",
  };

  it("Should create employee", async () => {
    const returnedEmployee: Employee = await employeeDao.createEmployee(
      testEmployee
    );
    expect(returnedEmployee.id).toBeTruthy();
    savedEmployee = returnedEmployee;
  });

  it("Should get all Employees", async () => {
    const emp1: Employee = {
      id: "",
      username: "",
      password: "",
      fname: "Jirak",
      lname: "Toisseaut",
      isManager: false,
      reimbursements: [],
    };
    const emp2: Employee = {
      id: "",
      username: "",
      password: "",
      fname: "Babeler",
      lname: "Price",
      isManager: false,
      reimbursements: [],
    };
    const emp3: Employee = {
      id: "",
      username: "",
      password: "",
      fname: "Toontatoo",
      lname: "Akoot",
      isManager: false,
      reimbursements: [],
    };
    await employeeDao.createEmployee(emp1);
    await employeeDao.createEmployee(emp2);
    await employeeDao.createEmployee(emp3);

    const employees: Employee[] = await employeeDao.getAllEmployees();
    expect(employees.length).toBeGreaterThan(3);
  });

  it("Should retrieve all reimbursements", async () => {
    const retrievedReimbursements: Reimbursement[] =
      await employeeService.retrieveAllReimbursements();
    expect(retrievedReimbursements).toBeDefined;
  });

  it("Should retrieve all pending reimbursements", async () => {
    const retievedPendingReimbursements: Reimbursement[] =
      await employeeService.retrievePendingReimbursements();
    expect(retievedPendingReimbursements).toBeDefined;
  });

  it("Should get employee by ID", async () => {
    const employee: Employee = await employeeDao.getEmployeeById(
      savedEmployee.id
    );
    expect(employee).toBeDefined;
  });
});
