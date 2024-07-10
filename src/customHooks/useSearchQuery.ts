import { useState, useEffect } from 'react';

const useSearchQuery = (key: string) => {
  const [searchQuery, setSearchQuery] = useState<string>(() => {
    return localStorage.getItem(key) || '';
  });

  useEffect(() => {
    localStorage.setItem(key, searchQuery);
  }, [key, searchQuery]);

  return [searchQuery, setSearchQuery] as const;
};

export default useSearchQuery;
