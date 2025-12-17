'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { CRYPTO_CURRENCIES, FIAT_CURRENCIES } from '@/lib/constants/currencies';
import { ComingSoonFormData, comingSoonSchema } from '@/lib/validations/coming-soon-schema';
import { ConversionFormData, conversionSchema } from '@/lib/validations/conversion-schema';
import { CurrencyInput } from './currency-input';
import { PaymentMethodSelect } from './payment-method-select';
import { WalletSelector } from './wallet-selector';

export function ConversionWidget() {
  const [activeTab, setActiveTab] = useState('crypto-to-cash');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<ConversionFormData>({
    resolver: zodResolver(conversionSchema),
    defaultValues: {
      payAmount: 1.0,
      payCurrency: 'ETH',
      receiveAmount: 1.0,
      receiveCurrency: 'NGN',
      payFrom: '',
      payTo: ''
    }
  });

  const payAmount = form.watch('payAmount');
  const payCurrency = form.watch('payCurrency');
  const receiveCurrency = form.watch('receiveCurrency');

  useEffect(() => {
    if (payAmount && payCurrency && receiveCurrency) {
      const mockExchangeRate = 1500;
      const receiveAmount = payAmount * mockExchangeRate;
      form.setValue('receiveAmount', receiveAmount);
    }
  }, [payAmount, payCurrency, receiveCurrency, form]);

  const onSubmit = async (data: ConversionFormData) => {
    if (Object.keys(form.formState.errors).length > 0) {
      return;
    }

    setIsLoading(true);
    console.log(data);

    try {
      router.push(`/confirmation`);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl bg-white rounded-[28px] md:rounded-[32px] px-6 py-6 md:px-12 md:py-8 shadow-2xl animate-scale-in">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList>
          <TabsTrigger value="crypto-to-cash">Crypto to cash</TabsTrigger>
          <TabsTrigger value="cash-to-crypto">Cash to crypto</TabsTrigger>
          <TabsTrigger value="crypto-to-fiat-loan">Crypto to fiat loan</TabsTrigger>
        </TabsList>

        <div className="min-h-[480px] md:min-h-[520px]">
          <TabsContent value="crypto-to-cash" className="mt-0 space-y-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="payAmount"
                  render={({ field }) => (
                    <FormItem>
                      <CurrencyInput
                        label="You pay"
                        value={field.value}
                        currency={form.watch('payCurrency')}
                        currencies={CRYPTO_CURRENCIES}
                        onValueChange={field.onChange}
                        onCurrencyChange={(currency) => form.setValue('payCurrency', currency)}
                        error={form.formState.errors.payAmount?.message}
                      />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="receiveAmount"
                  render={({ field }) => (
                    <FormItem>
                      <CurrencyInput
                        label="You receive"
                        value={field.value}
                        currency={form.watch('receiveCurrency')}
                        currencies={FIAT_CURRENCIES}
                        onValueChange={field.onChange}
                        onCurrencyChange={(currency) => form.setValue('receiveCurrency', currency)}
                        error={form.formState.errors.receiveAmount?.message}
                        readOnly
                      />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="payFrom"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-medium text-gray-700 md:text-sm">
                        Pay from
                      </FormLabel>
                      <FormControl>
                        <WalletSelector value={field.value} onSelect={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="payTo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-medium text-gray-700 md:text-sm">
                        Pay to
                      </FormLabel>
                      <FormControl>
                        <PaymentMethodSelect value={field.value} onSelect={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="pt-3 md:pt-4">
                  <Button
                    type="submit"
                    className="w-full h-12 text-base font-semibold transition-all rounded-full md:h-14 bg-nova hover:bg-nova text-nova-light-teal md:text-lg"
                    disabled={isLoading}
                  >
                    {isLoading && <ReloadIcon className="w-5 h-5 mr-2 animate-spin" />}
                    {isLoading ? 'Processing...' : 'Convert now'}
                  </Button>
                </div>
              </form>
            </Form>
          </TabsContent>

          <TabsContent value="cash-to-crypto" className="mt-0">
            <ComingSoon type="Cash to Crypto" />
          </TabsContent>

          <TabsContent value="crypto-to-fiat-loan" className="mt-0">
            <ComingSoon type="Crypto to Fiat Loan" />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

function ComingSoon({ type }: { type: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const comingSoonForm = useForm<ComingSoonFormData>({
    resolver: zodResolver(comingSoonSchema),
    defaultValues: {
      email: ''
    }
  });

  const onSubmit = async (data: ComingSoonFormData) => {
    setIsSubmitting(true);
    setSubmitSuccess(false);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSubmitSuccess(true);

      comingSoonForm.reset();

      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center min-h-[480px] md:min-h-[520px]">
      <div className="w-full max-w-md px-4 space-y-4 text-center md:space-y-6">
        <h2 className="mt-20 text-2xl font-medium md:text-3xl text-nova font-clash">
          Coming Soon!
        </h2>
        <p className="text-sm text-gray-600 md:text-base">
          {type} is almost here.
          <br />
          Enter your email and we'll let you know the moment it's live.
        </p>

        <Form {...comingSoonForm}>
          <form onSubmit={comingSoonForm.handleSubmit(onSubmit)} className="space-y-3 md:space-y-4">
            <FormField
              control={comingSoonForm.control}
              name="email"
              render={({ field }) => (
                <FormItem className="text-left">
                  <FormLabel className="text-xs font-medium text-gray-700 md:text-sm">
                    Email
                  </FormLabel>
                  <FormControl>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      {...field}
                      className="w-full px-4 py-2.5 md:py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-900 focus:border-transparent text-sm md:text-base"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {submitSuccess && (
              <div className="p-3 border border-green-200 bg-green-50 rounded-xl">
                <p className="text-sm font-medium text-green-700">
                  ✓ Thank you! We'll notify you when {type} is live.
                </p>
              </div>
            )}

            <div className="pt-20">
              {' '}
              <Button
                type="submit"
                className="w-full text-sm font-semibold rounded-full h-11 md:h-12 bg-nova hover:bg-nova text-nova-light-teal md:text-base"
                disabled={isSubmitting}
              >
                {isSubmitting && <ReloadIcon className="w-4 h-4 mr-2 animate-spin" />}
                {isSubmitting ? 'Submitting...' : 'Update me'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
