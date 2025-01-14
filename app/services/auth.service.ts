import { Observable } from '@nativescript/core';
import { User, UserRole } from '../models/user.model';
import { DemoUsersService } from './demo-users.service';

export class AuthService extends Observable {
  private static instance: AuthService;
  private currentUser: User | null = null;
  private demoUsersService: DemoUsersService;

  private constructor() {
    super();
    this.demoUsersService = DemoUsersService.getInstance();
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async login(email: string, password: string): Promise<User> {
    try {
      // For demo purposes, we'll accept any password
      const user = this.demoUsersService.getUserByEmail(email);
      
      if (!user) {
        throw new Error('User not found');
      }

      this.currentUser = user;
      return user;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    this.currentUser = null;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }
}