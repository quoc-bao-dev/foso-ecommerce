export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  role: "user" | "admin";
  createdAt: string;
}
