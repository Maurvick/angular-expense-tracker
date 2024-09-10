import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { generateUniqueId } from '../../../../utils/generateUniqueId';
import { BudgetService } from '../../../services/budget/budget.service';

@Component({
  selector: 'app-add-budget-modal',
  templateUrl: 'add-budget-modal.component.html',
  styleUrl: 'add-budget-modal.component.css',
  imports: [CommonModule, FormsModule],
  standalone: true,
})
export class AddBudgetModalComponent {
  @Output() close = new EventEmitter<void>();

  budgetName: string = '';
  budgetMax: string = '';

  constructor(private budgetService: BudgetService) {}

  closeModal() {
    this.close.emit();
  }

  onSubmit() {
    if (this.budgetName && this.budgetMax) {
      this.budgetService.addBudget({
        id: generateUniqueId(),
        name: this.budgetName,
        amount: 0,
        max: Number(this.budgetMax),
      });
      this.closeModal();
    }
  }
}
