import {
    Component,
    Input,
    Output,
    EventEmitter,
    OnInit,
    OnChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    LucideAngularModule,
    Info,
    CheckCircle,
    AlertTriangle,
    XCircle,
    X,
} from 'lucide-angular';

export type NotificationType = 'info' | 'success' | 'warning' | 'error' | 'default';
export type NotificationVariant = 'toast' | 'banner';

@Component({
    standalone: true,
    selector: 'app-notification',
    imports: [CommonModule, LucideAngularModule],
    templateUrl: './notification.component.html',
    styleUrl: './notification.component.scss',
})
export class NotificationComponent implements OnInit, OnChanges {
    @Input() type: NotificationType = 'info';
    @Input() variant: NotificationVariant = 'toast';
    @Input() message = '';
    @Input() title = '';
    @Input() dismissible = true;

    @Output() dismissed = new EventEmitter<void>();

    readonly XIcon = X;

    // Ícono según tipo
    readonly iconMap: Record<NotificationType, any> = {
        info: Info,
        success: CheckCircle,
        warning: AlertTriangle,
        error: XCircle,
        default: Info,
    };

    typeIcon: any = Info;
    visible = true;

    ngOnInit(): void { this.updateIcon(); }
    ngOnChanges(): void { this.updateIcon(); this.visible = true; }

    private updateIcon(): void {
        this.typeIcon = this.iconMap[this.type] ?? Info;
    }

    dismiss(): void {
        this.visible = false;
        this.dismissed.emit();
    }
}