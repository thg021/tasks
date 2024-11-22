"use client";
import React from "react";
import { ArrowLeft, AlertCircle, WifiOff } from "lucide-react";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-lg w-full space-y-8 text-center">
        {/* Error Icon */}
        <div className="flex justify-center">
          <WifiOff className="h-8 w-8 text-slate-800" />
        </div>

        {/* Error Message */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-slate-800">Error</h1>
          <p className="text-gray-400">
            Ops, não foi possível carregar esta página no momento.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-black bg-white hover:bg-gray-100 transition-colors duration-200"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Voltar
          </button>
          <button
            onClick={() => (window.location.href = "/")}
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-700 text-base font-medium rounded-lg text-white bg-gray-900 hover:bg-gray-800 transition-colors duration-200"
          >
            Ir para Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
