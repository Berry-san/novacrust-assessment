'use client';

import { ArrowLeftIcon, CopyIcon, InfoIcon } from '@/components/svgs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ETHDepositPage() {
  const router = useRouter();
  const [copied, setCopied] = useState('');
  const address = '4LiV4YjbxsL6739MKghUd';
  const amount = '100 ETH';

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#2C2C2C] p-4 py-6 md:p-4">
      <div className="w-full max-w-2xl bg-white rounded-[28px] md:rounded-[32px] px-6 py-6 md:px-12 md:py-8 shadow-2xl animate-scale-in">
        <div className="relative hidden p-6 sm:block">
          <button
            onClick={() => router.back()}
            className="absolute flex items-center justify-center w-10 h-10 font-bold transition-colors -translate-y-1/2 rounded-full left-6 top-1/2"
          >
            <ArrowLeftIcon className="text-gray-700 w-7 h-7" />
          </button>
          <h1 className="text-lg font-semibold text-center text-nova">
            Send ETH to the address below
          </h1>
        </div>
        <div className="flex flex-col px-6 space-y-2 items sm:hidden">
          <button
            onClick={() => router.back()}
            className="flex items-center justify-start w-10 h-10 font-bold transition-colors rounded-full"
          >
            <ArrowLeftIcon className="text-gray-700 w-7 h-7" />
          </button>
          <h1 className="text-lg font-semibold text-nova">Send ETH to the address below</h1>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-3 px-5 py-3 border-2 border-[#CCF6E5] bg-[#E6FBF2] rounded-full text-nova text-base font-medium shrink-0">
              <span className="">{address}</span>
              {copied === 'address' ? (
                <span className="text-xs font-medium text-nova whitespace-nowrap">Copied!</span>
              ) : (
                <button
                  onClick={() => handleCopy(address, 'address')}
                  className="flex items-center justify-center w-8 h-8 transition-colors"
                >
                  <CopyIcon className="w-5 h-5 " />
                </button>
              )}
            </div>
          </div>

          <div className="p-4 space-y-4 bg-gray-50 rounded-xl">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Amount to send</span>
              <div className="flex items-center gap-2">
                <span className="text-base font-semibold text-nova">{amount}</span>
                {copied === 'amount' ? (
                  <span className="text-xs font-medium text-teal-600 whitespace-nowrap">
                    Copied!
                  </span>
                ) : (
                  <button
                    onClick={() => handleCopy(amount, 'amount')}
                    className="flex items-center justify-center w-8 h-8 transition-colors"
                  >
                    <CopyIcon className="w-4 h-4 text-nova" />
                  </button>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Network</span>
              <span className="text-base font-semibold text-nova">ETH</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Wallet</span>
              <span className="text-base font-semibold text-nova">Other</span>
            </div>
          </div>

          <div className="flex gap-3 font-medium">
            <InfoIcon className="w-6 h-6 text-nova flex-shrink-0 mt-0.5" />
            <p className="text-sm leading-relaxed text-gray-700">
              Only send (USDT) to this address. Ensure the sender is on the (CELO) network otherwise
              you might lose your deposit
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="p-6 pt-0">
          <button className="w-full h-12 text-base font-semibold transition-all rounded-full md:h-14 bg-nova hover:bg-nova text-nova-light-teal md:text-lg">
            I have sent it
          </button>
        </div>
      </div>
    </div>
  );
}
