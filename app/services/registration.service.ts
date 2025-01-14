import { Observable } from '@nativescript/core';
import { User, UserRole } from '../models/user.model';
import { UserService } from './user.service';

export class RegistrationService extends Observable {
    private static instance: RegistrationService;
    private userService: UserService;

    private constructor() {
        super();
        this.userService = UserService.getInstance();
    }

    public static getInstance(): RegistrationService {
        if (!RegistrationService.instance) {
            RegistrationService.instance = new RegistrationService();
        }
        return RegistrationService.instance;
    }

    async registerUser(userData: {
        name: string;
        email: string;
        password: string;
        phoneNumber: string;
        role: UserRole;
        pharmacyName?: string;
        pharmacyAddress?: string;
        licenseNumber?: string;
        isActive: boolean;
    }): Promise<User> {
        try {
            // In a real app, you would hash the password here
            const user = await this.userService.createUser({
                email: userData.email,
                role: userData.role,
                name: userData.name,
                phoneNumber: userData.phoneNumber,
                pharmacyName: userData.pharmacyName,
                pharmacyAddress: userData.pharmacyAddress,
                licenseNumber: userData.licenseNumber,
                isActive: userData.isActive,
                createdAt: new Date(),
                updatedAt: new Date()
            });

            return user;
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    }
}