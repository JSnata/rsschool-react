import { useState, useEffect } from 'react';

const useSearchQuery = (key: string) => {
  const [searchQuery, setSearchQuery] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key) || '';
    }
    return '';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, searchQuery);
    }
  }, [key, searchQuery]);

  return [searchQuery, setSearchQuery] as const;
};

export default useSearchQuery;
