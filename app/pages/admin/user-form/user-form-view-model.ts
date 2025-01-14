import { Observable } from '@nativescript/core';
import { User, UserRole } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import { Frame } from '@nativescript/core';

export class UserFormViewModel extends Observable {
    private userService: UserService;
    public isEditMode: boolean = false;
    public userId: string | null = null;
    public roles: string[] = Object.values(UserRole);
    
    // Form fields
    public name: string = '';
    public email: string = '';
    public selectedRoleIndex: number = 0;
    public phoneNumber: string = '';
    public pharmacyName: string = '';
    public pharmacyAddress: string = '';
    public licenseNumber: string = '';
    public showPharmacyFields: boolean = false;

    constructor(context?: { mode: 'create' | 'edit', userId?: string }) {
        super();
        this.userService = UserService.getInstance();
        
        if (context) {
            this.isEditMode = context.mode === 'edit';
            this.userId = context.userId || null;
            
            if (this.isEditMode && this.userId) {
                this.loadUser(this.userId);
            }
        }

        this.on(Observable.propertyChangeEvent, (propertyChangeData: any) => {
            if (propertyChangeData.propertyName === 'selectedRoleIndex') {
                this.updatePharmacyFieldsVisibility();
            }
        });
    }

    goBack() {
        Frame.topmost().goBack();
    }

    // ... rest of the existing methods ...
}