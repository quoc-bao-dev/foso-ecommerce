import { User } from "@/modules/auth";

export const mockLoginAPI = async (
  email: string,
  password: string
): Promise<User> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Mock validation
  if (email === "admin@example.com" && password === "password") {
    return {
      id: "1",
      name: "Admin User",
      email: "admin@example.com",
      avatar: "/image/avatar.png",
      phone: "0123456789",
      role: "admin",
      createdAt: new Date().toISOString(),
    };
  } else if (email === "user@example.com" && password === "password") {
    return {
      id: "2",
      name: "Nguyễn Văn A",
      email: "user@example.com",
      avatar: "/image/avatar.png",
      phone: "0987654321",
      role: "user",
      createdAt: new Date().toISOString(),
    };
  }

  throw new Error("Email hoặc mật khẩu không đúng");
};
