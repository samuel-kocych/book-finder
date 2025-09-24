import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Book } from '../../interfaces/booksresponse';
import { BooksApiService } from '../../services/books-api.service';
import { BookCardComponent } from '../book-card/book-card.component';

// defining types
type SearchField = 'intitle' | 'inauthor' | 'subject' | 'inpublisher' | 'isbn';
type Availability = 'all' | 'free-ebooks' | 'paid-ebooks' | 'ebooks';
type OrderBy = 'relevance' | 'newest';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, BookCardComponent],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  bookData: Book[] = [];
  hasSearched = false;
  currentPage = 1;
  totalResults = 0;
  featuredBooks: Book[] = [];
  isFeaturedLoading = true;
  Math = Math;

  searchField: SearchField = 'intitle';
  language = '';
  availability: Availability = 'all';
  orderBy: OrderBy = 'relevance';
  showFilters = true;

  constructor(private bookService: BooksApiService) {}

  ngOnInit(): void {
    this.bookService.getFeaturedBooks().subscribe({
      next: (books) => {
        this.featuredBooks = books;
        this.isFeaturedLoading = false;
      },
      error: () => (this.isFeaturedLoading = false),
    });
  }

  onSearch(bookName: string, isNewSearch: boolean): void {
    if (!bookName) return;
    if (isNewSearch) {
      this.currentPage = 1;
    }
    this.hasSearched = true;

    this.bookService
      .getBooks(
        bookName,
        this.searchField,
        this.currentPage,
        this.language,
        this.availability,
        this.orderBy
      )
      .subscribe({
        next: (response) => {
          this.bookData = response.books;
          this.totalResults = response.totalResults;
          window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        error: () => {
          this.bookData = [];
          this.totalResults = 0;
        },
      });
  }

  getPreviousPage(bookName: string): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.onSearch(bookName, false);
    }
  }

  getNextPage(bookName: string): void {
    const totalPages = Math.min(100, Math.ceil(this.totalResults / 10));
    if (this.currentPage < totalPages) {
      this.currentPage++;
      this.onSearch(bookName, false);
    }
  }
}
