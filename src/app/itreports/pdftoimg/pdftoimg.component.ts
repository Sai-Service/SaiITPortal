import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component } from '@angular/core';
import { AppConst } from '../../app-const';

@Component({
  selector: 'app-pdftoimg',
  templateUrl: './pdftoimg.component.html',
  styleUrl: './pdftoimg.component.css'
})
export class PdftoimgComponent {
  // selectedFile!: File;
  selectedFile: File | null = null;
  uploadResponse: any;
  uploadProgress: number = 0;
  isLoading = false;
  downloadUrl: string = '';
  createdBy: string = 'SAGAR'; 

  selectedTab: string = 'imgtopdf';
  modalType: string | null = null;
  ServerUrl: string;

  compressedDocId: number | null = null;
  compressedDocName: string | null = null;

  mergedFileName: string = '';
  selectedFilesForMerge: File[] = [];
  statusMsg: string = '';
  statusClass: string = '';

  constructor(private http: HttpClient) {
    this.ServerUrl=AppConst.ServerUrl;
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  Pdftoimg() {
    if (!this.selectedFile) {
      alert('Please select a file first!');
      return;
    }
    
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('type', 'jpg');
    
    formData.append('createdBy', 'SAGAR');
 
    this.http.post(this.ServerUrl +'/DocCompress/convert', formData, {
      reportProgress: true,
      observe: 'events'
    }).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress && event.total) {
        // this.uploadProgress = Math.round((event.loaded / event.total) * 100);
      } else if (event.type === HttpEventType.Response) {
        this.uploadResponse = event.body;
        alert('File converted successfully!');
      }
    }, error => {
      alert('Upload failed: ' + error.message);
    });
  }

 pdfToWord() {
  if (!this.selectedFile) {
    alert('Please select a file first!');
    return;
  }
  const formData = new FormData();
  formData.append('file', this.selectedFile);
  var createdBy=sessionStorage.getItem('userName');
  // const uploadUrl = 'http://localhost:8080/DocCompress/convert?type=word&createdBy=SAGAR';
  const uploadUrl = this.ServerUrl +`/DocCompress/convert?type=word&createdBy=${createdBy}`;

  this.http.post(uploadUrl, formData, {
    reportProgress: true,
    observe: 'events'
  }).subscribe(event => {
    if (event.type === HttpEventType.UploadProgress && event.total) {
      // this.uploadProgress = Math.round((event.loaded / event.total) * 100);
    } else if (event.type === HttpEventType.Response) {
      this.uploadResponse = event.body;
      alert('File converted successfully!');
    }
  }, error => {
    alert('Upload failed: ' + error.message);
  });
}

pdfToPpt() {
    if (!this.selectedFile) {
      alert('Please select a file first!');
      return;
    }
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('type', 'ppt');
    formData.append('createdBy', 'SAGAR');

    this.http.post(this.ServerUrl +'/DocCompress/convert', formData, {
      reportProgress: true,
      observe: 'events'
    }).subscribe(event => {
      if (event.type === HttpEventType.Response) {
        this.uploadResponse = event.body;
        alert('File converted successfully!');
      }
    }, error => {
      alert('Upload failed: ' + error.message);
    });
  }

  downloadConvertedFile(docId: number) {
  const url = this.ServerUrl +`/DocCompress/download/${docId}`;
  window.open(url, '_blank');
}

onFileSelected1(event: any) {
    this.selectedFile = event.target.files[0];
  }

  imgtopdf() {
    if (!this.selectedFile) {
      alert('Please select an image file first!');
      return;
    }
  
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('createdBy', this.createdBy);

    this.isLoading = true;

    this.http.post<any>(this.ServerUrl +'/DocCompress/img-to-pdf', formData).subscribe({
  next: (response) => {
  console.log('Response:', response);
  this.uploadResponse = { status: response.code, message: response.message }; // Normalize
  if (response.code === 200 && response.obj?.docId) {
    this.downloadUrl = this.ServerUrl +`/DocCompress/download/${response.obj.docId}`;
  }
  this.isLoading = false;
},

  error: (err) => {
    alert('Error uploading file: ' + err.message);
    this.isLoading = false;
  }
});

  }

pdfToExcel() {
  if (!this.selectedFile) {
    alert('Please select a PDF file first!');
    return;
  }

  const formData = new FormData();
  formData.append('file', this.selectedFile);

  var createdBy=sessionStorage.getItem('userName');
  const uploadUrl = this.ServerUrl +`/DocCompress/convert?type=excel&createdBy=${createdBy}`;

  this.http.post(uploadUrl, formData, {
    reportProgress: true,
    observe: 'events'
  }).subscribe(event => {
    if (event.type === HttpEventType.Response) {
      this.uploadResponse = event.body;
      alert('File converted to Excel successfully!');
    }
  }, error => {
    alert('Upload failed: ' + error.message);
  });
}

pdfToText() {
  if (!this.selectedFile) {
    alert('Please select a PDF file first!');
    return;
  }

  const formData = new FormData();
  formData.append('file', this.selectedFile);

  var createdBy=sessionStorage.getItem('userName');
  const uploadUrl = this.ServerUrl + `/DocCompress/convert?type=text&createdBy=${createdBy}`;

  this.http.post(uploadUrl, formData, {
    reportProgress: true,
    observe: 'events'
  }).subscribe(event => {
    if (event.type === HttpEventType.Response) {
      this.uploadResponse = event.body;
      alert('File converted to Text successfully!');
    }
  }, error => {
    alert('Upload failed: ' + error.message);
  });
}


openModal(type: string) {
  this.modalType = type;
  this.uploadResponse = null;
  this.selectedFile = null;
}

closeModal() {
  this.modalType = null;
  this.uploadResponse = null;
  this.selectedFile = null;
}


uploadForCompression() {
  if (!this.selectedFile) {
    alert('Please select a file first!');
    return;
  }

  const formData = new FormData();
  formData.append('file', this.selectedFile);

  var createdBy=sessionStorage.getItem('userName');
  const uploadUrl = this.ServerUrl + `/DocCompress/upload?createdBy=${createdBy}`;

  this.isLoading = true;
  this.http.post<any>(uploadUrl, formData).subscribe({
    next: (response) => {
      this.uploadResponse = response;
      if (response.code === 200 && response.obj?.docId) {
        this.compressedDocId = response.obj.docId;
        this.compressedDocName = response.obj.docName;
        this.downloadUrl = `${this.ServerUrl}/DocCompress/download/${this.compressedDocId}`;
        alert('File compressed and uploaded successfully!');
      } else {
        alert('Compression failed. Missing docId.');
      }
      this.isLoading = false;
    },
    error: (err) => {
      alert('Upload failed: ' + err.message);
      this.isLoading = false;
    }
  });
}

onFilesSelectedForMerge(event: any): void {
  const newFiles: File[] = Array.from(event.target.files);

  newFiles.forEach(file => {
    const duplicate = this.selectedFilesForMerge.some(f => f.name === file.name && f.size === file.size);
    if (!duplicate) {
      if (this.selectedFilesForMerge.length < 5) {
        this.selectedFilesForMerge.push(file);
      } else {
        this.statusMsg = 'Only 5 files can be selected.';
        this.statusClass = 'status error';
      }
    }
  });

  if (this.selectedFilesForMerge.length >= 2) {
    this.statusMsg = 'Files set in progress. Please do not refresh the page.';
    this.statusClass = 'status warning';
  }

  event.target.value = '';
}

removeMergeFile(index: number): void {
  this.selectedFilesForMerge.splice(index, 1);
  if (this.selectedFilesForMerge.length < 2) {
    this.statusMsg = 'Select at least two PDF files to merge.';
    this.statusClass = 'status error';
  }
}

mergePDFs(): void {
  if (this.selectedFilesForMerge.length < 2) {
    this.statusMsg = 'Select at least two PDF files to merge.';
    this.statusClass = 'status error';
    return;
  }

  const formData = new FormData();
  this.selectedFilesForMerge.forEach(file => {
    formData.append('files', file);
  });

  this.statusMsg = 'File merging in progress. Please wait...';
  this.statusClass = 'status warning';

  const uploadUrl = this.ServerUrl + '/DocCompress/merge';

  this.http.post(uploadUrl, formData, { responseType: 'blob' }).subscribe({
    next: (blob) => {
      const finalFileName = this.mergedFileName?.trim() || 'merged_pdf';
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = `${finalFileName}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);

      this.statusMsg = 'Merge completed. File downloaded!';
      this.statusClass = 'status success';

      
      this.selectedFilesForMerge = [];
      this.mergedFileName = '';
    },
    error: (err) => {
      this.statusMsg = 'Error: ' + err.message;
      this.statusClass = 'status error';
    }
  });
}

}
