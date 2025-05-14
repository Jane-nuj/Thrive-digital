'use client';

import { useEffect } from 'react';

export default function TestErrorPage() {
  useEffect(() => {
    // Intentionally throw an error to test the error page
    throw new Error('Test error to view the error.tsx component');
  }, []);

  return <div>This content should not be displayed</div>;
}
