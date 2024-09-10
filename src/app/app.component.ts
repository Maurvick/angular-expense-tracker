import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { BudgetCardComponent } from './components/budget-card/budget-card.component';
import { AddBudgetModalComponent } from './components/modals/add-budget-modal/add-budget-modal.component';
import { AddExpenseModalComponent } from './components/modals/add-expense-modal/add-expense-modal.component';
import { ViewExpenseModal } from './components/modals/view-expenses-modal/view-expense-modal.component';
import { IBudget } from './services/budget/budget.model';
import { BudgetService } from './services/budget/budget.service';

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

  constructor(private budgetService: BudgetService) {
    this.budgetService.$budgets.subscribe((budgets) => {
      this.budgets = budgets;
    });
  }

  showAddBudgetModal() {
    this.isAddBudgetModalVisible = true;
  }

  closeAddBudgetModal() {
    this.isAddBudgetModalVisible = false;
  }

  showAddExpenseModal() {
    this.isAddExpenseModalVisible = true;
  }

  closeAddExpenseModal() {
    this.isAddExpenseModalVisible = false;
  }

  showViewExpensesModal() {
    this.isViewExpensesModalVisible = true;
  }

  closeViewExpensesModal() {
    this.isViewExpensesModalVisible = false;
  }
}
