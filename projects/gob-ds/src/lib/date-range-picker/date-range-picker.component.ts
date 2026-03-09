import {
    Component,
    Input,
    Output,
    EventEmitter,
    OnInit,
    HostListener,
    ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    LucideAngularModule,
    Calendar,
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    ArrowRight,
} from 'lucide-angular';

export interface RangeDay {
    date: Date;
    currentMonth: boolean;
    isToday: boolean;
    isSelected: boolean;
    isDisabled: boolean;
    inRange: boolean;
    isRangeStart: boolean;
    isRangeEnd: boolean;
}

export interface DateRange {
    from: Date | null;
    to: Date | null;
}

@Component({
    standalone: true,
    selector: 'app-date-range-picker',
    imports: [CommonModule, LucideAngularModule],
    templateUrl: './date-range-picker.component.html',
    styleUrl: './date-range-picker.component.scss',
})
export class DateRangePickerComponent implements OnInit {
    @Input() startPlaceholder = 'Start date';
    @Input() endPlaceholder = 'End date';
    @Input() hint = '';
    @Input() error = '';
    @Input() disabled = false;
    @Input() required = false;
    @Input() minDate: Date | null = null;
    @Input() maxDate: Date | null = null;

    @Output() rangeChange = new EventEmitter<DateRange>();

    // Lucide icons
    readonly CalendarIcon = Calendar;
    readonly ChevronLeftIcon = ChevronLeft;
    readonly ChevronRightIcon = ChevronRight;
    readonly ChevronsLeftIcon = ChevronsLeft;
    readonly ChevronsRightIcon = ChevronsRight;
    readonly ArrowRightIcon = ArrowRight;

    readonly monthNames = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ];
    readonly dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    dateFrom: Date | null = null;
    dateTo: Date | null = null;
    isOpen = false;

    // Selecting state: first click = from, second = to
    selectingFrom = true;

    leftMonth = new Date().getMonth();
    leftYear = new Date().getFullYear();

    get rightMonth(): number {
        return this.leftMonth === 11 ? 0 : this.leftMonth + 1;
    }
    get rightYear(): number {
        return this.leftMonth === 11 ? this.leftYear + 1 : this.leftYear;
    }

    leftDays: RangeDay[] = [];
    rightDays: RangeDay[] = [];

    constructor(private el: ElementRef) { }

    ngOnInit(): void { this.buildCalendars(); }

    @HostListener('document:click', ['$event'])
    onDocumentClick(e: MouseEvent): void {
        if (!this.el.nativeElement.contains(e.target)) {
            this.isOpen = false;
        }
    }

    togglePanel(): void {
        if (!this.disabled) this.isOpen = !this.isOpen;
    }

    openPanel(field: 'from' | 'to'): void {
        if (this.disabled) return;
        this.isOpen = true;
        this.selectingFrom = field === 'from';
    }

    // Click on any day
    selectDate(day: RangeDay): void {
        if (day.isDisabled) return;

        if (this.selectingFrom) {
            this.dateFrom = day.date;
            this.dateTo = null;
            this.selectingFrom = false; // slide to End date
        } else {
            if (day.date < this.dateFrom!) {
                this.dateTo = this.dateFrom;
                this.dateFrom = day.date;
            } else {
                this.dateTo = day.date;
            }
            this.selectingFrom = true;
            this.isOpen = false;
        }

        this.buildCalendars();
        this.rangeChange.emit({ from: this.dateFrom, to: this.dateTo });
    }

    // ── Navigation ───────────────────────────────────────────
    prevMonth(): void {
        if (this.leftMonth === 0) { this.leftMonth = 11; this.leftYear--; }
        else this.leftMonth--;
        this.buildCalendars();
    }

    nextMonth(): void {
        if (this.leftMonth === 11) { this.leftMonth = 0; this.leftYear++; }
        else this.leftMonth++;
        this.buildCalendars();
    }

    prevYear(): void {
        this.leftYear--;
        this.buildCalendars();
    }

    nextYear(): void {
        this.leftYear++;
        this.buildCalendars();
    }

    // ── Build calendars ──────────────────────────────────────
    buildCalendars(): void {
        this.leftDays = this.buildDays(this.leftMonth, this.leftYear);
        this.rightDays = this.buildDays(this.rightMonth, this.rightYear);
    }

    private buildDays(month: number, year: number): RangeDay[] {
        const today = new Date();
        const firstDay = new Date(year, month, 1);
        // Sunday-first week (as in design)
        const startDow = firstDay.getDay();

        const days: RangeDay[] = [];
        const prevLastDay = new Date(year, month, 0).getDate();

        for (let i = startDow - 1; i >= 0; i--) {
            days.push(this.makeDay(new Date(year, month - 1, prevLastDay - i), false, today));
        }
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(this.makeDay(new Date(year, month, i), true, today));
        }
        let next = 1;
        while (days.length < 42) {
            days.push(this.makeDay(new Date(year, month + 1, next++), false, today));
        }
        return days;
    }

    private makeDay(date: Date, currentMonth: boolean, today: Date): RangeDay {
        const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        const from = this.dateFrom ? new Date(this.dateFrom.getFullYear(), this.dateFrom.getMonth(), this.dateFrom.getDate()) : null;
        const to = this.dateTo ? new Date(this.dateTo.getFullYear(), this.dateTo.getMonth(), this.dateTo.getDate()) : null;

        const isRangeStart = !!from && this.isSameDay(d, from);
        const isRangeEnd = !!to && this.isSameDay(d, to);
        const inRange = !!from && !!to && d > from && d < to;

        return {
            date: d,
            currentMonth,
            isToday: this.isSameDay(d, today),
            isSelected: isRangeStart || isRangeEnd,
            isDisabled:
                (this.minDate ? d < this.minDate : false) ||
                (this.maxDate ? d > this.maxDate : false),
            inRange,
            isRangeStart,
            isRangeEnd,
        };
    }

    private isSameDay(a: Date, b: Date): boolean {
        return a.getFullYear() === b.getFullYear() &&
            a.getMonth() === b.getMonth() &&
            a.getDate() === b.getDate();
    }

    formatDate(date: Date): string {
        const d = date.getDate().toString().padStart(2, '0');
        const m = (date.getMonth() + 1).toString().padStart(2, '0');
        return `${d}/${m}/${date.getFullYear()}`;
    }
}