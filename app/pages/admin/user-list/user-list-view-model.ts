import { Observable, EventData, View } from '@nativescript/core';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import { Frame } from '@nativescript/core';

export class UserListViewModel extends Observable {
    private userService: UserService;
    public users: User[] = [];
    public searchQuery: string = '';
    private allUsers: User[] = [];

    constructor() {
        super();
        this.userService = UserService.getInstance();
        this.loadUsers();
    }

    async loadUsers() {
        try {
            console.log('Loading users...');
            this.allUsers = await this.userService.getUsers();
            console.log('Users loaded:', this.allUsers);
            this.set('users', this.allUsers);
        } catch (error) {
            console.error('Error loading users:', error);
            alert('Failed to load users. Please try again.');
        }
    }

    onSearch() {
        if (!this.searchQuery) {
            this.set('users', this.allUsers);
            return;
        }

        const query = this.searchQuery.toLowerCase();
        const filteredUsers = this.allUsers.filter(user => 
            user.name.toLowerCase().includes(query) ||
            user.email.toLowerCase().includes(query)
        );
        this.set('users', filteredUsers);
    }

    onClearSearch() {
        this.set('searchQuery', '');
        this.set('users', this.allUsers);
    }

    onAddUser() {
        console.log('Adding new user...');
        Frame.topmost().navigate({
            moduleName: 'pages/admin/user-form/user-form-page',
            context: { mode: 'create' }
        });
    }

    onEditUser(args: EventData) {
        try {
            console.log('Edit button clicked');
            const button = args.object as View;
            const user = button.bindingContext;
            
            console.log('User data:', user);
            
            if (!user) {
                console.error('No user data found');
                return;
            }

            console.log('Navigating to edit form for user:', user.id);
            Frame.topmost().navigate({
                moduleName: 'pages/admin/user-form/user-form-page',
                context: { 
                    mode: 'edit', 
                    userId: user.id 
                }
            });
        } catch (error) {
            console.error('Error in onEditUser:', error);
            alert('Failed to open edit form');
        }
    }

    goBack() {
        Frame.topmost().goBack();
    }
}