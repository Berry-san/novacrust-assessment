import { store } from '@/store';

export type RootState = ReturnType<typeof store.getState>;

export interface Currency {
  code: string;
  name: string;
  symbol: string;
  icon: string;
  type: 'crypto' | 'fiat';
  network?: string;
}

export type AppDispatch = typeof store.dispatch;
