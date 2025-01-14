import { Observable, Frame } from '@nativescript/core';
import { AuthService } from '../../services/auth.service';

export class AdminDashboardViewModel extends Observable {
    private authService: AuthService;

    constructor() {
        super();
        this.authService = AuthService.getInstance();
    }

    onManageUsers() {
        console.log('Attempting to navigate to user list');
        try {
            Frame.topmost().navigate({
                moduleName: 'pages/admin/user-list/user-list-page',
                clearHistory: false
            });
        } catch (error) {
            console.error('Navigation error:', error);
        }
    }

    onViewReports() {
        console.log('Navigate to Reports');
        // Implement navigation to reports
    }

    onSystemSettings() {
        console.log('Navigate to Settings');
        // Implement navigation to settings
    }

    onLogout() {
        this.authService.logout();
        Frame.topmost().navigate({
            moduleName: 'pages/login/login-page',
            clearHistory: true
        });
    }
}