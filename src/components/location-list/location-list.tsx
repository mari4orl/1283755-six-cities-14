import { CityName } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import classNames from 'classnames';
import { getActiveCity } from '../../store/app-process/selectors';
import { changeActiveCity } from '../../store/app-process/app-process';

function LocationList(): JSX.Element {
  const cities: CityName[] = Object.values(CityName);
  const activeCity = useAppSelector(getActiveCity);
  const dispatch = useAppDispatch();

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cities.map((item) => (
            <li key={item} className="locations__item">
              <a
                className={classNames(
                  'locations__item-link tabs__item',
                  {'tabs__item--active': item === activeCity}
                )}
                href="#"
                onClick={(evt: React.MouseEvent<HTMLElement>) => {
                  evt.preventDefault();
                  dispatch(changeActiveCity(item));
                }}
              >
                <span>{item}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default LocationList;
