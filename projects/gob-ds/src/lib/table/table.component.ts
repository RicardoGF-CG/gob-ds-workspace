import {
  Component,
  Input,
  Output,
  EventEmitter,
  ContentChild,
  TemplateRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  LucideAngularModule,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Ellipsis,
  AlertCircle,
  Inbox,
} from 'lucide-angular';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { SkeletonComponent } from '../skeleton/skeleton.component';
import { ContextMenuComponent, ContextMenuItem } from '../context-menu/context-menu.component';

export type SortDirection = 'asc' | 'desc' | null;

export interface TableColumn<T = any> {
  /** Unique key matching the property name in row data */
  key: string;
  /** Display label for the column header */
  label: string;
  /** Whether this column can be sorted */
  sortable?: boolean;
  /** Custom cell template — receives row data as implicit context and column as `column` */
  cellTemplate?: TemplateRef<any>;
  /** Optional width (e.g. '200px', '30%') */
  width?: string;
  /** Text alignment */
  align?: 'left' | 'center' | 'right';
}

export interface TableSortEvent {
  key: string;
  direction: SortDirection;
}

export interface TablePageEvent {
  page: number;
  pageSize: number;
}

@Component({
  standalone: true,
  selector: 'sf-table',
  imports: [
    CommonModule,
    LucideAngularModule,
    CheckboxComponent,
    SkeletonComponent,
    ContextMenuComponent,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent<T extends Record<string, any> = Record<string, any>> {
  // ── Data ───────────────────────────────────────────────
  @Input() columns: TableColumn<T>[] = [];
  @Input() data: T[] = [];

  // ── States ─────────────────────────────────────────────
  @Input() loading = false;
  @Input() error = false;
  @Input() errorMessage = 'An error occurred while loading data.';
  @Input() emptyMessage = 'No data available.';

  // ── Selection ──────────────────────────────────────────
  @Input() selectable = false;
  @Input() selectedRows: T[] = [];
  @Output() selectedRowsChange = new EventEmitter<T[]>();

  // ── Row Actions ────────────────────────────────────────
  @Input() rowActions: ContextMenuItem[] = [];
  @Output() rowActionClick = new EventEmitter<{ item: ContextMenuItem; row: T }>();

  // ── Sorting ────────────────────────────────────────────
  @Input() sortKey: string | null = null;
  @Input() sortDirection: SortDirection = null;
  @Output() sortChange = new EventEmitter<TableSortEvent>();

  // ── Pagination ─────────────────────────────────────────
  @Input() paginated = false;
  @Input() pageSize = 20;
  @Input() pageSizeOptions: number[] = [10, 20, 50, 100];
  @Input() currentPage = 1;
  @Input() totalItems = 0;
  @Output() pageChange = new EventEmitter<TablePageEvent>();
  @Output() pageSizeChange = new EventEmitter<number>();

  // ── Skeleton ───────────────────────────────────────────
  @Input() skeletonRows = 5;

  // ── Custom templates ───────────────────────────────────
  @ContentChild('actions') actionsTemplate!: TemplateRef<any>;
  @ContentChild('empty') emptyTemplate!: TemplateRef<any>;
  @ContentChild('error') errorTemplate!: TemplateRef<any>;

  // ── Icons ──────────────────────────────────────────────
  readonly ArrowUpDown = ArrowUpDown;
  readonly ArrowUp = ArrowUp;
  readonly ArrowDown = ArrowDown;
  readonly ChevronLeft = ChevronLeft;
  readonly ChevronRight = ChevronRight;
  readonly ChevronsLeft = ChevronsLeft;
  readonly ChevronsRight = ChevronsRight;
  readonly Ellipsis = Ellipsis;
  readonly AlertCircle = AlertCircle;
  readonly Inbox = Inbox;

  // ── Computed ───────────────────────────────────────────
  get sortedData(): T[] {
    if (!this.sortKey || !this.sortDirection) return this.data;
    const key = this.sortKey;
    const dir = this.sortDirection === 'asc' ? 1 : -1;
    return [...this.data].sort((a, b) => {
      const valA = a[key];
      const valB = b[key];
      if (valA == null && valB == null) return 0;
      if (valA == null) return 1;
      if (valB == null) return -1;
      if (typeof valA === 'number' && typeof valB === 'number') return (valA - valB) * dir;
      return String(valA).localeCompare(String(valB)) * dir;
    });
  }

  get totalPages(): number {
    if (!this.paginated || this.totalItems === 0) return 1;
    return Math.ceil(this.totalItems / this.pageSize);
  }

  get paginationStart(): number {
    return (this.currentPage - 1) * this.pageSize + 1;
  }

  get paginationEnd(): number {
    return Math.min(this.currentPage * this.pageSize, this.totalItems);
  }

  get isAllSelected(): boolean {
    return this.data.length > 0 && this.selectedRows.length === this.data.length;
  }

  get isIndeterminate(): boolean {
    return this.selectedRows.length > 0 && this.selectedRows.length < this.data.length;
  }

  get skeletonRowsArray(): number[] {
    return Array.from({ length: this.skeletonRows });
  }

  get visibleColumns(): number {
    return (
      this.columns.length +
      (this.selectable ? 1 : 0) +
      (this.actionsTemplate || this.rowActions.length > 0 ? 1 : 0)
    );
  }

  // ── Sort ───────────────────────────────────────────────
  onSort(column: TableColumn<T>): void {
    if (!column.sortable) return;

    let direction: SortDirection;
    if (this.sortKey === column.key) {
      // Cycle: asc → desc → null
      if (this.sortDirection === 'asc') direction = 'desc';
      else if (this.sortDirection === 'desc') direction = null;
      else direction = 'asc';
    } else {
      direction = 'asc';
    }

    this.sortKey = direction ? column.key : null;
    this.sortDirection = direction;
    this.sortChange.emit({ key: column.key, direction });
  }

  getSortIcon(column: TableColumn<T>) {
    if (this.sortKey !== column.key || !this.sortDirection) return this.ArrowUpDown;
    return this.sortDirection === 'asc' ? this.ArrowUp : this.ArrowDown;
  }

  // ── Selection ──────────────────────────────────────────
  toggleAll(): void {
    if (this.isAllSelected || this.isIndeterminate) {
      this.selectedRows = [];
    } else {
      this.selectedRows = [...this.data];
    }
    this.selectedRowsChange.emit(this.selectedRows);
  }

  toggleRow(row: T): void {
    const idx = this.selectedRows.indexOf(row);
    if (idx >= 0) {
      this.selectedRows = this.selectedRows.filter((_, i) => i !== idx);
    } else {
      this.selectedRows = [...this.selectedRows, row];
    }
    this.selectedRowsChange.emit(this.selectedRows);
  }

  onRowActionClick(item: ContextMenuItem, row: T): void {
    this.rowActionClick.emit({ item, row });
  }

  isRowSelected(row: T): boolean {
    return this.selectedRows.includes(row);
  }

  // ── Pagination ─────────────────────────────────────────
  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages || page === this.currentPage) return;
    this.currentPage = page;
    this.pageChange.emit({ page: this.currentPage, pageSize: this.pageSize });
  }

  onPageSizeChange(event: Event): void {
    const newSize = Number((event.target as HTMLSelectElement).value);
    this.pageSize = newSize;
    this.currentPage = 1;
    this.pageSizeChange.emit(newSize);
    this.pageChange.emit({ page: 1, pageSize: newSize });
  }

  getCellValue(row: T, key: string): any {
    return row[key];
  }
}
