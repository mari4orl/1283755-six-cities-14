import { useDispatch } from 'react-redux';
import type { TypeAppDispatch } from '../types/types';

export const useAppDispatch = () => useDispatch<TypeAppDispatch>();
