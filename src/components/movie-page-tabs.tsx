import {useCallback, useState} from 'react';
import {Link} from 'react-router-dom';
import {MoviePageTabDetails} from './movie-page-tab-details.tsx';
import {MoviePageTabOverview} from './movie-page-tab-overview.tsx';
import {MoviePageTabReviews} from './movie-page-tab-reviews.tsx';
import {Film} from '../types/film.ts';

const enum MoviePageTabsState {
  OVERVIEW,
  DETAILS,
  REVIEWS
}

const MOVIE_PAGE_TABS = [
  {state: MoviePageTabsState.OVERVIEW, title: 'Overview'},
  {state: MoviePageTabsState.DETAILS, title: 'Details'},
  {state: MoviePageTabsState.REVIEWS, title: 'Reviews'},
];

export const MoviePageTabs = ({film}: {film: Film}) => {
  const [activeTab, setActiveTab] = useState(MoviePageTabsState.OVERVIEW);
  const handleTabClick = useCallback((event: React.MouseEvent<HTMLLIElement>) => {
    const { innerText } = event.currentTarget;
    switch (innerText) {
      case 'Overview':
        setActiveTab(MoviePageTabsState.OVERVIEW);
        break;
      case 'Details':
        setActiveTab(MoviePageTabsState.DETAILS);
        break;
      case 'Reviews':
        setActiveTab(MoviePageTabsState.REVIEWS);
        break;
    }
  }, []);

  return (
    <div className="film-card__desc">
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          {MOVIE_PAGE_TABS.map((tab) => (
            <li
              key={tab.state}
              className={`film-nav__item ${tab.state === activeTab ? 'film-nav__item--active' : ''}`}
              onClick={handleTabClick}
            >
              <Link to="#" className="film-nav__link">{tab.title}</Link>
            </li>
          ))}
        </ul>
      </nav>

      {activeTab === MoviePageTabsState.OVERVIEW ? <MoviePageTabOverview film={film}/> : null}
      {activeTab === MoviePageTabsState.DETAILS ? <MoviePageTabDetails film={film}/> : null}
      {activeTab === MoviePageTabsState.REVIEWS ? <MoviePageTabReviews/> : null}
    </div>
  );
};
