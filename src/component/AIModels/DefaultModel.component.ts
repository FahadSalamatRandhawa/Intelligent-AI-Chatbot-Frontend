import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { BrnSelectImports } from '@spartan-ng/ui-select-brain';
import { HlmSelectImports } from '@spartan-ng/ui-select-helm';
import { CONSTANTS } from '../../../constants';

@Component({
  selector: 'DefaultModel',
  standalone: true,
  imports: [CommonModule, FormsModule, BrnSelectImports, HlmSelectImports],
  template: `
    <brn-select class="inline-block" [(ngModel)]="default_model_id" (ngModelChange)="onModelChange($event)" placeholder="Select an option">
      <hlm-select-trigger class="w-56 rounded-none">
        <hlm-select-value />
      </hlm-select-trigger>
      <hlm-select-content class="rounded-none border">
        <ng-container *ngFor="let model of models">
          <hlm-option [value]="model.id">{{ model.name }}</hlm-option>
        </ng-container>
      </hlm-select-content>
    </brn-select>
  `,
})
export class DefaultModel {
  models: { name: string; id: string }[] = [];
  default_model_id: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchModels();
  }

  fetchModels() {
    this.http.get<any>(`${CONSTANTS.API_URL}/models/available`).subscribe(
      (data) => {
        this.models = data.available_models;
        this.default_model_id = data.default_model_id; // Set the default value
      },
      (error) => {
        console.error('Error fetching models:', error);
      }
    );
  }

  onModelChange(newModelId: string) {
    console.log('Model changed to:', newModelId);
    this.updateDefaultModel(newModelId);
  }

  updateDefaultModel(newModelId: string) {
    this.http.put(`${CONSTANTS.API_URL}/models/set_default?model_id=${newModelId}`,{}).subscribe(
      (response) => {
        console.log('Default model updated successfully:', response);
      },
      (error) => {
        console.error('Error updating default model:', error);
      }
    );
  }
}
