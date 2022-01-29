import { EmployeeDao } from "../daos/emp-dao";
import { LoginService, LoginServiceImpl } from "../services/login-service";
import { Employee, Reimbursement } from "../entities";

describe("Login Service Tests", () => {
  const employeeDaoStub: EmployeeDao = {
    async getEmployeeByUsername(username: string): Promise<Employee> {
      return {
        id: "",
        username: "deuhofdf21",
        password: "rekbrf",
        fname: "Tony",
        lname: "Scoolatini",
        isManager: true,
        reimbursements: [],
      };
    },
    createEmployee: function (employee: Employee): Promise<Employee> {
      throw new Error("Function not implemented.");
    },
    createReimbursement: function (
      reimbursement: Reimbursement
    ): Promise<Reimbursement> {
      throw new Error("Function not implemented.");
    },
    addReimbursementToEmployee: function (
      id: string,
      reimbursement: Reimbursement
    ): Promise<Employee> {
      throw new Error("Function not implemented.");
    },
    getAllEmployees: function (): Promise<Employee[]> {
      throw new Error("Function not implemented.");
    },
    getAllReimbursements: function (): Promise<Reimbursement[]> {
      throw new Error("Function not implemented.");
    },
    getReimbursementsByDate: function (date: string): Promise<Reimbursement[]> {
      throw new Error("Function not implemented.");
    },
    getReimbursementById: function (id: string): Promise<Reimbursement> {
      throw new Error("Function not implemented.");
    },
    getAllReimbursementsByEmployeeId: function (
      id: string
    ): Promise<Reimbursement[]> {
      throw new Error("Function not implemented.");
    },
    getEmployeeById: function (id: string): Promise<Employee> {
      throw new Error("Function not implemented.");
    },
    updateReimbursement: function (
      id: string,
      status: string
    ): Promise<Reimbursement> {
      throw new Error("Function not implemented.");
    },
    updateEmployee: function (employee: Employee): Promise<Employee> {
      throw new Error("Function not implemented.");
    },
  };

  const loginService: LoginService = new LoginServiceImpl(employeeDaoStub);

  it("should throw an error if password or username does not match", async () => {
    try {
      await loginService.loginWithUsernamePassword("deuhofdf21", "ryehf");
      fail();
    } catch (error) {
      expect(error.message).toBe("Incorrect Password");
    }
  });
});
