import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BooksApiService } from '../../services/books-api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details',
  imports: [CommonModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  book: any;
  showFullDescription = false;

  constructor(
    private route: ActivatedRoute,
    private booksApiService: BooksApiService
  ) {}

  ngOnInit(): void {
    // get th book id from url
    const bookId = this.route.snapshot.paramMap.get('id');
    if (bookId) {
      // load book details
      this.booksApiService
        .getBookDetails(bookId)
        .subscribe((book) => (this.book = book));
    }
  }

  toggleDescription(): void {
    this.showFullDescription = !this.showFullDescription;
  }
}
