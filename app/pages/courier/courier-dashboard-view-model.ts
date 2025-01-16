import { Observable, Frame, EventData, View } from '@nativescript/core';
import { AuthService } from '../../services/auth.service';

export class CourierDashboardViewModel extends Observable {
    private authService: AuthService;
    public courierName: string;
    public activeDeliveries: any[];
    public pendingPickups: number = 3;
    public completedToday: number = 7;

    constructor() {
        super();
        this.authService = AuthService.getInstance();
        const currentUser = this.authService.getCurrentUser();
        this.courierName = currentUser?.name || 'Courier';
        this.activeDeliveries = [
            {
                pickupLocation: 'Pharmacy One',
                deliveryLocation: 'Pharmacy Two',
                status: 'Pending Pickup'
            },
            {
                pickupLocation: 'Pharmacy Three',
                deliveryLocation: 'Pharmacy Four',
                status: 'In Transit'
            }
        ];
    }

    goBack() {
        Frame.topmost().goBack();
    }

    onLogout() {
        this.authService.logout();
        Frame.topmost().navigate({
            moduleName: 'pages/login/login-page',
            clearHistory: true
        });
    }

    onNewDelivery() {
        alert('New Delivery button tapped'); // Debug alert
        Frame.topmost().navigate({
            moduleName: 'pages/courier/delivery/delivery-page'
        });
    }

    onViewHistory() {
        Frame.topmost().navigate({
            moduleName: 'pages/courier/delivery/history-page'
        });
    }

    onUpdateDelivery(args: EventData) {
        try {
            alert('Update button tapped'); // Debug alert
            const button = args.object as View;
            const delivery = button.bindingContext;
            
            console.log('Delivery data:', delivery); // Debug log
            
            if (!delivery) {
                alert('No delivery data found'); // Debug alert
                return;
            }

            Frame.topmost().navigate({
                moduleName: 'pages/courier/delivery/update-status-page',
                context: { delivery }
            });
        } catch (error) {
            alert('Error in onUpdateDelivery: ' + error); // Debug alert
            console.error('Error in onUpdateDelivery:', error);
        }
    }
}