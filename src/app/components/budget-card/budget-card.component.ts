import { Component, EventEmitter, Input, Output } from '@angular/core';

import { currencyFormatter } from '../../../utils/currencyFormatter';
import { ProgressBarComponent } from '../ui/progress-bar/progress-bar.component';

@Component({
  selector: 'app-budget-card',
  standalone: true,
  imports: [ProgressBarComponent],
  templateUrl: './budget-card.component.html',
  styleUrl: './budget-card.component.css',
})
export class BudgetCardComponent {
  @Input({ required: true }) name: string = '';
  @Input({
    required: true,
  })
  amount: number = 0;
  @Input({
    required: true,
  })
  max: number = 0;

  @Output() openAddExpense = new EventEmitter();
  @Output() openViewExpenses = new EventEmitter();
  @Output() close = new EventEmitter();

  openAddExpenseModal(): void {
    this.openAddExpense.emit();
  }

  openViewExpensesModal(): void {
    this.openViewExpenses.emit();
  }

  closeModal(): void {
    this.close.emit();
  }

  formatCurrency(num: number): string {
    return currencyFormatter.format(num);
  }
}
