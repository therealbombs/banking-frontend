export interface User {
  customerId: string;
  firstName: string;
  lastName: string;
  type: string;
  preferredLanguage: string;
  lastLogin: string;
  token: string;
}

export interface Account {
  accountNumber: string;
  name: string;
  type: string;
  primary: boolean;
  attributes: Record<string, string>;
}