import { Component, OnInit } from '@angular/core';
import { FavoriteBookApiService } from '../../services/favorite-book-api.service'; // Updated import for handling favorites.
import { IFavoriteBook } from '../../interfaces/favorite-book';
import { CommonModule } from '@angular/common';
import { BookCardComponent } from '../book-card/book-card.component';
import { Book } from '../../interfaces/booksresponse';
import { BooksApiService } from '../../services/books-api.service'; // Keeping for other API functionality

@Component({
  selector: 'app-favourites',
  standalone: true,
  imports: [CommonModule, BookCardComponent],
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css'],
})
export class FavouritesComponent implements OnInit {
  favouriteBooks: Book[] = [];
  isLoading = true;

  constructor(
    private favoriteBookApiService: FavoriteBookApiService, // Updated to use FavoriteBookApiService for favorites.
    private booksApiService: BooksApiService // Keeping for other functionalities
  ) {}

  ngOnInit(): void {
    this.favoriteBookApiService.getFavoriteBooks().subscribe({
      next: (favorites: IFavoriteBook[]) => {
        this.favouriteBooks = favorites.map(
          (f): Book => ({
            id: f.googleId,
            mongoId: f._id,
            volumeInfo: {
              title: f.title,
              authors: f.authors,
              publishedDate: f.publishedDate,
              imageLinks: {
                thumbnail: f.thumbnail,
              },
              averageRating: f.averageRating,
            },
          })
        );
        // Removed the unnecessary call to booksApiService.setFavorites
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading favorites', err);
        this.isLoading = false;
      },
    });
  }

  onRemovedFromFavorites(bookId: string): void {
    const bookToRemove = this.favouriteBooks.find((b) => b.id === bookId);
    if (bookToRemove) {
      this.favouriteBooks = this.favouriteBooks.filter((b) => b.id !== bookId);

      this.favoriteBookApiService
        .removeFromFavorites(bookToRemove.mongoId)
        .subscribe({
          error: (err) => console.error('Error removing from database', err),
        });

    }
  }
}
