import { CityName } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { TypeState } from '../../types/types';
import { changeCity } from '../../store/action';
import classNames from 'classnames';

function LocationList(): JSX.Element {
  const cities: string[] = Object.values(CityName);
  const activeCity = useAppSelector((state: TypeState): string => state.activeCity);
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
                  dispatch(changeCity({activeCity: item}));
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
