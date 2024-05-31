export type TMovie = {
  title: string;
  movieUrl: string;
  category: string;
  director: string;
  duration: number;
  rating: number;
  genres: string[];
  actors: string[];
  languages: string[];
  description?: string;
  releaseDate: Date;
  isDeleted: boolean;
  status: 'active' | 'inactive';
};
