import { Observable } from '@nativescript/core';
import { Medicine, MedicineStatus } from '../models/medicine.model';

export class MedicineService extends Observable {
  private static instance: MedicineService;
  private medicines: Medicine[] = [];

  private constructor() {
    super();
  }

  public static getInstance(): MedicineService {
    if (!MedicineService.instance) {
      MedicineService.instance = new MedicineService();
    }
    return MedicineService.instance;
  }

  async addMedicine(medicine: Omit<Medicine, 'id' | 'createdAt' | 'updatedAt'>): Promise<Medicine> {
    const newMedicine: Medicine = {
      ...medicine,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.medicines.push(newMedicine);
    this.notifyPropertyChange('medicines', this.medicines);
    return newMedicine;
  }

  async getMedicines(): Promise<Medicine[]> {
    return this.medicines;
  }

  async updateMedicineStatus(id: string, status: MedicineStatus): Promise<Medicine | null> {
    const medicine = this.medicines.find(m => m.id === id);
    if (medicine) {
      medicine.status = status;
      medicine.updatedAt = new Date();
      this.notifyPropertyChange('medicines', this.medicines);
      return medicine;
    }
    return null;
  }
}