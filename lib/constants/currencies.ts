import { Currency } from '@/types';

export const CRYPTO_CURRENCIES: Currency[] = [
  {
    code: 'ETH',
    name: 'Ethereum',
    symbol: 'ETH',
    icon: '/currencies/ethereum.png',
    type: 'crypto'
  },
  {
    code: 'USDT-CELO',
    name: 'USDT - CELO',
    symbol: 'USDT',
    icon: '/currencies/usdtCelo.png',
    type: 'crypto',
    network: 'CELO'
  },
  {
    code: 'USDT-TON',
    name: 'USDT - TON',
    symbol: 'USDT',
    icon: '/currencies/usdtTon.png',
    type: 'crypto',
    network: 'TON'
  },
  {
    code: 'USDT-BNB',
    name: 'USDT - BNB',
    symbol: 'USDT',
    icon: '/currencies/usdtBnb.png',
    type: 'crypto',
    network: 'BNB'
  }
];

export const FIAT_CURRENCIES: Currency[] = [
  {
    code: 'NGN',
    name: 'Nigerian Naira',
    symbol: '₦',
    icon: '🇳🇬',
    type: 'fiat'
  },
  {
    code: 'USD',
    name: 'US Dollar',
    symbol: '$',
    icon: '🇺🇸',
    type: 'fiat'
  }
];

export const ALL_CURRENCIES = [...CRYPTO_CURRENCIES, ...FIAT_CURRENCIES];
