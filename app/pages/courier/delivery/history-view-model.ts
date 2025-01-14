import { Observable, Frame } from '@nativescript/core';

export class DeliveryHistoryViewModel extends Observable {
    public searchQuery: string = '';
    public deliveries: any[] = [
        {
            id: '1',
            date: '2024-01-15',
            pickupLocation: 'Pharmacy One',
            deliveryLocation: 'Pharmacy Two',
            status: 'Completed'
        },
        {
            id: '2',
            date: '2024-01-14',
            pickupLocation: 'Pharmacy Three',
            deliveryLocation: 'Pharmacy Four',
            status: 'Completed'
        }
    ];
    private allDeliveries: any[];

    constructor() {
        super();
        this.allDeliveries = [...this.deliveries];
    }

    goBack() {
        Frame.topmost().goBack();
    }

    onSearch() {
        if (!this.searchQuery) {
            this.set('deliveries', this.allDeliveries);
            return;
        }

        const query = this.searchQuery.toLowerCase();
        const filtered = this.allDeliveries.filter(delivery => 
            delivery.pickupLocation.toLowerCase().includes(query) ||
            delivery.deliveryLocation.toLowerCase().includes(query)
        );
        this.set('deliveries', filtered);
    }

    onClearSearch() {
        this.set('searchQuery', '');
        this.set('deliveries', this.allDeliveries);
    }

    onDeliveryDetails(args: any) {
        const delivery = args.object.bindingContext;
        Frame.topmost().navigate({
            moduleName: 'pages/courier/delivery/delivery-details-page',
            context: { deliveryId: delivery.id }
        });
    }
}