import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: 'progress-bar.component.html',
  styleUrl: 'progress-bar.component.css',
  standalone: true,
  imports: [CommonModule],
})
export class ProgressBarComponent implements OnInit {
  @Input({ required: true }) value: number = 0;
  @Input({ required: true }) max: number = 0;

  constructor() {}

  ngOnInit() {}

  calculateProgress(): number {
    return (this.value / this.max) * 100;
  }
}
