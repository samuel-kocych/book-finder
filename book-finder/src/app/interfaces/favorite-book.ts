export interface IFavoriteBook {
  _id: string;
  googleId: string;
  title: string;
  authors?: string[];
  publishedDate?: string;
  thumbnail?: string;
  averageRating?: number;
}

export class FavoriteBook implements IFavoriteBook {
  _id!: string;
  googleId: string;
  title: string;
  authors?: string[];
  publishedDate?: string;
  thumbnail?: string;
  averageRating?: number;

  constructor(
    title: string,
    googleId: string,
    authors?: string[],
    publishedDate?: string,
    thumbnail?: string,
    averageRating?: number
  ) {
    this.googleId = googleId;
    this.title = title;
    this.authors = authors;
    this.publishedDate = publishedDate;
    this.thumbnail = thumbnail;
    this.averageRating = averageRating;
  }
}
