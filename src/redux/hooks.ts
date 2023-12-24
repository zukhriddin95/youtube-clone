import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState,  } from '.'

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const useAppDispatch :() => AppDispatch = useDispatch;
export const useAppSelector : TypedUseSelectorHook<RootState> = useSelector;