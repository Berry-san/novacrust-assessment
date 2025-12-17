'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

interface PaymentMethodSelectProps {
  value: string;
  onSelect: (method: string) => void;
}

const PAYMENT_METHODS = [
  { id: 'bank-transfer', name: 'Bank Transfer', icon: '🏦' },
  { id: 'mobile-money', name: 'Mobile Money', icon: '📱' },
  { id: 'card', name: 'Debit/Credit Card', icon: '💳' }
];

export function PaymentMethodSelect({ value, onSelect }: PaymentMethodSelectProps) {
  return (
    <Select value={value} onValueChange={onSelect}>
      <SelectTrigger className="w-full px-6 text-left bg-white border-gray-200 rounded-full h-14">
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectContent className="rounded-2xl">
        {PAYMENT_METHODS.map((method) => (
          <SelectItem key={method.id} value={method.id} className="px-4 py-4 cursor-pointer">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{method.icon}</span>
              <span className="font-medium">{method.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
