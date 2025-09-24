import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IFavoriteBook } from '../interfaces/favorite-book';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FavoriteBookApiService {
  private apiUrl = environment.serverUrl;

  constructor(private http: HttpClient) {}

  getFavoriteBooks(): Observable<IFavoriteBook[]> {
    return this.http.get<IFavoriteBook[]>(this.apiUrl);
  }

  addToFavorites(book: Omit<IFavoriteBook, '_id'>): Observable<IFavoriteBook> {
    return this.http.post<IFavoriteBook>(this.apiUrl, book);
  }

  removeFromFavorites(bookId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${bookId}`);
  }
}
