import { NavigatedData, Page } from '@nativescript/core';
import { ExchangesListViewModel } from './exchanges-list-view-model';

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    page.bindingContext = new ExchangesListViewModel();
}