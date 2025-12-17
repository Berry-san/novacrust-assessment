'use client';

import Image from 'next/image';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { WALLET_PROVIDERS } from '@/lib/constants/wallets';

interface WalletSelectorProps {
  value: string;
  onSelect: (wallet: string) => void;
}

export function WalletSelector({ value, onSelect }: WalletSelectorProps) {
  const selectedWallet = WALLET_PROVIDERS.find((w) => w.id === value);

  return (
    <Select value={value} onValueChange={onSelect}>
      <SelectTrigger className="w-full h-12 md:h-14 rounded-full border-gray-200 bg-white text-left px-4 md:px-6">
        {selectedWallet ? (
          <div className="flex items-center gap-2 md:gap-3">
            <Image
              src={selectedWallet.icon}
              alt={selectedWallet.name}
              width={24}
              height={24}
              className="rounded w-5 h-5 md:w-7 md:h-7"
            />
            <span className="font-medium text-sm md:text-base">{selectedWallet.name}</span>
          </div>
        ) : (
          <SelectValue placeholder="Select an option" />
        )}
      </SelectTrigger>
      <SelectContent className="rounded-2xl w-[calc(100vw-2rem)] max-w-[95%] md:w-[95%] mx-auto">
        {WALLET_PROVIDERS.map((wallet) => (
          <SelectItem
            key={wallet.id}
            value={wallet.id}
            className="py-3 md:py-4 px-3 md:px-4 cursor-pointer"
          >
            <div className="flex items-center gap-2 md:gap-3">
              <Image
                src={wallet.icon}
                alt={wallet.name}
                width={24}
                height={24}
                className="rounded w-5 h-5 md:w-7 md:h-7"
              />
              <span className="font-medium text-sm md:text-base">{wallet.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
