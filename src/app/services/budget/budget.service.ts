import { BehaviorSubject } from 'rxjs';

import { Injectable } from '@angular/core';

import { IBudget } from '../../budget.model';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({ providedIn: 'root' })
export class BudgetService {
  private budgetsSubject = new BehaviorSubject<IBudget[]>([]);
  // Allow to subscribe to $budget observable to get latest value
  public $budget = this.budgetsSubject.asObservable();

  private get budgets(): IBudget[] {
    return this.budgetsSubject.getValue();
  }
  private set budgets(budgets: IBudget[]) {
    this.budgetsSubject.next(budgets);
  }

  constructor(private localStorageService: LocalStorageService) {
    const storedBudgets = this.localStorageService.getItem<IBudget[]>(
      'budgets',
      '[]'
    );
    this.budgetsSubject.next(storedBudgets);
    this.$budget.subscribe((budgets) => {
      this.localStorageService.setItem('budgets', budgets);
    });
  }

  addBudget(budget: IBudget): void {
    const currentBudgets = this.budgetsSubject.getValue();
    if (
      currentBudgets.some(
        (existingBudget) => existingBudget.name === budget.name
      )
    ) {
      alert('Budget already exists');
      return;
    }
    const updatedBudgets = [...currentBudgets, budget];
    this.budgets = updatedBudgets;
  }

  addExpense() {}
  removeBudget() {}
  removeExpense() {}
  getBudgetExpenses() {}
}
