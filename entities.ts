export interface Employee {
  id: string;
  username: string;
  password: string;
  fname: string;
  lname: string;
  isManager: boolean;
  reimbursements: Reimbursement[];
}

export interface Reimbursement {
  id: string;
  amount: number;
  reason: string;
  status: string;
  message: string;
  requestDate: string;
}
