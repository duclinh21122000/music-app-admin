'use client'

import { NextUIProvider } from '@nextui-org/react'
import React, { Suspense } from 'react'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import store, { persistor } from '@/stores/configureStore'

interface AppProviderProps {
  children: React.ReactNode
}

export default function AppProvider({ children }: AppProviderProps) {
  return (
    <Suspense fallback={'loading'}>
      <Toaster
        toastOptions={{
          duration: 4000,
          style: {
            fontSize: '14px',
          },
        }}
      />
      <NextUIProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {children}
          </PersistGate>
        </Provider>
      </NextUIProvider>
    </Suspense>
  )
}
