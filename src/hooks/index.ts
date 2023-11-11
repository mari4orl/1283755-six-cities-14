import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import type { TypeState, TypeAppDispatch } from '../types/types';

export const useAppDispatch = () => useDispatch<TypeAppDispatch>();

export const useAppSelector: TypedUseSelectorHook<TypeState> = useSelector;
