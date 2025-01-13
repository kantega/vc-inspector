'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import JwtViewer from './JwtViewer';

interface CallbackDataViewerProps {
  pollingInterval?: number; // Interval for polling in milliseconds
  state: any;
}

export default function PresentationResult({ pollingInterval = 5000, state }: CallbackDataViewerProps) {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    if (!state) {
      setError('State is required to fetch callback data.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/callback?state=${state}`);
      if (response.ok) {
        const result = await response.json();
        setData(result);
        setError(null);
      } else if (response.status === 404) {
        setError('No data found for the provided state.');
        setData(null);
      } else {
        setError(`Error: ${response.statusText}`);
        setData(null);
      }
    } catch (err) {
      console.error('Error fetching callback data:', err);
      setError('An error occurred while fetching data.');
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  // Polling Effect
  useEffect(() => {
    if (!state) return;

    const interval = setInterval(fetchData, pollingInterval);
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [state, pollingInterval]);

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Callback Data Viewer</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button onClick={fetchData} disabled={loading}>
              {loading ? 'Loading...' : 'Fetch Callback Data'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {error && (
        <Card className="mb-4">
          <CardContent>
            <p className="text-red-500">{error}</p>
          </CardContent>
        </Card>
      )}

      {data && (
        <Card>
          <CardHeader>
            <CardTitle>Callback Data</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 text-sm">{JSON.stringify(data, null, 2)}</pre>
            {data.vp_token && <JwtViewer jwt={data.vp_token} />}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
