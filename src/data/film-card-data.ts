export interface FilmCardData {
  imgSrc: string;
  title: string;
  imgSrcPoster: string;
  imgAltPoster: string;
  genre: string;
  year: number;
}

export const filmCardData: FilmCardData = {
  imgSrc: 'img/bg-the-grand-budapest-hotel.jpg',
  title: 'The Grand Budapest Hotel',
  imgSrcPoster: 'img/the-grand-budapest-hotel-poster.jpg',
  imgAltPoster: 'The Grand Budapest Hotel poster',
  genre: 'Drama',
  year: 2014,
};
