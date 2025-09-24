export interface Book {
  id: string;
  mongoId: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    publishedDate?: string;
    imageLinks?: {
      thumbnail?: string;
    };
    averageRating?: number;
  };
}

export interface BookResponse {
  items: Book[];
  totalItems: number;
}
