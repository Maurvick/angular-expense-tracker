import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { BudgetCardComponent } from './components/budget-card/budget-card.component';
import { AddBudgetModalComponent } from './components/modals/add-budget-modal/add-budget-modal.component';
import { AddExpenseModalComponent } from './components/modals/add-expense-modal/add-expense-modal.component';
import { ViewExpenseModal } from './components/modals/view-expenses-modal/view-expense-modal.component';
import { IBudget } from './services/budget/budget.model';
import {
  BudgetService,
  UNCATEGORIZED_BUDGET_ID,
} from './services/budget/budget.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    BudgetCardComponent,
    AddBudgetModalComponent,
    AddExpenseModalComponent,
    ViewExpenseModal,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  budgets: IBudget[] = [];

  isAddBudgetModalVisible: boolean = false;
  isAddExpenseModalVisible: boolean = false;
  isViewExpensesModalVisible: boolean = false;

  addExpenseModalBudgetId: string = '';
  viewExpenseModalBudgetId: string = '';

  UNCATEGORIZED_BUDGET_ID = UNCATEGORIZED_BUDGET_ID;

  constructor(public budgetService: BudgetService) {
    this.budgetService.budgets$.subscribe((budgets) => {
      this.budgets = budgets;
    });
  }

  showAddBudgetModal(): void {
    this.isAddBudgetModalVisible = true;
  }

  closeAddBudgetModal(): void {
    this.isAddBudgetModalVisible = false;
  }

  showAddExpenseModal(budgetId: string): void {
    this.isAddExpenseModalVisible = true;
    this.addExpenseModalBudgetId = budgetId;
  }

  closeAddExpenseModal(): void {
    this.isAddExpenseModalVisible = false;
  }

  showViewExpensesModal(budgetId: string): void {
    this.isViewExpensesModalVisible = true;
    this.viewExpenseModalBudgetId = budgetId;
  }

  closeViewExpensesModal(): void {
    this.isViewExpensesModalVisible = false;
  }

  calculateTotalExpenses(budgetId: string): number {
    return this.budgetService
      .getBudgetExpenses(budgetId)
      .reduce((total, expense) => total + expense.amount, 0);
  }
}
