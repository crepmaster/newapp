import { Observable, Frame } from '@nativescript/core';

export class ExchangesListViewModel extends Observable {
    public selectedTabIndex: number = 0;
    public exchanges: any[] = [
        {
            id: '1',
            medicineName: 'Paracetamol',
            quantity: 100,
            status: 'Pending',
            requestingPharmacy: 'Pharmacy Two'
        },
        {
            id: '2',
            medicineName: 'Amoxicillin',
            quantity: 50,
            status: 'Active',
            requestingPharmacy: 'Pharmacy Three'
        },
        {
            id: '3',
            medicineName: 'Ibuprofen',
            quantity: 75,
            status: 'Completed',
            requestingPharmacy: 'Pharmacy Four'
        }
    ];

    constructor() {
        super();
        this.filterExchanges();
    }

    goBack() {
        Frame.topmost().goBack();
    }

    onExchangeAction(args: any) {
        const exchange = args.object.bindingContext;
        if (exchange.status === 'Pending') {
            this.acceptExchange(exchange);
        } else {
            this.viewExchangeDetails(exchange);
        }
    }

    private acceptExchange(exchange: any) {
        // Implement exchange acceptance logic
        alert(`Accepting exchange for ${exchange.medicineName}`);
    }

    private viewExchangeDetails(exchange: any) {
        Frame.topmost().navigate({
            moduleName: 'pages/pharmacy/exchanges/exchange-details-page',
            context: { exchangeId: exchange.id }
        });
    }

    private filterExchanges() {
        // Filter exchanges based on selected tab
        const status = ['Pending', 'Active', 'Completed'][this.selectedTabIndex];
        this.set('exchanges', this.exchanges.filter(e => e.status === status));
    }
}