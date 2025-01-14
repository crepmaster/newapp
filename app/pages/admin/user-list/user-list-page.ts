import { NavigatedData, Page } from '@nativescript/core';
import { UserListViewModel } from './user-list-view-model';

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    page.bindingContext = new UserListViewModel();
}