import { Bill } from '../types';

const STORAGE_KEY = 'bill_generator_history';

export const saveBillToHistory = (bill: Bill): void => {
  try {
    const existingBills = getBillHistory();
    const updatedBills = [bill, ...existingBills];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBills));
  } catch (error) {
    console.error('Error saving bill to history:', error);
  }
};

export const getBillHistory = (): Bill[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error retrieving bill history:', error);
    return [];
  }
};

export const clearBillHistory = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing bill history:', error);
  }
};

export const deleteBillFromHistory = (billId: string): void => {
  try {
    const existingBills = getBillHistory();
    const updatedBills = existingBills.filter(bill => bill.id !== billId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBills));
  } catch (error) {
    console.error('Error deleting bill from history:', error);
  }
};