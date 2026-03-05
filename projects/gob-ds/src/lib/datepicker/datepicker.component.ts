import {
    Component,
    Input,
    Output,
    EventEmitter,
    OnInit,
    OnChanges,
    HostListener,
    ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Calendar, ChevronLeft, ChevronRight, ChevronDown, X } from 'lucide-angular';

export type DatepickerSize = 'sm' | 'md' | 'lg';
export type DatepickerState = 'default' | 'error' | 'success' | 'disabled';

export interface CalendarDay {
    date: Date;
    currentMonth: boolean;
    isToday: boolean;
    isSelected: boolean;
    isDisabled: boolean;
}

@Component({
    standalone: true,
    selector: 'app-datepicker',
    imports: [CommonModule, LucideAngularModule],
    templateUrl: './datepicker.component.html',
    styleUrl: './datepicker.component.scss',
})
export class DatepickerComponent implements OnInit, OnChanges {
    @Input() label = '';
    @Input() placeholder = 'dd/mm/aaaa';
    @Input() size: DatepickerSize = 'md';
    @Input() state: DatepickerState = 'default';
    @Input() required = false;
    @Input() helperText = '';
    @Input() minDate: Date | null = null;
    @Input() maxDate: Date | null = null;
    @Input() value: Date | null = null;

    @Output() dateChange = new EventEmitter<Date | null>();

    // Lucide icons
    readonly CalendarIcon = Calendar;
    readonly ChevronLeftIcon = ChevronLeft;
    readonly ChevronRightIcon = ChevronRight;
    readonly ChevronDownIcon = ChevronDown;
    readonly XIcon = X;

    readonly monthNames = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
    ];
    readonly dayNames = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'];

    selectedDate: Date | null = null;
    isOpen = false;
    currentMonth = new Date().getMonth();
    currentYear = new Date().getFullYear();
    calendarDays: CalendarDay[] = [];

    constructor(private el: ElementRef) { }

    ngOnInit(): void {
        this.syncValue();
        this.buildCalendar();
    }

    ngOnChanges(): void {
        this.syncValue();
        this.buildCalendar();
    }

    private syncValue(): void {
        if (this.value) {
            this.selectedDate = this.value;
            this.currentMonth = this.value.getMonth();
            this.currentYear = this.value.getFullYear();
        }
    }

    @HostListener('document:click', ['$event'])
    onDocumentClick(e: MouseEvent): void {
        if (!this.el.nativeElement.contains(e.target)) {
            this.isOpen = false;
        }
    }

    toggleCalendar(): void {
        if (this.state !== 'disabled') this.isOpen = !this.isOpen;
    }

    buildCalendar(): void {
        const today = new Date();
        const firstDay = new Date(this.currentYear, this.currentMonth, 1);
        let startDow = firstDay.getDay();
        startDow = startDow === 0 ? 6 : startDow - 1;

        const days: CalendarDay[] = [];
        const prevLastDay = new Date(this.currentYear, this.currentMonth, 0).getDate();

        for (let i = startDow - 1; i >= 0; i--) {
            days.push(this.makeDay(new Date(this.currentYear, this.currentMonth - 1, prevLastDay - i), false, today));
        }
        const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(this.makeDay(new Date(this.currentYear, this.currentMonth, i), true, today));
        }
        let next = 1;
        while (days.length < 42) {
            days.push(this.makeDay(new Date(this.currentYear, this.currentMonth + 1, next++), false, today));
        }
        this.calendarDays = days;
    }

    private makeDay(date: Date, currentMonth: boolean, today: Date): CalendarDay {
        return {
            date,
            currentMonth,
            isToday: this.isSameDay(date, today),
            isSelected: this.selectedDate ? this.isSameDay(date, this.selectedDate) : false,
            isDisabled:
                (this.minDate ? date < this.minDate : false) ||
                (this.maxDate ? date > this.maxDate : false),
        };
    }

    private isSameDay(a: Date, b: Date): boolean {
        return a.getFullYear() === b.getFullYear() &&
            a.getMonth() === b.getMonth() &&
            a.getDate() === b.getDate();
    }

    selectDay(day: CalendarDay): void {
        if (day.isDisabled) return;
        this.selectedDate = day.date;
        this.isOpen = false;
        this.buildCalendar();
        this.dateChange.emit(this.selectedDate);
    }

    selectToday(): void {
        const today = new Date();
        this.selectedDate = today;
        this.currentMonth = today.getMonth();
        this.currentYear = today.getFullYear();
        this.isOpen = false;
        this.buildCalendar();
        this.dateChange.emit(this.selectedDate);
    }

    clearDate(event?: MouseEvent): void {
        event?.stopPropagation();
        this.selectedDate = null;
        this.buildCalendar();
        this.dateChange.emit(null);
    }

    prevMonth(): void {
        if (this.currentMonth === 0) { this.currentMonth = 11; this.currentYear--; }
        else this.currentMonth--;
        this.buildCalendar();
    }

    nextMonth(): void {
        if (this.currentMonth === 11) { this.currentMonth = 0; this.currentYear++; }
        else this.currentMonth++;
        this.buildCalendar();
    }

    formatDate(date: Date): string {
        const d = date.getDate().toString().padStart(2, '0');
        const m = (date.getMonth() + 1).toString().padStart(2, '0');
        return `${d}/${m}/${date.getFullYear()}`;
    }
}