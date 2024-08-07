import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const useSearchHandler = (initialSearch: string) => {
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const router = useRouter();

  useEffect(() => {
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery !== '') {
      router.push({
        pathname: '/',
        query: { page: '1', search: trimmedQuery },
      });
    }
  }, [searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return { searchQuery, handleSearch };
};

export default useSearchHandler;
