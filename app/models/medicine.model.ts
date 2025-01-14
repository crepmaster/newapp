export enum MedicineStatus {
  AVAILABLE = 'available',
  PENDING = 'pending',
  EXCHANGED = 'exchanged',
  EXPIRED = 'expired'
}

export interface Medicine {
  id: string;
  name: string;
  quantity: number;
  batchNumber: string;
  expiryDate: Date;
  status: MedicineStatus;
  pharmacyId: string;
  createdAt: Date;
  updatedAt: Date;
}