import { Observable, Frame } from '@nativescript/core';

export class UpdateStatusViewModel extends Observable {
    public delivery: any = {
        pickupLocation: 'Pharmacy One',
        deliveryLocation: 'Pharmacy Two',
        status: 'In Transit'
    };
    public statusOptions: string[] = ['Picked Up', 'In Transit', 'Delivered'];
    public selectedStatusIndex: number = 1;
    public notes: string = '';

    constructor() {
        super();
    }

    goBack() {
        Frame.topmost().goBack();
    }

    onUpdateStatus() {
        if (!this.notes) {
            alert('Please add some notes about the status update');
            return;
        }

        const newStatus = this.statusOptions[this.selectedStatusIndex];
        console.log('Updating status:', {
            newStatus,
            notes: this.notes
        });

        alert('Status updated successfully');
        this.goBack();
    }
}