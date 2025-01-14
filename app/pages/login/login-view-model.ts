import { Observable } from '@nativescript/core';
import { AuthService } from '../../services/auth.service';
import { NavigationService } from '../../services/navigation.service';

export class LoginViewModel extends Observable {
  private authService: AuthService;
  private navigationService: NavigationService;
  public email: string = '';
  public password: string = '';
  public isLoading: boolean = false;
  public errorMessage: string = '';

  constructor() {
    super();
    this.authService = AuthService.getInstance();
    this.navigationService = NavigationService.getInstance();
  }

  async onLogin() {
    if (!this.email || !this.password) {
      this.set('errorMessage', 'Please enter email and password');
      return;
    }

    try {
      this.set('isLoading', true);
      this.set('errorMessage', '');

      const user = await this.authService.login(this.email, this.password);
      this.navigationService.navigateByRole(user.role);
      
    } catch (error) {
      this.set('errorMessage', 'Login failed. Please try again.');
      console.error('Login error:', error);
    } finally {
      this.set('isLoading', false);
    }
  }
}