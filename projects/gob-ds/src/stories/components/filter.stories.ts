import type { Meta, StoryObj } from '@storybook/angular';
import { FilterComponent } from '../../lib/filter/filter.component';
import { SelectComponent } from '../../lib/select/select.component';
import { CheckboxComponent } from '../../lib/checkbox/checkbox.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, Input } from '@angular/core';

// ── Helper component: Checkbox filter with table ──────────────────────────

@Component({
  standalone: true,
  selector: 'story-checkbox-filter',
  imports: [CommonModule, FilterComponent, CheckboxComponent],
  template: `
    <div style="display: flex; flex-direction: column; gap: 24px; padding: 20px; min-height: 500px;">
      <div style="display: flex; gap: 12px;">
        <ds-filter
          label="Estado"
          [active]="hasActiveFilters"
          [activeLabel]="activeStatusLabel"
          (apply)="applyStatusFilter()"
          (reset)="resetStatusFilter()"
          (clear)="clearStatusFilter($event)"
        >
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <ds-checkbox label="Activo" [checked]="pendingStatus['Activo']" (click)="togglePendingStatus('Activo')" />
            <ds-checkbox label="Inactivo" [checked]="pendingStatus['Inactivo']" (click)="togglePendingStatus('Inactivo')" />
            <ds-checkbox label="Pendiente" [checked]="pendingStatus['Pendiente']" (click)="togglePendingStatus('Pendiente')" />
            <ds-checkbox label="Archivado" [checked]="pendingStatus['Archivado']" (click)="togglePendingStatus('Archivado')" />
          </div>
        </ds-filter>
      </div>

      <table style="width: 100%; border-collapse: collapse; font-family: var(--font-family-sans); font-size: 14px;">
        <thead>
          <tr style="border-bottom: 2px solid var(--color-border); text-align: left;">
            <th style="padding: 12px 16px; font-weight: 600; color: var(--color-text-primary);">Nombre</th>
            <th style="padding: 12px 16px; font-weight: 600; color: var(--color-text-primary);">Email</th>
            <th style="padding: 12px 16px; font-weight: 600; color: var(--color-text-primary);">Estado</th>
            <th style="padding: 12px 16px; font-weight: 600; color: var(--color-text-primary);">Rol</th>
          </tr>
        </thead>
        <tbody>
          @for (row of filteredRows; track row.name) {
            <tr style="border-bottom: 1px solid var(--color-border-subtle);">
              <td style="padding: 12px 16px; color: var(--color-text-primary);">{{ row.name }}</td>
              <td style="padding: 12px 16px; color: var(--color-text-secondary);">{{ row.email }}</td>
              <td style="padding: 12px 16px;">
                <span [style.background]="row.status === 'Activo' ? 'var(--color-success-50, #ecfdf5)' : row.status === 'Pendiente' ? 'var(--color-warning-50, #fffbeb)' : 'var(--color-neutral-100, #f3f4f6)'"
                      [style.color]="row.status === 'Activo' ? 'var(--color-success-700, #15803d)' : row.status === 'Pendiente' ? 'var(--color-warning-700, #a16207)' : 'var(--color-text-secondary)'"
                      style="padding: 2px 10px; border-radius: 9999px; font-size: 13px; font-weight: 500;">
                  {{ row.status }}
                </span>
              </td>
              <td style="padding: 12px 16px; color: var(--color-text-secondary);">{{ row.role }}</td>
            </tr>
          }
          @if (filteredRows.length === 0) {
            <tr>
              <td colspan="4" style="padding: 32px 16px; text-align: center; color: var(--color-text-tertiary);">
                No se encontraron resultados con los filtros aplicados.
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
})
class StoryCheckboxFilterComponent {
  rows = [
    { name: 'Carlos Lopez', email: 'carlos@email.com', status: 'Activo', role: 'Admin' },
    { name: 'Maria Garcia', email: 'maria@email.com', status: 'Activo', role: 'Editor' },
    { name: 'Juan Perez', email: 'juan@email.com', status: 'Inactivo', role: 'Viewer' },
    { name: 'Ana Torres', email: 'ana@email.com', status: 'Pendiente', role: 'Editor' },
    { name: 'Luis Ramirez', email: 'luis@email.com', status: 'Archivado', role: 'Viewer' },
    { name: 'Sofia Martinez', email: 'sofia@email.com', status: 'Activo', role: 'Admin' },
    { name: 'Diego Herrera', email: 'diego@email.com', status: 'Pendiente', role: 'Editor' },
    { name: 'Laura Sanchez', email: 'laura@email.com', status: 'Inactivo', role: 'Viewer' },
  ];

  pendingStatus: Record<string, boolean> = {};
  appliedStatus: Record<string, boolean> = {};

  get hasActiveFilters(): boolean {
    return Object.values(this.appliedStatus).some(v => v);
  }

  get activeStatusLabel(): string {
    const selected = Object.entries(this.appliedStatus).filter(([, v]) => v).map(([k]) => k);
    if (selected.length === 0) return '';
    if (selected.length === 1) return selected[0];
    return `${selected[0]} y ${selected.length - 1} mas`;
  }

  get filteredRows() {
    if (!this.hasActiveFilters) return this.rows;
    return this.rows.filter(r => this.appliedStatus[r.status]);
  }

  togglePendingStatus(status: string): void {
    this.pendingStatus[status] = !this.pendingStatus[status];
  }

  applyStatusFilter(): void {
    this.appliedStatus = { ...this.pendingStatus };
  }

  resetStatusFilter(): void {
    this.pendingStatus = {};
    this.appliedStatus = {};
  }

  clearStatusFilter(event: MouseEvent): void {
    this.pendingStatus = {};
    this.appliedStatus = {};
  }
}

// ── Helper component: Select filter with table ────────────────────────────

@Component({
  standalone: true,
  selector: 'story-select-filter',
  imports: [CommonModule, FilterComponent, SelectComponent],
  template: `
    <div style="display: flex; flex-direction: column; gap: 24px; padding: 20px; min-height: 500px;">
      <div style="display: flex; gap: 12px;">
        <ds-filter
          label="Rol"
          [active]="!!appliedRole"
          [activeLabel]="appliedRole"
          (apply)="applyRoleFilter()"
          (reset)="resetRoleFilter()"
          (clear)="clearRoleFilter($event)"
        >
          <ds-select
            [options]="roleOptions"
            placeholder="Seleccionar rol"
            (selectionChange)="onPendingRoleChange($event)"
          />
        </ds-filter>
      </div>

      <table style="width: 100%; border-collapse: collapse; font-family: var(--font-family-sans); font-size: 14px;">
        <thead>
          <tr style="border-bottom: 2px solid var(--color-border); text-align: left;">
            <th style="padding: 12px 16px; font-weight: 600; color: var(--color-text-primary);">Nombre</th>
            <th style="padding: 12px 16px; font-weight: 600; color: var(--color-text-primary);">Email</th>
            <th style="padding: 12px 16px; font-weight: 600; color: var(--color-text-primary);">Rol</th>
            <th style="padding: 12px 16px; font-weight: 600; color: var(--color-text-primary);">Departamento</th>
          </tr>
        </thead>
        <tbody>
          @for (row of filteredRows; track row.name) {
            <tr style="border-bottom: 1px solid var(--color-border-subtle);">
              <td style="padding: 12px 16px; color: var(--color-text-primary);">{{ row.name }}</td>
              <td style="padding: 12px 16px; color: var(--color-text-secondary);">{{ row.email }}</td>
              <td style="padding: 12px 16px;">
                <span style="padding: 2px 10px; border-radius: 8px; font-size: 13px; font-weight: 500; background: var(--color-brand-50, #eef2ff); color: var(--color-brand-700, #4338ca);">
                  {{ row.role }}
                </span>
              </td>
              <td style="padding: 12px 16px; color: var(--color-text-secondary);">{{ row.department }}</td>
            </tr>
          }
          @if (filteredRows.length === 0) {
            <tr>
              <td colspan="4" style="padding: 32px 16px; text-align: center; color: var(--color-text-tertiary);">
                No se encontraron resultados con los filtros aplicados.
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
})
class StorySelectFilterComponent {
  rows = [
    { name: 'Carlos Lopez', email: 'carlos@email.com', role: 'Admin', department: 'Tecnologia' },
    { name: 'Maria Garcia', email: 'maria@email.com', role: 'Editor', department: 'Marketing' },
    { name: 'Juan Perez', email: 'juan@email.com', role: 'Viewer', department: 'Ventas' },
    { name: 'Ana Torres', email: 'ana@email.com', role: 'Editor', department: 'Tecnologia' },
    { name: 'Luis Ramirez', email: 'luis@email.com', role: 'Admin', department: 'Operaciones' },
    { name: 'Sofia Martinez', email: 'sofia@email.com', role: 'Viewer', department: 'Marketing' },
  ];

  roleOptions = [
    { label: 'Admin', value: 'Admin' },
    { label: 'Editor', value: 'Editor' },
    { label: 'Viewer', value: 'Viewer' },
  ];

  pendingRole = '';
  appliedRole = '';

  get filteredRows() {
    if (!this.appliedRole) return this.rows;
    return this.rows.filter(r => r.role === this.appliedRole);
  }

  onPendingRoleChange(value: string): void {
    this.pendingRole = value;
  }

  applyRoleFilter(): void {
    this.appliedRole = this.pendingRole;
  }

  resetRoleFilter(): void {
    this.pendingRole = '';
    this.appliedRole = '';
  }

  clearRoleFilter(event: MouseEvent): void {
    this.pendingRole = '';
    this.appliedRole = '';
  }
}

// ── Helper component: Condition filter with table ─────────────────────────

@Component({
  standalone: true,
  selector: 'story-condition-filter',
  imports: [CommonModule, FormsModule, FilterComponent, SelectComponent],
  template: `
    <div style="display: flex; flex-direction: column; gap: 24px; padding: 20px; min-height: 500px;">
      <div style="display: flex; gap: 12px;">
        <ds-filter
          label="Costo"
          [active]="isFilterActive"
          [activeLabel]="activeConditionLabel"
          (apply)="applyConditionFilter()"
          (reset)="resetConditionFilter()"
          (clear)="clearConditionFilter($event)"
        >
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <label style="font-size: 13px; font-weight: 500; color: var(--color-text-primary);">Condicion</label>
            <ds-select
              [options]="conditionOptions"
              placeholder="Seleccionar condicion"
              (selectionChange)="onConditionChange($event)"
            />

            <label style="font-size: 13px; font-weight: 500; color: var(--color-text-primary);">Valor</label>
            <input
              type="number"
              [(ngModel)]="pendingValue"
              placeholder="Cantidad"
              style="
                width: 100%;
                padding: 8px 12px;
                border: 1px solid var(--color-border);
                border-radius: 8px;
                font-size: 14px;
                font-family: var(--font-family-sans);
                box-sizing: border-box;
                color: var(--color-text-primary);
              "
            />

            @if (pendingCondition === 'between') {
              <label style="font-size: 13px; font-weight: 500; color: var(--color-text-primary);">Valor maximo</label>
              <input
                type="number"
                [(ngModel)]="pendingValueMax"
                placeholder="Cantidad maxima"
                style="
                  width: 100%;
                  padding: 8px 12px;
                  border: 1px solid var(--color-border);
                  border-radius: 8px;
                  font-size: 14px;
                  font-family: var(--font-family-sans);
                  box-sizing: border-box;
                  color: var(--color-text-primary);
                "
              />
            }
          </div>
        </ds-filter>
      </div>

      <table style="width: 100%; border-collapse: collapse; font-family: var(--font-family-sans); font-size: 14px;">
        <thead>
          <tr style="border-bottom: 2px solid var(--color-border); text-align: left;">
            <th style="padding: 12px 16px; font-weight: 600; color: var(--color-text-primary);">Producto</th>
            <th style="padding: 12px 16px; font-weight: 600; color: var(--color-text-primary);">Categoria</th>
            <th style="padding: 12px 16px; font-weight: 600; color: var(--color-text-primary); text-align: right;">Costo</th>
            <th style="padding: 12px 16px; font-weight: 600; color: var(--color-text-primary); text-align: right;">Stock</th>
          </tr>
        </thead>
        <tbody>
          @for (row of filteredRows; track row.product) {
            <tr style="border-bottom: 1px solid var(--color-border-subtle);">
              <td style="padding: 12px 16px; color: var(--color-text-primary);">{{ row.product }}</td>
              <td style="padding: 12px 16px; color: var(--color-text-secondary);">{{ row.category }}</td>
              <td style="padding: 12px 16px; text-align: right; color: var(--color-text-primary); font-variant-numeric: tabular-nums;">
                \${{ row.cost.toLocaleString('en-US', { minimumFractionDigits: 2 }) }}
              </td>
              <td style="padding: 12px 16px; text-align: right; color: var(--color-text-secondary); font-variant-numeric: tabular-nums;">
                {{ row.stock }}
              </td>
            </tr>
          }
          @if (filteredRows.length === 0) {
            <tr>
              <td colspan="4" style="padding: 32px 16px; text-align: center; color: var(--color-text-tertiary);">
                No se encontraron resultados con los filtros aplicados.
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
})
class StoryConditionFilterComponent {
  rows = [
    { product: 'Laptop Pro', category: 'Electronica', cost: 1299.99, stock: 45 },
    { product: 'Monitor 27"', category: 'Electronica', cost: 449.00, stock: 120 },
    { product: 'Teclado Mecanico', category: 'Accesorios', cost: 89.99, stock: 300 },
    { product: 'Mouse Inalambrico', category: 'Accesorios', cost: 35.50, stock: 500 },
    { product: 'Silla Ergonomica', category: 'Mobiliario', cost: 599.00, stock: 25 },
    { product: 'Escritorio Ajustable', category: 'Mobiliario', cost: 750.00, stock: 18 },
    { product: 'Webcam HD', category: 'Electronica', cost: 79.99, stock: 200 },
    { product: 'Hub USB-C', category: 'Accesorios', cost: 45.00, stock: 350 },
    { product: 'Audifonos BT', category: 'Electronica', cost: 199.99, stock: 80 },
  ];

  conditionOptions = [
    { label: 'Es igual a', value: 'equal' },
    { label: 'Es entre', value: 'between' },
    { label: 'Es mayor que', value: 'greater' },
    { label: 'Es menor que', value: 'less' },
  ];

  pendingCondition = '';
  pendingValue: number | null = null;
  pendingValueMax: number | null = null;

  appliedCondition = '';
  appliedValue: number | null = null;
  appliedValueMax: number | null = null;

  get isFilterActive(): boolean {
    return !!this.appliedCondition && this.appliedValue !== null;
  }

  get activeConditionLabel(): string {
    if (!this.isFilterActive) return '';
    const condLabel = this.conditionOptions.find(o => o.value === this.appliedCondition)?.label ?? '';
    if (this.appliedCondition === 'between') {
      return `${condLabel} \$${this.appliedValue} - \$${this.appliedValueMax}`;
    }
    return `${condLabel} \$${this.appliedValue}`;
  }

  get filteredRows() {
    if (!this.isFilterActive) return this.rows;
    const val = this.appliedValue!;

    return this.rows.filter(r => {
      switch (this.appliedCondition) {
        case 'equal': return r.cost === val;
        case 'greater': return r.cost > val;
        case 'less': return r.cost < val;
        case 'between': return r.cost >= val && r.cost <= (this.appliedValueMax ?? Infinity);
        default: return true;
      }
    });
  }

  onConditionChange(value: string): void {
    this.pendingCondition = value;
  }

  applyConditionFilter(): void {
    this.appliedCondition = this.pendingCondition;
    this.appliedValue = this.pendingValue;
    this.appliedValueMax = this.pendingValueMax;
  }

  resetConditionFilter(): void {
    this.pendingCondition = '';
    this.pendingValue = null;
    this.pendingValueMax = null;
    this.appliedCondition = '';
    this.appliedValue = null;
    this.appliedValueMax = null;
  }

  clearConditionFilter(event: MouseEvent): void {
    this.resetConditionFilter();
  }
}

// ── Helper component: Combined filters with table ─────────────────────────

@Component({
  standalone: true,
  selector: 'story-combined-filters',
  imports: [CommonModule, FormsModule, FilterComponent, SelectComponent, CheckboxComponent],
  template: `
    <div style="display: flex; flex-direction: column; gap: 24px; padding: 20px; min-height: 600px;">
      <div style="display: flex; gap: 12px; flex-wrap: wrap;">
        <!-- Checkbox filter: Categoria -->
        <ds-filter
          label="Categoria"
          [active]="hasCategoryFilter"
          [activeLabel]="activeCategoryLabel"
          (apply)="applyCategoryFilter()"
          (reset)="resetCategoryFilter()"
          (clear)="clearCategoryFilter($event)"
        >
          <div style="display: flex; flex-direction: column; gap: 12px;">
            @for (cat of allCategories; track cat) {
              <ds-checkbox [label]="cat" [checked]="pendingCategories[cat]" (click)="togglePendingCategory(cat)" />
            }
          </div>
        </ds-filter>

        <!-- Select filter: Estado -->
        <ds-filter
          label="Estado"
          [active]="!!appliedStatus"
          [activeLabel]="appliedStatus"
          (apply)="applyStatusFilter()"
          (reset)="resetStatusFilter()"
          (clear)="clearStatusFilter($event)"
        >
          <ds-select
            [options]="statusOptions"
            placeholder="Seleccionar estado"
            (selectionChange)="onPendingStatusChange($event)"
          />
        </ds-filter>

        <!-- Condition filter: Precio -->
        <ds-filter
          label="Precio"
          [active]="isPriceFilterActive"
          [activeLabel]="activePriceLabel"
          (apply)="applyPriceFilter()"
          (reset)="resetPriceFilter()"
          (clear)="clearPriceFilter($event)"
        >
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <label style="font-size: 13px; font-weight: 500; color: var(--color-text-primary);">Condicion</label>
            <ds-select
              [options]="conditionOptions"
              placeholder="Seleccionar condicion"
              (selectionChange)="onPriceConditionChange($event)"
            />
            <label style="font-size: 13px; font-weight: 500; color: var(--color-text-primary);">Valor</label>
            <input
              type="number"
              [(ngModel)]="pendingPrice"
              placeholder="Cantidad"
              style="width: 100%; padding: 8px 12px; border: 1px solid var(--color-border); border-radius: 8px; font-size: 14px; font-family: var(--font-family-sans); box-sizing: border-box; color: var(--color-text-primary);"
            />
            @if (pendingPriceCondition === 'between') {
              <label style="font-size: 13px; font-weight: 500; color: var(--color-text-primary);">Valor maximo</label>
              <input
                type="number"
                [(ngModel)]="pendingPriceMax"
                placeholder="Cantidad maxima"
                style="width: 100%; padding: 8px 12px; border: 1px solid var(--color-border); border-radius: 8px; font-size: 14px; font-family: var(--font-family-sans); box-sizing: border-box; color: var(--color-text-primary);"
              />
            }
          </div>
        </ds-filter>
      </div>

      <table style="width: 100%; border-collapse: collapse; font-family: var(--font-family-sans); font-size: 14px;">
        <thead>
          <tr style="border-bottom: 2px solid var(--color-border); text-align: left;">
            <th style="padding: 12px 16px; font-weight: 600; color: var(--color-text-primary);">Producto</th>
            <th style="padding: 12px 16px; font-weight: 600; color: var(--color-text-primary);">Categoria</th>
            <th style="padding: 12px 16px; font-weight: 600; color: var(--color-text-primary);">Estado</th>
            <th style="padding: 12px 16px; font-weight: 600; color: var(--color-text-primary); text-align: right;">Precio</th>
          </tr>
        </thead>
        <tbody>
          @for (row of filteredRows; track row.product) {
            <tr style="border-bottom: 1px solid var(--color-border-subtle);">
              <td style="padding: 12px 16px; color: var(--color-text-primary);">{{ row.product }}</td>
              <td style="padding: 12px 16px; color: var(--color-text-secondary);">{{ row.category }}</td>
              <td style="padding: 12px 16px;">
                <span [style.background]="row.status === 'Disponible' ? 'var(--color-success-50, #ecfdf5)' : row.status === 'Agotado' ? 'var(--color-error-50, #fef2f2)' : 'var(--color-warning-50, #fffbeb)'"
                      [style.color]="row.status === 'Disponible' ? 'var(--color-success-700, #15803d)' : row.status === 'Agotado' ? 'var(--color-error-700, #b91c1c)' : 'var(--color-warning-700, #a16207)'"
                      style="padding: 4px 10px; border-radius: 8px; font-size: 13px; font-weight: 500;">
                  {{ row.status }}
                </span>
              </td>
              <td style="padding: 12px 16px; text-align: right; color: var(--color-text-primary); font-variant-numeric: tabular-nums;">
                \${{ row.price.toLocaleString('en-US', { minimumFractionDigits: 2 }) }}
              </td>
            </tr>
          }
          @if (filteredRows.length === 0) {
            <tr>
              <td colspan="4" style="padding: 32px 16px; text-align: center; color: var(--color-text-tertiary);">
                No se encontraron resultados con los filtros aplicados.
              </td>
            </tr>
          }
        </tbody>
      </table>

      <p style="margin: 0; font-size: 13px; color: var(--color-text-tertiary);">
        Mostrando {{ filteredRows.length }} de {{ allRows.length }} productos
      </p>
    </div>
  `,
})
class StoryCombinedFiltersComponent {
  allRows = [
    { product: 'Laptop Pro', category: 'Electronica', status: 'Disponible', price: 1299.99 },
    { product: 'Monitor 27"', category: 'Electronica', status: 'Disponible', price: 449.00 },
    { product: 'Teclado Mecanico', category: 'Accesorios', status: 'Disponible', price: 89.99 },
    { product: 'Mouse Inalambrico', category: 'Accesorios', status: 'Agotado', price: 35.50 },
    { product: 'Silla Ergonomica', category: 'Mobiliario', status: 'Poco stock', price: 599.00 },
    { product: 'Escritorio Ajustable', category: 'Mobiliario', status: 'Disponible', price: 750.00 },
    { product: 'Webcam HD', category: 'Electronica', status: 'Agotado', price: 79.99 },
    { product: 'Hub USB-C', category: 'Accesorios', status: 'Disponible', price: 45.00 },
    { product: 'Audifonos BT', category: 'Electronica', status: 'Poco stock', price: 199.99 },
    { product: 'Lampara LED', category: 'Mobiliario', status: 'Disponible', price: 65.00 },
  ];

  allCategories = ['Electronica', 'Accesorios', 'Mobiliario'];

  statusOptions = [
    { label: 'Disponible', value: 'Disponible' },
    { label: 'Agotado', value: 'Agotado' },
    { label: 'Poco stock', value: 'Poco stock' },
  ];

  conditionOptions = [
    { label: 'Es igual a', value: 'equal' },
    { label: 'Es entre', value: 'between' },
    { label: 'Es mayor que', value: 'greater' },
    { label: 'Es menor que', value: 'less' },
  ];

  // Category filter state
  pendingCategories: Record<string, boolean> = {};
  appliedCategories: Record<string, boolean> = {};

  get hasCategoryFilter(): boolean {
    return Object.values(this.appliedCategories).some(v => v);
  }

  get activeCategoryLabel(): string {
    const selected = Object.entries(this.appliedCategories).filter(([, v]) => v).map(([k]) => k);
    if (selected.length === 0) return '';
    if (selected.length === 1) return selected[0];
    return `${selected[0]} y ${selected.length - 1} mas`;
  }

  togglePendingCategory(cat: string): void { this.pendingCategories[cat] = !this.pendingCategories[cat]; }
  applyCategoryFilter(): void { this.appliedCategories = { ...this.pendingCategories }; }
  resetCategoryFilter(): void { this.pendingCategories = {}; this.appliedCategories = {}; }
  clearCategoryFilter(e: MouseEvent): void { this.resetCategoryFilter(); }

  // Status filter state
  pendingStatus = '';
  appliedStatus = '';

  onPendingStatusChange(value: string): void { this.pendingStatus = value; }
  applyStatusFilter(): void { this.appliedStatus = this.pendingStatus; }
  resetStatusFilter(): void { this.pendingStatus = ''; this.appliedStatus = ''; }
  clearStatusFilter(e: MouseEvent): void { this.resetStatusFilter(); }

  // Price condition filter state
  pendingPriceCondition = '';
  pendingPrice: number | null = null;
  pendingPriceMax: number | null = null;
  appliedPriceCondition = '';
  appliedPrice: number | null = null;
  appliedPriceMax: number | null = null;

  get isPriceFilterActive(): boolean { return !!this.appliedPriceCondition && this.appliedPrice !== null; }

  get activePriceLabel(): string {
    if (!this.isPriceFilterActive) return '';
    const label = this.conditionOptions.find(o => o.value === this.appliedPriceCondition)?.label ?? '';
    if (this.appliedPriceCondition === 'between') return `${label} \$${this.appliedPrice} - \$${this.appliedPriceMax}`;
    return `${label} \$${this.appliedPrice}`;
  }

  onPriceConditionChange(value: string): void { this.pendingPriceCondition = value; }
  applyPriceFilter(): void { this.appliedPriceCondition = this.pendingPriceCondition; this.appliedPrice = this.pendingPrice; this.appliedPriceMax = this.pendingPriceMax; }
  resetPriceFilter(): void { this.pendingPriceCondition = ''; this.pendingPrice = null; this.pendingPriceMax = null; this.appliedPriceCondition = ''; this.appliedPrice = null; this.appliedPriceMax = null; }
  clearPriceFilter(e: MouseEvent): void { this.resetPriceFilter(); }

  // Combined filtering
  get filteredRows() {
    return this.allRows.filter(row => {
      if (this.hasCategoryFilter && !this.appliedCategories[row.category]) return false;
      if (this.appliedStatus && row.status !== this.appliedStatus) return false;
      if (this.isPriceFilterActive) {
        const val = this.appliedPrice!;
        switch (this.appliedPriceCondition) {
          case 'equal': if (row.price !== val) return false; break;
          case 'greater': if (row.price <= val) return false; break;
          case 'less': if (row.price >= val) return false; break;
          case 'between': if (row.price < val || row.price > (this.appliedPriceMax ?? Infinity)) return false; break;
        }
      }
      return true;
    });
  }
}

// ── Storybook meta ────────────────────────────────────────────────────────

const meta: Meta<FilterComponent> = {
  title: 'Components/Filter',
  component: FilterComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Componente de filtro con dropdown que soporta contenido proyectado (checkboxes, selects, condiciones). Incluye estados activo/inactivo, botones de Apply/Reset y pill con resumen del filtro aplicado.',
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    active: { control: 'boolean' },
    activeLabel: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<FilterComponent>;

export const Default: Story = {
  args: {
    label: 'Status',
    active: false,
  },
  parameters: { layout: 'centered' },
  render: (args) => ({
    props: args,
    template: `
      <div style="height: 400px; padding: 20px;">
        <ds-filter [label]="label" [active]="active" [activeLabel]="activeLabel">
          <p style="margin: 0; color: var(--color-text-secondary); font-size: 14px;">
            Content for the filter menu goes here.
          </p>
        </ds-filter>
      </div>
    `,
  }),
};

export const WithCheckboxes: Story = {
  render: () => ({
    moduleMetadata: { imports: [StoryCheckboxFilterComponent] },
    template: `<story-checkbox-filter />`,
  }),
};

export const WithSelect: Story = {
  render: () => ({
    moduleMetadata: { imports: [StorySelectFilterComponent] },
    template: `<story-select-filter />`,
  }),
};

export const WithConditions: Story = {
  render: () => ({
    moduleMetadata: { imports: [StoryConditionFilterComponent] },
    template: `<story-condition-filter />`,
  }),
};

export const CombinedFilters: Story = {
  render: () => ({
    moduleMetadata: { imports: [StoryCombinedFiltersComponent] },
    template: `<story-combined-filters />`,
  }),
};
