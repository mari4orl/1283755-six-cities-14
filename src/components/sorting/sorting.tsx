import { useState } from 'react';
import { SortOption } from '../../const';
import { SortingType } from '../../types/types';
import cn from 'classnames';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { setSortedType } from '../../store/app-process/app-process';
import { getActiveSortedType } from '../../store/app-process/selectors';


function Sorting(): JSX.Element {
  const values: typeof SortOption[SortingType][] = Object.values(SortOption);

  const [isOpened, setIsOpened] = useState(false);
  const activeSortedType = useAppSelector(getActiveSortedType);
  const dispatch = useAppDispatch();
  function handleTypeClick() {
    setIsOpened((prevIsOpened) => !prevIsOpened);
  }

  function handleKeydown(evt: React.KeyboardEvent<HTMLFormElement>) {
    if(evt.key === 'Escape' && isOpened) {
      evt.preventDefault();
      setIsOpened(false);
    }
  }

  function handleOnClickOption(clickedOption: typeof SortOption[SortingType]) {
    dispatch(setSortedType(clickedOption));
  }

  return (
    <form className="places__sorting" action="#" method="get" onKeyDown={handleKeydown}>
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={handleTypeClick}>
        {activeSortedType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={cn(
        'places__options places__options--custom', {
          'places__options--opened': (isOpened)
        })}
      >
        {values.map((value) => (
          <li
            key={value}
            className={cn(
              'places__option', {
                'places__option--active': (value === activeSortedType)
              })}
            tabIndex={0}
            onClick={() => {
              handleOnClickOption(value);
              handleTypeClick();
            }}
          >
            {value}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default Sorting;
