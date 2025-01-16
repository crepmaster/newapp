import { NavigatedData, Page } from '@nativescript/core';
import { AddMedicineViewModel } from './add-medicine-view-model';

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    if (!page.bindingContext) {
        page.bindingContext = new AddMedicineViewModel();
    }
}