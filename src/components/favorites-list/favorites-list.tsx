import { PreviewOfferType } from '../../types/types';
import { useAppSelector } from '../../hooks/use-app-selector';
import { getFavoritesOffers } from '../../store/offers-data/selectors';
import FavoriteCard from '../favorite-card/favorite-card';

function getFavoritesByCity(favorites: PreviewOfferType[]){
  return favorites.reduce<{[key: string]: PreviewOfferType[]}>((acc, curr) => {
    const city = curr.city.name;

    if(!(city in acc)) {
      acc[city] = [];
    }

    acc[city].push(curr);
    return acc;
  }, {});
}

function FavoritesList() {
  const favorites = useAppSelector(getFavoritesOffers);

  const favoritesByCity = getFavoritesByCity(favorites);

  return (
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          <ul className="favorites__list">
            {Object.entries(favoritesByCity).map(([city, groupedFavorites]) => (
              <li key={city} className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <a className="locations__item-link" href="#">
                      <span>{city}</span>
                    </a>
                  </div>
                </div>
                <div className="favorites__places">
                  {groupedFavorites.map((item) =>
                    <FavoriteCard offer={item} city={item.city.name} key={item.id} />
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}

export default FavoritesList;
