import React from 'react';
import CombinedProvider from '../context/ItemsContext';
import { ThemeProvider } from '../context/ThemeContext';
import MainPage from './main-page';

async function getData(page = '1', id?: string, search = '') {
  let itemDetails = null;
  let initialData;

  if (!search) {
    const res = await fetch(`https://swapi.dev/api/people/?page=${page}`);
    initialData = await res.json();
  }

  if (id) {
    const itemRes = await fetch(`https://swapi.dev/api/people/${id}/`);
    itemDetails = await itemRes.json();
  }

  if (search) {
    const searchRes = await fetch(
      `https://swapi.dev/api/people/?search=${search}`,
    );
    initialData = await searchRes.json();
  }

  return {
    initialItems: initialData.results,
    initialCount: initialData.count,
    itemDetails,
  };
}

export default async function Page({
  searchParams,
}: {
  searchParams: { page?: string; id?: string; search?: string };
}) {
  const { page = '1', id, search = '' } = searchParams;
  const data = await getData(page, id, search);

  return (
    <CombinedProvider>
      <ThemeProvider>
        <MainPage
          initialItems={data.initialItems}
          initialCount={data.initialCount}
          itemDetails={data.itemDetails}
        />
      </ThemeProvider>
    </CombinedProvider>
  );
}
