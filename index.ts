import express from "express";
import { EmployeeDao } from "./daos/emp-dao";
import { EmployeeDaoAzure } from "./daos/emp-dao-impl";
import { Employee, Reimbursement } from "./entities";
import { EmployeeService } from "./services/employee-service";
import { EmployeeServiceImpl } from "./services/employee-service-impl";
import cors from "cors";
import { LoginService, LoginServiceImpl } from "./services/login-service";
import logMiddleware from "./middleware/logger-middleware";

const app = express();
app.use(express.json());
app.use(cors());
app.use(logMiddleware);

const employeeDao: EmployeeDao = new EmployeeDaoAzure();
const employeeService: EmployeeService = new EmployeeServiceImpl(employeeDao);
const loginService: LoginService = new LoginServiceImpl(employeeDao);

app.post("/employees", async (req, res) => {
  const employee: Employee = req.body;
  const savedEmployee: Employee = await employeeService.logEmployee(employee);
  res.status(201);
  res.send(savedEmployee);
});

app.get("/employees", async (req, res) => {
  const employees: Employee[] = await employeeService.retrieveAllEmployees();
  res.status(200);
  res.send(employees);
});

app.get("/employees/:id", async (req, res) => {
  const { id } = req.params;
  const employee: Employee = await employeeDao.getEmployeeById(id);
  res.send(employee);
});

app.get("/reimbursements", async (req, res) => {
  const reimbursements: Reimbursement[] =
    await employeeService.retrieveAllReimbursements();
  res.status(200);
  res.send(reimbursements);
});

app.get("/pendingreimbursements", async (req, res) => {
  const reimbursements: Reimbursement[] =
    await employeeService.retrievePendingReimbursements();
  res.status(200);
  res.send(reimbursements);
});

app.get("/reimbursements/id/:id", async (req, res) => {
  const { id } = req.params;
  const reimbursement: Reimbursement = await employeeDao.getReimbursementById(
    id
  );
  res.send(reimbursement);
});

app.get("/employees/:id/reimbursements", async (req, res) => {
  const { id } = req.params;
  const reimbursements: Reimbursement[] =
    await employeeDao.getAllReimbursementsByEmployeeId(id);
  res.status(200);
  res.send(reimbursements);
});

app.patch("/login", async (req, res) => {
  try {
    const body: { username: string; password: string } = req.body;
    const employee: Employee = await loginService.loginWithUsernamePassword(
      body.username,
      body.password
    );
    res.send(employee);
  } catch (error) {
    res.status(404);
    res.send("Incorrect username or password");
  }
});
//update reimburusement status, works great
app.patch("/reimbursements/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const reimbursement = await employeeDao.updateReimbursement(id, status);
  res.send(reimbursement);
});

// updates reimbursement message
app.patch("/reimbursementsmessage/:id", async (req, res) => {
  const { id } = req.params;
  const { message } = req.body;
  const reimbursement = await employeeDao.updateReimbursementMessage(
    id,
    message
  );
  res.send(reimbursement);
});

// adds a reimbursement to an employee
app.patch("/employees/:id", async (req, res) => {
  const { id } = req.params;
  const reimbursement = req.body;
  const employee: Employee = await employeeDao.addReimbursementToEmployee(
    id,
    reimbursement
  );
  res.send(employee);
});

// updates an employee with the provided id (this works)
app.put("/employees/:id", async (req, res) => {
  const { id } = req.params;
  const employee = req.body;
  const updatedEmployee = await employeeDao.updateEmployee(employee);
  res.send(updatedEmployee);
});

app.listen(5000, () => console.log("App started"));
