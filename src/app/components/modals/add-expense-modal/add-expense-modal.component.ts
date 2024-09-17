import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { generateUniqueIdV1 } from '../../../../utils/generateUniqueId';
import { IBudget } from '../../../services/budget/budget.model';
import { BudgetService } from '../../../services/budget/budget.service';

@Component({
  selector: 'app-add-expense-modal',
  templateUrl: 'add-expense-modal.component.html',
  styleUrl: 'add-expense-modal.component.css',
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class AddExpenseModalComponent {
  @Input() defaultBudgetId: string = '';
  description: string = '';
  amount: string = '';

  @Output() close = new EventEmitter<void>();

  budgets: IBudget[] = [];

  constructor(private budgetService: BudgetService) {
    this.budgets = budgetService.getBudgets();
  }

  closeModal(): void {
    this.close.emit();
  }

  onSubmit(): void {
    if (this.description && this.amount && this.defaultBudgetId) {
      this.budgetService.addExpense({
        expenseId: generateUniqueIdV1(),
        description: this.description,
        amount: Number(this.amount),
        budgetId: this.defaultBudgetId,
      });
      this.closeModal();
    }
  }
}
