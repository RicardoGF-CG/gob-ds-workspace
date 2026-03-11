import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, X, Download } from 'lucide-angular';

export interface FileUploadItem {
  file: File;
  id: string;
}

export interface DownloadButton {
  label: string;
  url?: string;
}

@Component({
  standalone: true,
  selector: 'sf-file-upload',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss',
})
export class FileUploadComponent {
  @Input() label = '';
  @Input() required = false;
  @Input() accept = '';
  @Input() allowedExtensions: string[] = [];
  @Input() multiple = true;
  @Input() maxSizeMb = 10;
  @Input() downloadButtons: DownloadButton[] = [];
  @Input() iconSrc = '';

  @Output() filesChange = new EventEmitter<FileUploadItem[]>();
  @Output() fileRemoved = new EventEmitter<FileUploadItem>();
  @Output() downloadClick = new EventEmitter<DownloadButton>();

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  files: FileUploadItem[] = [];
  isDragOver = false;

  readonly xIcon = X;
  readonly downloadIcon = Download;

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;

    const droppedFiles = event.dataTransfer?.files;
    if (droppedFiles) {
      this.addFiles(droppedFiles);
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.addFiles(input.files);
      input.value = '';
    }
  }

  openFilePicker(): void {
    this.fileInput.nativeElement.click();
  }

  removeFile(item: FileUploadItem): void {
    this.files = this.files.filter(f => f.id !== item.id);
    this.fileRemoved.emit(item);
    this.filesChange.emit(this.files);
  }

  onDownloadClick(btn: DownloadButton): void {
    this.downloadClick.emit(btn);
  }

  formatSize(bytes: number): string {
    if (bytes < 1024) return bytes + 'B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + 'KB';
    return (bytes / (1024 * 1024)).toFixed(1) + 'MB';
  }

  getExtension(name: string): string {
    const parts = name.split('.');
    return parts.length > 1 ? parts.pop()!.toUpperCase() : '';
  }

  getAcceptedTypesDisplay(): string {
    const extensions = this.allowedExtensions.length > 0 
      ? this.allowedExtensions 
      : this.accept.split(',').filter(ext => ext.trim());

    if (extensions.length === 0) return 'todos los archivos';

    return extensions
      .map(ext => ext.trim().replace('.', '').toUpperCase())
      .join(', ');
  }

  get computedAccept(): string {
    if (this.allowedExtensions.length > 0) {
      return this.allowedExtensions
        .map(ext => (ext.startsWith('.') ? ext : `.${ext}`))
        .join(',');
    }
    return this.accept;
  }

  private isFileTypeAllowed(file: File): boolean {
    const accept = this.computedAccept;
    if (!accept) return true;

    const fileExtension = '.' + this.getExtension(file.name).toLowerCase();
    const allowedTypes = accept.split(',').map(type => type.trim().toLowerCase());

    return allowedTypes.some(type => {
      if (type.startsWith('.')) {
        return fileExtension === type;
      }
      if (type.includes('/*')) {
        const mimeTypePrefix = type.replace('/*', '');
        return file.type.startsWith(mimeTypePrefix);
      }
      return file.type === type;
    });
  }

  private addFiles(fileList: FileList): void {
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      const isSizeAllowed = file.size <= this.maxSizeMb * 1024 * 1024;
      const isExtensionAllowed = this.isFileTypeAllowed(file);

      if (isSizeAllowed && isExtensionAllowed) {
        this.files.push({
          file,
          id: crypto.randomUUID(),
        });
      }
    }
    this.filesChange.emit(this.files);
  }
}
