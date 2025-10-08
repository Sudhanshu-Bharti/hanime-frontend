import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  className?: string;
  showDetails?: boolean;
}

export const ErrorMessage = React.memo<ErrorMessageProps>(({ 
  message, 
  onRetry,
  className = '',
  showDetails = false
}) => {
  const isServerError = message.includes('Server error') || message.includes('500');
  
  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center max-w-md mx-auto ${className}`}>
      <AlertCircle className="w-16 h-16 text-red-500 mb-4 animate-pulse" aria-hidden="true" />
      <h3 className="text-xl font-semibold text-red-400 mb-2">Oops! Something went wrong</h3>
      <p className="text-gray-300 text-base mb-4">{message}</p>
      
      {isServerError && showDetails && (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-4 text-left w-full">
          <p className="text-sm text-gray-400 mb-2">
            <strong>What happened?</strong>
          </p>
          <p className="text-xs text-gray-500">
            The API server is currently experiencing issues. This is a temporary problem on the backend.
            The development team has been notified and is working on a fix.
          </p>
        </div>
      )}
      
      <div className="flex flex-col sm:flex-row gap-3 mt-2">
        {onRetry && (
          <button
            onClick={onRetry}
            className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            aria-label="Retry loading content"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
        )}
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          aria-label="Reload the page"
        >
          Reload Page
        </button>
      </div>
    </div>
  );
});

ErrorMessage.displayName = 'ErrorMessage';
