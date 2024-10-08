import { BehaviorSubject, map, Observable } from 'rxjs';

import { Injectable } from '@angular/core';

import { LocalStorageService } from '../local-storage/local-storage.service';
import { IBudget } from './budget.model';
import { IExpense } from './expense.model';

export const UNCATEGORIZED_BUDGET_ID = 'Uncategorized';

@Injectable({ providedIn: 'root' })
export class BudgetService {
  private budgetsSubject = new BehaviorSubject<IBudget[]>([]);
  private $budgets = this.budgetsSubject.asObservable();
  private expensesSubject = new BehaviorSubject<IExpense[]>([]);
  private $expenses = this.expensesSubject.asObservable();

  private get budgets(): IBudget[] {
    return this.budgetsSubject.getValue();
  }
  private set budgets(budgets: IBudget[]) {
    this.budgetsSubject.next(budgets);
  }
  private get expenses(): IExpense[] {
    return this.expensesSubject.getValue();
  }
  private set expenses(expenses: IExpense[]) {
    this.expensesSubject.next(expenses);
  }

  constructor(private localStorageService: LocalStorageService) {
    const storedBudgets = this.localStorageService.getItem<IBudget[]>(
      'budgets',
      '[]'
    );
    const storedExpenses = this.localStorageService.getItem<IExpense[]>(
      'expenses',
      '[]'
    );
    this.budgets = storedBudgets;
    this.$budgets.subscribe((budgets) => {
      this.localStorageService.setItem('budgets', budgets);
    });
    this.expenses = storedExpenses;
    this.$expenses.subscribe((expenses) => {
      this.localStorageService.setItem('expenses', expenses);
    });
  }

  addBudget(newBudget: IBudget): void {
    if (
      this.budgets.some(
        (existingBudget) => existingBudget.name === newBudget.name
      )
    ) {
      alert('Budget already exists');
      return;
    }
    this.budgets = [...this.budgets, newBudget];
  }

  addExpense(newExpense: IExpense): void {
    this.expenses = [...this.expenses, newExpense];
  }

  removeBudgetById(id: string): void {
    this.budgets = this.budgets.filter((budget) => budget.id !== id);
    this.expenses = this.expenses.map((expense) => {
      if (expense.budgetId === id) {
        return { ...expense, budgetId: UNCATEGORIZED_BUDGET_ID } as IExpense;
      }
      return expense;
    });
  }

  removeExpenseById(id: string): void {
    this.expenses = this.expenses.filter((expense) => expense.id !== id);
  }

  getBudgets(): IBudget[] {
    return this.budgets;
  }

  trackAllBudgets(): Observable<IBudget[]> {
    return this.$budgets.pipe(map((budgets) => budgets));
  }

  getBudgetExpenses(id: string): IExpense[] {
    return this.expenses.filter((expense) => expense.budgetId === id);
  }

  trackAllExpensesByBudgetId(id: string): Observable<IExpense[]> {
    return this.$expenses.pipe(
      map((expenses) => expenses.filter((expense) => expense.budgetId === id))
    );
  }

  getBudgetById(id: string): IBudget | undefined {
    return this.budgets.find((budget) => budget.id === id);
  }
}
