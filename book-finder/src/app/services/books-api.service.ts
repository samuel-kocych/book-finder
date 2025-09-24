import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BookResponse, Book } from '../interfaces/booksresponse';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BooksApiService {
  private apiUrl = 'https://www.googleapis.com/books/v1/volumes';
  private resultsPerPage = 9;
  constructor(private _http: HttpClient) {}

  getBooks(
    query: string,
    searchField: string = 'intitle',
    page: number = 1,
    language: string = '',
    availability: string = 'all',
    orderBy: string = 'relevance'
  ): Observable<{ books: Book[]; totalResults: number }> {
    const startIndex = (page - 1) * this.resultsPerPage;
    let url = `${this.apiUrl}?q=${searchField}:${query}&startIndex=${startIndex}&maxResults=${this.resultsPerPage}&orderBy=${orderBy}&key=${environment.apiKey}`;
    if (language) {
      url += `&langRestrict=${language}`;
    }
    if (availability !== 'all') {
      url += `&filter=${availability}`;
    }
    return this._http.get<BookResponse>(url).pipe(
      map((response) => ({
        books: response.items || [],
        totalResults: response.totalItems || 0,
      }))
    );
  }

  getBookDetails(bookId: string): Observable<any> {
    return this._http.get<any>(
      `${this.apiUrl}/${bookId}?key=${environment.apiKey}`
    );
  }

  getFeaturedBooks(): Observable<Book[]> {
    return this._http
      .get<BookResponse>(
        `${this.apiUrl}?q=subject:psychology&orderBy=relevance&maxResults=6&key=${environment.apiKey}`
      )
      .pipe(map((res) => res.items || []));
  }
}
