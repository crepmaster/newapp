import { Observable, Frame } from '@nativescript/core';
import { UserRole } from '../../models/user.model';
import { RegistrationService } from '../../services/registration.service';
import { NavigationService } from '../../services/navigation.service';

export class SignUpViewModel extends Observable {
    private registrationService: RegistrationService;
    private navigationService: NavigationService;
    
    public selectedTabIndex: number = 0;
    public isLoading: boolean = false;
    public errorMessage: string = '';

    public pharmacyForm = {
        name: '',
        email: '',
        password: '',
        phoneNumber: '',
        pharmacyName: '',
        pharmacyAddress: '',
        licenseNumber: ''
    };

    public courierForm = {
        name: '',
        email: '',
        password: '',
        phoneNumber: ''
    };

    constructor() {
        super();
        this.registrationService = RegistrationService.getInstance();
        this.navigationService = NavigationService.getInstance();

        this.on(Observable.propertyChangeEvent, (propertyChangeData: any) => {
            if (propertyChangeData.propertyName === 'selectedTabIndex') {
                this.notifyPropertyChange('isPharmacyTab', this.isPharmacyTab);
            }
        });
    }

    get isPharmacyTab(): boolean {
        return this.selectedTabIndex === 0;
    }

    async onRegisterPharmacy() {
        if (!this.validatePharmacyForm()) return;

        try {
            this.set('isLoading', true);
            this.set('errorMessage', '');

            const user = await this.registrationService.registerUser({
                ...this.pharmacyForm,
                role: UserRole.PHARMACIST,
                isActive: true
            });

            this.navigationService.navigateByRole(user.role);
        } catch (error) {
            this.set('errorMessage', 'Registration failed. Please try again.');
            console.error('Registration error:', error);
        } finally {
            this.set('isLoading', false);
        }
    }

    async onRegisterCourier() {
        if (!this.validateCourierForm()) return;

        try {
            this.set('isLoading', true);
            this.set('errorMessage', '');

            const user = await this.registrationService.registerUser({
                ...this.courierForm,
                role: UserRole.COURIER,
                isActive: true
            });

            this.navigationService.navigateByRole(user.role);
        } catch (error) {
            this.set('errorMessage', 'Registration failed. Please try again.');
            console.error('Registration error:', error);
        } finally {
            this.set('isLoading', false);
        }
    }

    private validatePharmacyForm(): boolean {
        const { name, email, password, phoneNumber, pharmacyName, pharmacyAddress, licenseNumber } = this.pharmacyForm;
        if (!name || !email || !password || !phoneNumber || !pharmacyName || !pharmacyAddress || !licenseNumber) {
            this.set('errorMessage', 'Please fill in all required fields');
            return false;
        }
        return true;
    }

    private validateCourierForm(): boolean {
        const { name, email, password, phoneNumber } = this.courierForm;
        if (!name || !email || !password || !phoneNumber) {
            this.set('errorMessage', 'Please fill in all required fields');
            return false;
        }
        return true;
    }

    goBack() {
        Frame.topmost().goBack();
    }
}