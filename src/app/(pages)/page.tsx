'use client';
import inspector from '@/inspector/inspector';
import { useEffect, useState } from 'react';

export default function Home() {
  // Proof of concept for the inspector
  inspector();

  const [value, setValue] = useState('');
  const [json, setJson] = useState({});
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!value) {
      setJson({});
      setError(null);
      return;
    }

    try {
      let val = JSON.parse(value);
      setJson(val);
      setError(null);
    } catch (e) {
      setError(e as Error);
      setJson({});
    }
  }, [value]);

  return (
    <main className="flex min-h-screen w-screen flex-col items-center p-24">
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Paste your verifiable credential here"
        className={`w-1/2 rounded-md bg-gray-200 p-4 ${error === null ? 'bg-green-100' : 'bg-red-100'}`}
      ></textarea>
      {error && <p>{error?.message}</p>}
      {Object.keys(json).length !== 0 && <p>{JSON.stringify(json)}</p>}
    </main>
  );
}
