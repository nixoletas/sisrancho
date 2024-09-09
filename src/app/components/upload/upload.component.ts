import { Component } from '@angular/core';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  standalone: true,

  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {
  selectedFile: File | null = null;

  constructor(private fileUploadService: FileUploadService) { }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onUpload(): void {
    if (this.selectedFile) {
      this.fileUploadService.uploadFile(this.selectedFile).subscribe(
        (blob: Blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'material-carga.csv';
          a.click();
        },
        error => console.error('Error uploading file:', error)
      );
    }
  }
}
