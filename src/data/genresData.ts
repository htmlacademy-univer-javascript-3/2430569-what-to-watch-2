export interface Genre {
  name: string;
  isActive?: boolean;
}

export const genres: Genre[] = [
  {name: 'All genres', isActive: true},
  {name: 'Comedies'},
  {name: 'Crime'},
  {name: 'Documentary'},
  {name: 'Dramas'},
  {name: 'Horror'},
  {name: 'Kids & Family'},
  {name: 'Romance'},
  {name: 'Sci-Fi'},
  {name: 'Thrillers'},
];
