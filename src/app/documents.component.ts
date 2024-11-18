import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CONSTANTS } from '../../constants';
import { CommonModule } from '@angular/common';
import { UpdateDocument } from '../component/DocumentManagement/UpdateDocument.component';

@Component({
  selector: 'Documents',
  imports: [CommonModule,UpdateDocument],
  standalone: true,
  template: `
    <div class="grid gap-5 ">
      <div class="grid grid-cols-6 font-medium text-lg pl-5">
        <div class=" col-span-2">Name</div>
        <div>Created At</div>
        <div>Updated At</div>
        <div>Active</div>
        <div></div>
      </div>

      <!-- Loop through documents and display them -->
      <div *ngFor="let document of documents; let i = index" class="grid grid-cols-6 gap-2 border-b border-[#000000]/70">
        <div class="flex col-span-2 gap-3">
          <p class="font-medium">{{ i + 1 }}</p>
          <p>{{ document.filename }}</p>
        </div>

        <!-- Format the UploadedAt field -->
        <div>{{ document.UploadedAt | date: 'dd MMMM yyyy' }}</div>

        <!-- Format the UpdatedAt field -->
        <div>{{ document.UpdatedAt | date: 'dd MMMM yyyy' }}</div>

        <div>{{ document.active ? 'Yes' : 'No' }}</div>

        <div class=" flex justify-evenly">

            <UpdateDocument [documentName]="document.filename" />

          <div (click)="deleteDocument(document.filename)" class=" p-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="#BA3D28" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M17.9 9.05C15.72 8.83 13.52 8.72 11.33 8.72C10.03 8.72 8.72997 8.79 7.43997 8.92L6.09998 9.05" stroke="#BA3D28" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M9.70996 8.39L9.84996 7.53C9.94996 6.91 10.03 6.44 11.14 6.44H12.86C13.97 6.44 14.0499 6.93 14.1499 7.53L14.2899 8.38" stroke="#BA3D28" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M16.49 9.13L16.06 15.73C15.99 16.76 15.93 17.56 14.1 17.56H9.89C8.06 17.56 7.99999 16.76 7.92999 15.73L7.5 9.13" stroke="#BA3D28" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>


        </div>
        
      </div>

    </div>
  `,
})
export class Documents implements OnInit {
  documents: any[] = [];  // Store documents data here

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchDocuments()
  }

  fetchDocuments(){
    // Make the API call here to fetch documents
    this.http.get<any>(CONSTANTS.API_URL + "/list").subscribe(
      (data) => {
        this.documents = data.documents;  // Store the documents in the component property
        console.log("Documents : ", data)
      },
      (error) => {
        console.error('Error fetching documents:', error);  // Handle any error
      }
    );
  }

  // Method to handle document deletion (if needed)
  deleteDocument(filename: string) {
    this.http.delete<void>(CONSTANTS.API_URL + "/delete/"+filename).subscribe(
      () => {
        // After successful deletion, remove the document from the array
        this.documents = this.documents.filter((doc) => doc.filename !== filename);
      },
      (error) => {
        console.error('Error deleting document:', error);  // Handle any error during deletion
      }
    );
  }
}
