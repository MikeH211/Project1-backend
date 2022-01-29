import { EmployeeDao } from "../daos/emp-dao";
import { EmployeeDaoAzure } from "../daos/emp-dao-impl";
import { Employee, Reimbursement } from "../entities";

describe("Reimbursements DAO Tests", () => {
  const employeeDao: EmployeeDao = new EmployeeDaoAzure();

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
    requestDate: "0",
  };

  it("Should create employee", async () => {
    const returnedEmployee: Employee = await employeeDao.createEmployee(
      testEmployee
    );
    expect(returnedEmployee.id).toBeTruthy();
    //testEmployee = returnedEmployee;   (maybe uncomment later cause it might be useful for the rest of the tests,
    // we just didn't want to code in advance too much)
  });

  it("Should create reimbursement", async () => {
    const returnedReimbursement: Reimbursement =
      await employeeDao.createReimbursement(testReimbursement);
    expect(returnedReimbursement.id).toBeTruthy();
    testReimbursement = returnedReimbursement;
  });

  it("Should get an employee by username", async () => {
    const employee = await employeeDao.getEmployeeByUsername("kingnothing21");
    expect(employee.isManager).toBe(true);
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

  it("Should get all Reimbursements", async () => {
    const reimb1: Reimbursement = {
      id: "",
      amount: 240,
      reason: "work trip",
      status: "",
      message: "",
      requestDate: "0",
    };
    const reimb2: Reimbursement = {
      id: "",
      amount: 158,
      reason: "bought work supplies",
      status: "",
      message: "",
      requestDate: "3",
    };
    const reimb3: Reimbursement = {
      id: "",
      amount: 477,
      reason: "took clients to dinner",
      status: "",
      message: "",
      requestDate: "4",
    };
    await employeeDao.createReimbursement(reimb1);
    await employeeDao.createReimbursement(reimb2);
    await employeeDao.createReimbursement(reimb3);

    const reimbursements: Reimbursement[] =
      await employeeDao.getAllReimbursements();
    expect(reimbursements.length).toBeGreaterThan(3);
  });

  it("Should get Reimbursements for that date", async () => {
    const reimbursements: Reimbursement[] =
      await employeeDao.getReimbursementsByDate("0");
    expect(
      reimbursements.some((e) => {
        if (e.requestDate === testReimbursement.requestDate) {
          return true;
        }
      })
    ).toEqual(true);
  });
});
