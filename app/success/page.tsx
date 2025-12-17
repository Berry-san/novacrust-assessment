'use client';

import { Suspense, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const transactionId = searchParams.get('txId') || 'NC123456789';
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(transactionId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#2C2C2C] p-4">
      <div className="w-full max-w-2xl bg-white rounded-[32px] p-8 shadow-2xl animate-scale-in">
        <div className="min-h-[600px] flex flex-col justify-between">
          <div className="flex-1 flex flex-col justify-start space-y-8">
            <div className="flex justify-center">
              <Image src="/logo.svg" alt="Novacrust" width={150} height={30} priority />
            </div>

            <div className="flex justify-center pt-16">
              <div className="relative">
                <Image
                  src="/success.svg"
                  alt="Success"
                  width={72}
                  height={72}
                  className="animate-scale-in"
                />
                <div className="absolute inset-0 w-20 h-20 bg-green-500 rounded-full animate-ping opacity-20" />
              </div>
            </div>

            <div className="text-center space-y-3">
              <h1 className="text-2xl font-medium text-gray-900">
                Your transaction is processing.
              </h1>
              <p className="text-gray-600 text-lg">The recipient will receive it shortly.</p>
            </div>

            <div className="bg-[#F7F7F7] rounded-2xl p-5">
              <div className="flex items-center justify-between gap-4">
                <p className="text-xs md:text-lg text-gray-700">Transaction ID</p>
                <div className="flex items-center gap-3">
                  <p className="font-medium text-gray-900 text-xs md:text-lg">{transactionId}</p>

                  <div
                    onClick={copyToClipboard}
                    aria-label={copied ? 'Copied!' : 'Copy transaction ID'}
                  >
                    <Image
                      src="/copy.png"
                      alt="Copy"
                      width={28}
                      height={28}
                      className={cn(
                        'w-5 h-5 md:w-7 md:h-7 transition-colors cursor-pointer',
                        copied ? 'text-green-600' : 'text-gray-600'
                      )}
                    />
                  </div>
                </div>
              </div>
              {copied && (
                <p className="text-xs text-green-600 mt-2 animate-fade-in text-right">
                  Copied to clipboard!
                </p>
              )}
            </div>

            <div className="text-center">
              <Button
                onClick={handleGoHome}
                variant="link"
                className="text-teal-900 font-semibold text-lg hover:text-teal-800 transition-colors"
              >
                Go back to home
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen flex items-center justify-center bg-[#2C2C2C]">
          <div className="w-full max-w-2xl bg-white rounded-[32px] p-8 shadow-2xl">
            <div className="min-h-[600px] flex items-center justify-center">
              <div className="animate-pulse space-y-8 w-full">
                <div className="h-10 bg-gray-200 rounded w-48 mx-auto" />
                <div className="h-24 w-24 bg-gray-200 rounded-full mx-auto" />
                <div className="h-8 bg-gray-200 rounded w-64 mx-auto" />
                <div className="h-16 bg-gray-200 rounded-2xl" />
              </div>
            </div>
          </div>
        </main>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
