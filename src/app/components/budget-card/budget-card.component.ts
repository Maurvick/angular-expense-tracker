import { Component, Input } from '@angular/core';

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

  formatAmount(): string {
    return currencyFormatter.format(this.amount / this.max);
  }
}
