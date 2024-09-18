import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { currencyFormatter } from '../../../../utils/currencyFormatter';
import { IBudget } from '../../../services/budget/budget.model';
import { BudgetService, UNCATEGORIZED_BUDGET_ID } from '../../../services/budget/budget.service';
import { IExpense } from '../../../services/budget/expense.model';
import { IUncategorizedBudget } from '../../../services/budget/uncategorized.model';

@Component({
  selector: 'app-view-expense-modal',
  templateUrl: 'view-expense-modal.component.html',
  styleUrl: 'view-expense-modal.component.css',
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class ViewExpenseModal implements OnInit {
  @Input() defaultBudgetId: string = '';
  @Output() close = new EventEmitter<void>();

  budget: IBudget | IUncategorizedBudget = {} as IBudget;
  expenses: IExpense[] = [];

  constructor(private budgetService: BudgetService) {}

  // Ensuring everything loads properly
  ngOnInit(): void {
    this.budget = this.identifyBudget();
    this.budgetService
      .trackAllExpensesByBudgetId(this.defaultBudgetId)
      .subscribe((expenses) => {
        this.expenses = expenses;
      });
  }

  closeModal(): void {
    this.close.emit();
  }

  removeBudget(id: string): void {
    this.budgetService.removeBudgetById(id);
  }

  removeExpense(id: string): void {
    this.budgetService.removeExpenseById(id);
  }

  identifyBudget(): IBudget | IUncategorizedBudget {
    if (this.defaultBudgetId === UNCATEGORIZED_BUDGET_ID) {
      return { name: 'Uncategorized', id: UNCATEGORIZED_BUDGET_ID };
    }
    return (
      this.budgetService.getBudgetById(this.defaultBudgetId) ?? ({} as IBudget)
    );
  }

  formatCurrency(amount: number): string {
    return currencyFormatter.format(amount);
  }
}
