import { Observable, EventData } from '@nativescript/core';
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
            this.allUsers = await this.userService.getUsers();
            this.set('users', this.allUsers);
        } catch (error) {
            console.error('Error loading users:', error);
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
        Frame.topmost().navigate({
            moduleName: 'pages/admin/user-form/user-form-page',
            context: { mode: 'create' }
        });
    }

    onEditUser(args: EventData) {
        const button = args.object;
        const user = button.bindingContext;
        
        Frame.topmost().navigate({
            moduleName: 'pages/admin/user-form/user-form-page',
            context: { mode: 'edit', userId: user.id }
        });
    }

    goBack() {
        Frame.topmost().goBack();
    }
}