import { Observable, Frame } from '@nativescript/core';
import { MedicineService } from '../../../services/medicine.service';
import { MedicineStatus } from '../../../models/medicine.model';

export class AddMedicineViewModel extends Observable {
    private medicineService: MedicineService;
    public name: string = '';
    public quantity: string = '';
    public batchNumber: string = '';
    public expiryDate: Date = new Date();

    constructor() {
        super();
        this.medicineService = MedicineService.getInstance();
    }

    goBack() {
        Frame.topmost().goBack();
    }

    async onSave() {
        if (!this.validateForm()) return;

        try {
            const medicine = await this.medicineService.addMedicine({
                name: this.name,
                quantity: parseInt(this.quantity),
                batchNumber: this.batchNumber,
                expiryDate: this.expiryDate,
                status: MedicineStatus.AVAILABLE,
                pharmacyId: 'current-pharmacy-id' // This should come from auth service
            });

            alert('Medicine added successfully');
            this.goBack();
        } catch (error) {
            console.error('Error adding medicine:', error);
            alert('Error adding medicine. Please try again.');
        }
    }

    private validateForm(): boolean {
        if (!this.name || !this.quantity || !this.batchNumber) {
            alert('Please fill in all required fields');
            return false;
        }

        if (isNaN(parseInt(this.quantity)) || parseInt(this.quantity) <= 0) {
            alert('Please enter a valid quantity');
            return false;
        }

        return true;
    }
}