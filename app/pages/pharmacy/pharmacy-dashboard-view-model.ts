import { Observable, Frame } from '@nativescript/core';
import { AuthService } from '../../services/auth.service';

export class PharmacyDashboardViewModel extends Observable {
    private authService: AuthService;
    public pharmacyName: string;
    public recentActivities: any[];
    public availableMedicines: number = 156;
    public pendingExchanges: number = 8;
    public expiringSoon: number = 12;
    public totalExchanges: number = 45;

    constructor() {
        super();
        this.authService = AuthService.getInstance();
        const currentUser = this.authService.getCurrentUser();
        this.pharmacyName = currentUser?.pharmacyName || 'My Pharmacy';
        this.recentActivities = [
            { title: 'New medicine added', timestamp: '2 hours ago' },
            { title: 'Exchange request received', timestamp: '4 hours ago' },
            { title: 'Medicine updated', timestamp: '1 day ago' }
        ];
    }

    goBack() {
        Frame.topmost().goBack();
    }

    onAddMedicine() {
        try {
            Frame.topmost().navigate({
                moduleName: 'pages/pharmacy/medicine/add-medicine-page'
            });
        } catch (error) {
            console.error('Navigation error:', error);
        }
    }

    onViewExchanges() {
        try {
            Frame.topmost().navigate({
                moduleName: 'pages/pharmacy/exchanges/exchanges-list-page'
            });
        } catch (error) {
            console.error('Navigation error:', error);
        }
    }

    onScanMedicine() {
        try {
            Frame.topmost().navigate({
                moduleName: 'pages/pharmacy/medicine/scan-medicine-page'
            });
        } catch (error) {
            console.error('Navigation error:', error);
        }
    }

    onLogout() {
        try {
            this.authService.logout();
            Frame.topmost().navigate({
                moduleName: 'pages/login/login-page',
                clearHistory: true
            });
        } catch (error) {
            console.error('Logout error:', error);
        }
    }
}