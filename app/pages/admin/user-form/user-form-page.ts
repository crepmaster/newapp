import { NavigatedData, Page } from '@nativescript/core';
import { UserFormViewModel } from './user-form-view-model';

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    
    if (!page.bindingContext) {
        page.bindingContext = new UserFormViewModel(args.context);
    }
}