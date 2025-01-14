import { NavigatedData, Page } from '@nativescript/core';
import { DeliveryHistoryViewModel } from './history-view-model';

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    page.bindingContext = new DeliveryHistoryViewModel();
}