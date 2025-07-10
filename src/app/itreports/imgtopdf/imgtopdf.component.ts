import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-imgtopdf',
  templateUrl: './imgtopdf.component.html',
  styleUrl: './imgtopdf.component.css'
})
export class ImgtopdfComponent {
//  selectedFile: File | null = null;
//   uploadResponse: any;
//   isLoading = false;
//   downloadUrl: string = '';
//   createdBy: string = 'SAGAR'; 

//   constructor(private http: HttpClient) {}

//   onFileSelected1(event: any) {
//     this.selectedFile = event.target.files[0];
//   }

//   imgtopdf() {
//     if (!this.selectedFile) {
//       alert('Please select an image file first!');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', this.selectedFile);
//     formData.append('createdBy', this.createdBy);

//     this.isLoading = true;

//     this.http.post<any>('http://localhost:8080/DocCompress/img-to-pdf', formData).subscribe({
//   next: (response) => {
//   console.log('Response:', response);
//   this.uploadResponse = { status: response.code, message: response.message }; // Normalize
//   if (response.code === 200 && response.obj?.docId) {
//     this.downloadUrl = `http://localhost:8080/DocCompress/download/${response.obj.docId}`;
//   }
//   this.isLoading = false;
// },

//   error: (err) => {
//     alert('Error uploading file: ' + err.message);
//     this.isLoading = false;
//   }
// });

//   }

// selectedFile!: File;
selectedFile: File | null = null;
  uploadResponse: any;
  uploadProgress: number = 0;
  isLoading = false;
  downloadUrl: string = '';
  createdBy: string = 'SAGAR'; 

  selectedTab: string = 'imgtopdf';
  modalType: string | null = null;

  constructor(private http: HttpClient) {}

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

    this.http.post('http://localhost:8080/DocCompress/convert', formData, {
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

  const uploadUrl = 'http://localhost:8080/DocCompress/convert?type=word&createdBy=SAGAR';

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

    this.http.post('http://localhost:8080/DocCompress/convert', formData, {
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
  const url = `http://localhost:8080/DocCompress/download/${docId}`;
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

    this.http.post<any>('http://localhost:8080/DocCompress/img-to-pdf', formData).subscribe({
  next: (response) => {
  console.log('Response:', response);
  this.uploadResponse = { status: response.code, message: response.message }; // Normalize
  if (response.code === 200 && response.obj?.docId) {
    this.downloadUrl = `http://localhost:8080/DocCompress/download/${response.obj.docId}`;
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

  const uploadUrl = 'http://localhost:8080/DocCompress/convert?type=excel&createdBy=SAGAR';

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


}
