import React from 'react';
import { useRouter } from 'next/router';
import ItemDetails from '../../components/ItemDetails/ItemDetails';
import { DetailsProvider } from '../../context/DetailsContext';

const ItemDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;

  if (!id) {
    return <p>Loading...</p>;
  }

  return (
    <DetailsProvider>
      <ItemDetails />
    </DetailsProvider>
  );
};

export default ItemDetailsPage;
