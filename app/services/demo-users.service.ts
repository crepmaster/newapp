import { Observable } from '@nativescript/core';
import { User, UserRole } from '../models/user.model';

export class DemoUsersService extends Observable {
  private static instance: DemoUsersService;
  private users: User[] = [
    {
      id: '1',
      email: 'admin@nowasted.med',
      role: UserRole.ADMIN,
      name: 'Admin User',
      phoneNumber: '+1234567890',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2',
      email: 'pharmacy1@nowasted.med',
      role: UserRole.PHARMACIST,
      name: 'Pharmacy One',
      phoneNumber: '+1234567891',
      pharmacyName: 'Pharmacy One',
      pharmacyAddress: '123 Health Street',
      licenseNumber: 'PH001',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '3',
      email: 'pharmacy2@nowasted.med',
      role: UserRole.PHARMACIST,
      name: 'Pharmacy Two',
      phoneNumber: '+1234567892',
      pharmacyName: 'Pharmacy Two',
      pharmacyAddress: '456 Medicine Avenue',
      licenseNumber: 'PH002',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '4',
      email: 'courier@nowasted.med',
      role: UserRole.COURIER,
      name: 'Fast Courier',
      phoneNumber: '+1234567893',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  private constructor() {
    super();
  }

  public static getInstance(): DemoUsersService {
    if (!DemoUsersService.instance) {
      DemoUsersService.instance = new DemoUsersService();
    }
    return DemoUsersService.instance;
  }

  getUsers(): User[] {
    return this.users;
  }

  getUserByEmail(email: string): User | null {
    return this.users.find(user => user.email === email) || null;
  }
}