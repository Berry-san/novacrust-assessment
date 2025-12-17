'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import Image from 'next/image';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Currency } from '@/types';

interface CurrencyInputProps {
  label: string;
  value: number;
  currency: string;
  currencies: Currency[];
  onValueChange: (value: number) => void;
  onCurrencyChange: (currency: string) => void;
  error?: string;
  readOnly?: boolean;
}

export function CurrencyInput({
  label,
  value,
  currency,
  currencies,
  onValueChange,
  onCurrencyChange,
  error,
  readOnly = false
}: CurrencyInputProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [inputValue, setInputValue] = useState(value.toFixed(2));
  const [isFocused, setIsFocused] = useState(false);

  const selectedCurrency = currencies.find((c) => c.code === currency);

  useEffect(() => {
    if (!isFocused) {
      setInputValue(value.toFixed(2));
    }
  }, [value, isFocused]);

  const filteredCurrencies = currencies.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.code.toLowerCase().includes(search.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    if (newValue === '' || /^\d*\.?\d*$/.test(newValue)) {
      setInputValue(newValue);

      const numValue = newValue === '' ? 0 : parseFloat(newValue);
      if (!isNaN(numValue)) {
        onValueChange(numValue);
      } else if (newValue === '') {
        onValueChange(0);
      }
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    // Format to 2 decimals on blur
    const numValue = inputValue === '' ? 0 : parseFloat(inputValue);
    if (!isNaN(numValue)) {
      setInputValue(numValue.toFixed(2));
    }
  };

  const renderCurrencyIcon = (curr: Currency) => {
    const isImagePath = curr.icon.startsWith('/');

    if (!isImagePath) {
      return <span className="text-xl md:text-2xl">{curr.icon}</span>;
    }

    return (
      <Image
        src={curr.icon}
        alt={curr.name}
        width={28}
        height={28}
        className="rounded-full w-6 h-6 md:w-8 md:h-8"
      />
    );
  };

  return (
    <div className="space-y-2">
      <div className="relative rounded-[24px] md:rounded-[30px] p-4 md:p-5 border border-gray-200">
        <label className="text-xs md:text-sm font-medium text-nova-gray block mb-1">{label}</label>

        <div className="flex items-center justify-between gap-3 md:gap-4">
          <input
            type="text"
            inputMode="decimal"
            value={inputValue}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            readOnly={readOnly}
            className={cn(
              'text-2xl md:text-3xl font-semibold bg-transparent border-none outline-none flex-1 min-w-0',
              readOnly && 'cursor-not-allowed'
            )}
            placeholder="0.00"
          />

          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="h-10 md:h-12 px-2 md:px-3 rounded-full bg-[#F7F7F7] border-gray-200 hover:bg-gray-50 shrink-0"
                type="button"
              >
                {selectedCurrency && renderCurrencyIcon(selectedCurrency)}
                <span className="text-base md:text-xl ml-1 md:ml-2">{currency}</span>
                <ChevronDown className="ml-1 md:ml-2 h-3 w-3 md:h-4 md:w-4 text-gray-500" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[calc(100vw-2rem)] max-w-xs p-3 rounded-2xl" align="end">
              <div className="space-y-3">
                {/* Search Input */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10 rounded-3xl border-gray-200"
                  />
                </div>

                {/* Currency List */}
                <div className="space-y-1 max-h-56 md:max-h-64 overflow-y-auto hide-scrollbar">
                  {filteredCurrencies.length === 0 ? (
                    <div className="text-center py-6 text-gray-500 text-sm">
                      No currencies found
                    </div>
                  ) : (
                    filteredCurrencies.map((curr) => (
                      <button
                        key={curr.code}
                        type="button"
                        onClick={() => {
                          onCurrencyChange(curr.code);
                          setOpen(false);
                          setSearch('');
                        }}
                        className={cn(
                          'w-full flex items-center gap-3 p-2.5 md:p-3 rounded-xl hover:bg-gray-50 transition-colors text-left',
                          curr.code === currency && 'bg-gray-100'
                        )}
                      >
                        {renderCurrencyIcon(curr)}
                        <div className="flex-1">
                          <div className="font-medium text-gray-900 text-sm md:text-base">
                            {curr.name}
                          </div>
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {error && <p className="text-xs md:text-sm text-red-500 px-2">{error}</p>}
    </div>
  );
}
