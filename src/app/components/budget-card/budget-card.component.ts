import { Component, EventEmitter, Input, Output } from '@angular/core';

import { currencyFormatter } from '../../../utils/currencyFormatter';

@Component({
  selector: 'app-budget-card',
  standalone: true,
  imports: [],
  templateUrl: './budget-card.component.html',
  styleUrl: './budget-card.component.css',
})
export class BudgetCardComponent {
  @Input() name: string = '';
  @Input({ required: true }) amount: number = 0;
  @Input({ required: true }) max: number = 0;

  @Output() openAddExpense = new EventEmitter();
  @Output() openViewExpenses = new EventEmitter();
  @Output() close = new EventEmitter();

  openAddExpenseModal() {
    this.openAddExpense.emit();
  }

  openViewExpensesModal() {
    this.openViewExpenses.emit();
  }

  closeModal() {
    this.close.emit();
  }

  formatCurrency(num: number): string {
    return currencyFormatter.format(num);
  }
}
