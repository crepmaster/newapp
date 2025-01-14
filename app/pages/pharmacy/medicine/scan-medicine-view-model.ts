import { Observable, Frame } from '@nativescript/core';

export class ScanMedicineViewModel extends Observable {
    public scanResult: string = '';
    private flashOn: boolean = false;

    constructor() {
        super();
    }

    goBack() {
        Frame.topmost().goBack();
    }

    onToggleFlash() {
        this.flashOn = !this.flashOn;
        // Implement flash toggle logic
        console.log('Toggle flash:', this.flashOn);
    }

    // This would be called when a QR code is successfully scanned
    onCodeScanned(result: string) {
        this.set('scanResult', result);
        // Process the scanned medicine code
        alert(`Medicine scanned: ${result}`);
    }
}