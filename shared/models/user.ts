export interface User {
  id: string;
  email: string;
  passwordHash: string;
  firstName?: string;
  lastName?: string;
  companyName?: string;
  phone?: string;
  role: 'user' | 'admin';
  isEmailVerified: boolean;
  avatarUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
