import { NavigatedData, Page } from '@nativescript/core';
import { ScanMedicineViewModel } from './scan-medicine-view-model';

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    page.bindingContext = new ScanMedicineViewModel();
}