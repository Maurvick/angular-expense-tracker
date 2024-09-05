import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { IBudget } from './budget.model';
import { BudgetCardComponent } from './components/budget-card/budget-card.component';
import { AddBudgetModalComponent } from './components/modal/add-budget-modal/add-budget-modal.component';
import { BudgetService } from './services/budget/budget.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    BudgetCardComponent,
    AddBudgetModalComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular-expense-tracker';
  budgets: IBudget[] = [];

  isAddBudgetModalVisible: boolean = false;

  constructor(private budgetService: BudgetService) {
    this.budgetService.$budget.subscribe((budgets) => {
      this.budgets = budgets;
    });
  }

  showAddBudgetModal() {
    this.isAddBudgetModalVisible = true;
  }

  closeAddBudgetModal() {
    this.isAddBudgetModalVisible = false;
  }
}
