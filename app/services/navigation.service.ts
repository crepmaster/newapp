import { Frame } from '@nativescript/core';
import { UserRole } from '../models/user.model';

export class NavigationService {
  private static instance: NavigationService;

  private constructor() {}

  public static getInstance(): NavigationService {
    if (!NavigationService.instance) {
      NavigationService.instance = new NavigationService();
    }
    return NavigationService.instance;
  }

  navigateByRole(role: UserRole): void {
    switch (role) {
      case UserRole.ADMIN:
        Frame.topmost().navigate({
          moduleName: 'pages/admin/admin-dashboard-page'
        });
        break;
      case UserRole.PHARMACIST:
        Frame.topmost().navigate({
          moduleName: 'pages/pharmacy/pharmacy-dashboard-page'
        });
        break;
      case UserRole.COURIER:
        Frame.topmost().navigate({
          moduleName: 'pages/courier/courier-dashboard-page'
        });
        break;
      default:
        console.error('Unknown role:', role);
    }
  }
}