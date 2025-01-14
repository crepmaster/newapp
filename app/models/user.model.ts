export enum UserRole {
  ADMIN = 'admin',
  PHARMACIST = 'pharmacist',
  COURIER = 'courier'
}

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
  phoneNumber: string;
  pharmacyName?: string;
  pharmacyAddress?: string;
  licenseNumber?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}