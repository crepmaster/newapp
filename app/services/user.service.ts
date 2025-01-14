import { Observable } from '@nativescript/core';
import { User, UserRole } from '../models/user.model';
import { DemoUsersService } from './demo-users.service';

export class UserService extends Observable {
  private static instance: UserService;
  private users: User[] = [];

  private constructor() {
    super();
    // Initialize with demo users for testing
    this.users = DemoUsersService.getInstance().getUsers();
  }

  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  async getUsers(): Promise<User[]> {
    return this.users;
  }

  async getUserById(id: string): Promise<User | null> {
    return this.users.find(user => user.id === id) || null;
  }

  async createUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.users.push(newUser);
    this.notifyPropertyChange('users', this.users);
    return newUser;
  }

  async updateUser(id: string, userData: Partial<User>): Promise<User | null> {
    const index = this.users.findIndex(user => user.id === id);
    if (index === -1) return null;

    const updatedUser: User = {
      ...this.users[index],
      ...userData,
      updatedAt: new Date()
    };

    this.users[index] = updatedUser;
    this.notifyPropertyChange('users', this.users);
    return updatedUser;
  }

  async deleteUser(id: string): Promise<boolean> {
    const index = this.users.findIndex(user => user.id === id);
    if (index === -1) return false;

    this.users.splice(index, 1);
    this.notifyPropertyChange('users', this.users);
    return true;
  }

  async updateProfile(id: string, profileData: Partial<User>): Promise<User | null> {
    // This method is specifically for users updating their own profiles
    const allowedFields = ['name', 'phoneNumber', 'pharmacyName', 'pharmacyAddress'];
    const filteredData = Object.keys(profileData)
      .filter(key => allowedFields.includes(key))
      .reduce((obj, key) => {
        obj[key] = profileData[key];
        return obj;
      }, {});

    return this.updateUser(id, filteredData);
  }
}