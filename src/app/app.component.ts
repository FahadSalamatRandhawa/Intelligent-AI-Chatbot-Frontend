import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AccordionPreviewComponent } from '../component/accordion.component';
import { TopLayer } from './toplayer.component';
import { Documents } from './documents.component';
import { HttpClientModule } from '@angular/common/http';
import { ChatboxComponent } from '../component/Chat/Chat.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,AccordionPreviewComponent,TopLayer,Documents,ChatboxComponent],
  template:`
  <div class=' flex flex-col px-6 py-3 min-h-screen w-full gap-10'>
    <top-layer (refetchDocuments)="refetchDocuments()" />
    <Documents #documentsRef />

    <ChatBox/>
  </div>
  `
  // templateUrl: './app.component.html',
  // styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit {
  @ViewChild('documentsRef') documentsComponent!: Documents;

  title = 'ai_chat';

  ngAfterViewInit() {
    // Access the documentsComponent and call its method if needed
    console.log('Documents Component Instance:', this.documentsComponent);
  }

  refetchDocuments() {
    console.log("Refetch event Captured...");

    // Call the fetchDocuments method from Documents component
    if (this.documentsComponent) {
      console.log("Refetching documents")
      this.documentsComponent.fetchDocuments();
    }
  }
}
