'use client';
import React from 'react';
import { ArrowLeft, AlertCircle, WifiOff } from 'lucide-react';

const ErrorPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-lg space-y-8 text-center">
        {/* Error Icon */}
        <div className="flex justify-center">
          <WifiOff className="size-8 text-slate-800" />
        </div>

        {/* Error Message */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-slate-800">Error</h1>
          <p className="text-gray-400">
            Ops, não foi possível carregar esta página no momento.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center rounded-lg border border-transparent bg-white px-6 py-3 text-base font-medium text-black transition-colors duration-200 hover:bg-gray-100"
          >
            <ArrowLeft className="mr-2 size-5" />
            Voltar
          </button>
          <button
            onClick={() => (window.location.href = '/')}
            className="inline-flex items-center justify-center rounded-lg border border-gray-700 bg-gray-900 px-6 py-3 text-base font-medium text-white transition-colors duration-200 hover:bg-gray-800"
          >
            Ir para Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
