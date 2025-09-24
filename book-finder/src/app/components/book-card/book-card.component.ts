import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../../interfaces/booksresponse';
import { Router } from '@angular/router';
import { BooksApiService } from '../../services/books-api.service';
import { FavoriteBookApiService } from '../../services/favorite-book-api.service';
import { IFavoriteBook } from '../../interfaces/favorite-book';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css'],
})
export class BookCardComponent implements OnInit {
  @Input() book!: Book;
  @Input() mode: 'default' | 'favorites' = 'default';
  @Output() removedFromFavorites = new EventEmitter<string>();

  placeholderImg = 'https://placehold.co/400x400/gray/black?text=No+Image';
  isFavorite = false;

  constructor(
    private booksApiService: BooksApiService,
    private favoriteBookApiService: FavoriteBookApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkIfFavorite();
  }

  checkIfFavorite(): void {
    this.favoriteBookApiService.getFavoriteBooks().subscribe((favorites) => {
      const match = favorites.find((f) => f.googleId === this.book.id);
      this.isFavorite = !!match;
    });
  }

  toggleFavorite(event: MouseEvent): void {
    event.stopPropagation();

    if (this.isFavorite) {
      this.removeFromFavorites(event);
    } else {
      this.addToFavorites();
    }
  }

  removeFromFavorites(event: MouseEvent): void {
    event.stopPropagation();

    this.favoriteBookApiService.getFavoriteBooks().subscribe((favorites) => {
      const bookInDb = favorites.find(
        (fav) => fav.title === this.book.volumeInfo.title
      );

      // check if exists and has an _id
      if (bookInDb && bookInDb._id) {
        this.favoriteBookApiService
          .removeFromFavorites(bookInDb._id)
          .subscribe({
            next: () => {
              this.isFavorite = false;
              // output the id of the book removed from favorites
              this.removedFromFavorites.emit(this.book.id);
            },
            error: (err) => console.error('Error removing favorite:', err),
          });
      }
    });
  }

  addToFavorites(): void {
    // create a new type IFavoriteBook without the _id property
    const favoriteBook: Omit<IFavoriteBook, '_id'> = {
      googleId: this.book.id,
      title: this.book.volumeInfo.title,
      authors: this.book.volumeInfo.authors,
      publishedDate: this.book.volumeInfo.publishedDate,
      thumbnail: this.book.volumeInfo.imageLinks?.thumbnail,
      averageRating: this.book.volumeInfo.averageRating,
    };

    this.favoriteBookApiService.getFavoriteBooks().subscribe((favorites) => {
      if (!favorites.some((fav) => fav.title === favoriteBook.title)) {
        this.favoriteBookApiService.addToFavorites(favoriteBook).subscribe({
          next: () => {
            this.isFavorite = true;
          },
          error: (err) => console.error('Error adding favorite:', err),
        });
      } else {
        this.isFavorite = true;
      }
    });
  }

  goToDetails(): void {
    this.router.navigate(['/details', this.book.id]);
  }
}
