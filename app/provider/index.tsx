'use client';

import { ReduxProviders } from '@/store/provider';
import { useInitialRender } from '@/hooks';
import { ReloadProvider } from '@/hooks/useReloadContext';
import { Toaster } from '@/components/ui/sonner';
import UseQueryProvider from './UseQuery';

export function Providers({ children }: { children: React.ReactNode }) {
  const isInitialRenderComplete = useInitialRender();

  if (!isInitialRenderComplete) return null;

  return (
    <UseQueryProvider>
      <ReloadProvider>
        <ReduxProviders>
          {children}
          <Toaster />
        </ReduxProviders>
      </ReloadProvider>
    </UseQueryProvider>
  );
}
