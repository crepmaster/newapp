import { Observable, Frame } from '@nativescript/core';

export class DeliveryViewModel extends Observable {
    public pickupLocation: string = '';
    public deliveryLocation: string = '';
    public packageDetails: string = '';

    constructor() {
        super();
    }

    goBack() {
        Frame.topmost().goBack();
    }

    onStartDelivery() {
        if (!this.validateForm()) return;

        // Implement delivery creation logic
        console.log('Starting delivery:', {
            pickupLocation: this.pickupLocation,
            deliveryLocation: this.deliveryLocation,
            packageDetails: this.packageDetails
        });

        alert('Delivery started successfully');
        this.goBack();
    }

    private validateForm(): boolean {
        if (!this.pickupLocation || !this.deliveryLocation || !this.packageDetails) {
            alert('Please fill in all required fields');
            return false;
        }
        return true;
    }
}