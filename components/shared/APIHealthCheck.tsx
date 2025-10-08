import React, { useEffect, useState } from 'react';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { BASE_URL } from '@/lib/utils';

interface EndpointStatus {
  name: string;
  endpoint: string;
  status: 'checking' | 'online' | 'offline';
  statusCode?: number;
}

export const APIHealthCheck: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [endpoints, setEndpoints] = useState<EndpointStatus[]>([
    { name: 'Trending', endpoint: '/getLanding/trending', status: 'checking' },
    { name: 'Newest', endpoint: '/getLanding/newest', status: 'checking' },
    { name: 'Recent', endpoint: '/getLanding/recent', status: 'checking' },
    { name: 'Browse', endpoint: '/browse', status: 'checking' },
  ]);

  useEffect(() => {
    const checkEndpoints = async () => {
      const updatedEndpoints = await Promise.all(
        endpoints.map(async (endpoint) => {
          try {
            const response = await fetch(`${BASE_URL}${endpoint.endpoint}`, {
              method: 'HEAD', // Use HEAD to avoid downloading full response
            });
            return {
              ...endpoint,
              status: response.ok ? 'online' : 'offline',
              statusCode: response.status,
            } as EndpointStatus;
          } catch (error) {
            return {
              ...endpoint,
              status: 'offline',
              statusCode: 0,
            } as EndpointStatus;
          }
        })
      );
      setEndpoints(updatedEndpoints);
    };

    checkEndpoints();
  }, []);

  const onlineCount = endpoints.filter(e => e.status === 'online').length;
  const totalCount = endpoints.length;

  return (
    <div className={`bg-gray-800 border border-gray-700 rounded-lg p-4 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-300">API Status</h3>
        <span className="text-xs text-gray-500">
          {onlineCount}/{totalCount} online
        </span>
      </div>
      <div className="space-y-2">
        {endpoints.map((endpoint) => (
          <div key={endpoint.endpoint} className="flex items-center justify-between text-sm">
            <span className="text-gray-400">{endpoint.name}</span>
            <div className="flex items-center gap-2">
              {endpoint.status === 'checking' && (
                <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
              )}
              {endpoint.status === 'online' && (
                <>
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span className="text-xs text-green-500">Online</span>
                </>
              )}
              {endpoint.status === 'offline' && (
                <>
                  <XCircle className="w-4 h-4 text-red-500" />
                  <span className="text-xs text-red-500">
                    {endpoint.statusCode ? `Error ${endpoint.statusCode}` : 'Offline'}
                  </span>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
