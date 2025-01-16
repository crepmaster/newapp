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
                this.loadUser();
            }
        }

        this.on(Observable.propertyChangeEvent, (propertyChangeData: any) => {
            if (propertyChangeData.propertyName === 'selectedRoleIndex') {
                this.updatePharmacyFieldsVisibility();
            }
        });
    }

    async loadUser() {
        try {
            console.log('Loading user data for ID:', this.userId);
            if (!this.userId) {
                throw new Error('No user ID provided');
            }

            const user = await this.userService.getUserById(this.userId);
            if (!user) {
                throw new Error('User not found');
            }

            console.log('User data loaded:', user);

            // Update form fields
            this.set('name', user.name);
            this.set('email', user.email);
            this.set('phoneNumber', user.phoneNumber);
            this.set('selectedRoleIndex', this.roles.indexOf(user.role));
            
            if (user.pharmacyName) {
                this.set('pharmacyName', user.pharmacyName);
            }
            if (user.pharmacyAddress) {
                this.set('pharmacyAddress', user.pharmacyAddress);
            }
            if (user.licenseNumber) {
                this.set('licenseNumber', user.licenseNumber);
            }

            this.updatePharmacyFieldsVisibility();
        } catch (error) {
            console.error('Error loading user:', error);
            alert('Failed to load user data');
            this.goBack();
        }
    }

    updatePharmacyFieldsVisibility() {
        const selectedRole = this.roles[this.selectedRoleIndex];
        this.set('showPharmacyFields', selectedRole === UserRole.PHARMACIST);
    }

    async onSave() {
        try {
            const userData = {
                name: this.name,
                email: this.email,
                role: this.roles[this.selectedRoleIndex],
                phoneNumber: this.phoneNumber,
                pharmacyName: this.showPharmacyFields ? this.pharmacyName : undefined,
                pharmacyAddress: this.showPharmacyFields ? this.pharmacyAddress : undefined,
                licenseNumber: this.showPharmacyFields ? this.licenseNumber : undefined,
                isActive: true
            };

            if (this.isEditMode && this.userId) {
                await this.userService.updateUser(this.userId, userData);
                alert('User updated successfully');
            } else {
                await this.userService.createUser(userData);
                alert('User created successfully');
            }

            this.goBack();
        } catch (error) {
            console.error('Error saving user:', error);
            alert('Failed to save user');
        }
    }

    onDelete() {
        if (!this.isEditMode || !this.userId) return;

        confirm({
            title: "Delete User",
            message: "Are you sure you want to delete this user?",
            okButtonText: "Delete",
            cancelButtonText: "Cancel"
        }).then(async (result) => {
            if (result) {
                try {
                    await this.userService.deleteUser(this.userId!);
                    alert('User deleted successfully');
                    this.goBack();
                } catch (error) {
                    console.error('Error deleting user:', error);
                    alert('Failed to delete user');
                }
            }
        });
    }

    goBack() {
        Frame.topmost().goBack();
    }
}