export interface WalletProvider {
  id: string;
  name: string;
  icon: string;
  description?: string;
}

export const WALLET_PROVIDERS: WalletProvider[] = [
  {
    id: 'metamask',
    name: 'Metamask',
    icon: '/wallets/metamask.png',
    description: 'Connect with Metamask wallet'
  },
  {
    id: 'rainbow',
    name: 'Rainbow',
    icon: '/wallets/rainbow.png',
    description: 'Connect with Rainbow wallet'
  },
  {
    id: 'walletconnect',
    name: 'WalletConnect',
    icon: '/wallets/walletConnect.png',
    description: 'Connect with WalletConnect'
  },
  {
    id: 'other',
    name: 'Other Crypto Wallets (Binance, Coinbase, Bybit etc)',
    icon: '/wallets/others.png',
    description: 'Other wallet providers'
  }
];
