import { Observable, Frame, confirm } from '@nativescript/core';
import { User, UserRole } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';

export class UserFormViewModel extends Observable {
    private userService: UserService;
    public isEditMode: boolean = false;
    public userId: string | null = null;
    public roles: UserRole[] = Object.values(UserRole);
    
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
            if (!this.name || !this.email || !this.phoneNumber) {
                alert('Please fill in all required fields');
                return;
            }

            const selectedRole = this.roles[this.selectedRoleIndex];
            if (selectedRole === UserRole.PHARMACIST && 
                (!this.pharmacyName || !this.pharmacyAddress || !this.licenseNumber)) {
                alert('Please fill in all pharmacy details');
                return;
            }

            if (this.isEditMode && this.userId) {
                // For updates, we can use Partial<User>
                const updateData: Partial<User> = {
                    name: this.name,
                    email: this.email,
                    role: selectedRole,
                    phoneNumber: this.phoneNumber,
                    isActive: true
                };

                if (selectedRole === UserRole.PHARMACIST) {
                    updateData.pharmacyName = this.pharmacyName;
                    updateData.pharmacyAddress = this.pharmacyAddress;
                    updateData.licenseNumber = this.licenseNumber;
                }

                await this.userService.updateUser(this.userId, updateData);
                alert('User updated successfully');
            } else {
                // For creation, we need all required fields
                const createData = {
                    name: this.name,
                    email: this.email,
                    role: selectedRole,
                    phoneNumber: this.phoneNumber,
                    isActive: true,
                    pharmacyName: selectedRole === UserRole.PHARMACIST ? this.pharmacyName : undefined,
                    pharmacyAddress: selectedRole === UserRole.PHARMACIST ? this.pharmacyAddress : undefined,
                    licenseNumber: selectedRole === UserRole.PHARMACIST ? this.licenseNumber : undefined
                };

                await this.userService.createUser(createData);
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