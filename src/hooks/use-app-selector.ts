import { TypedUseSelectorHook, useSelector } from 'react-redux';
import type { TypeState } from '../types/types';

export const useAppSelector: TypedUseSelectorHook<TypeState> = useSelector;
