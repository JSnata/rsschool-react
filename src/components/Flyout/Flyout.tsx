import React, { useContext } from 'react';
import styles from './Flyout.module.css';
import { ThemeContext } from '../../context/ThemeContext';
import { ItemsContext } from '../../context/ItemsContext';
import { People } from '../../types/types';
import { MockItemsContext } from '../../context/MockItemsContext';

interface FlyoutProps {
  items: People[];
}

export const Flyout = ({ items }: FlyoutProps) => {
  const { theme } = useContext(ThemeContext);
  const itemsContext = useContext(ItemsContext);
  const mockItemsContext = useContext(MockItemsContext);
  const context = itemsContext || mockItemsContext;

  if (!context) {
    throw new Error(
      'Flyout component should be used in an ItemsProvider or MockItemsProvider',
    );
  }

  const { selectedItems, unselectAllItems } = context;

  const handleUnselectAll = () => {
    unselectAllItems();
  };

  const downloadHandler = () => {
    const selectedDetails = items
      .filter((item) => {
        const itemId = item.url.split('/').filter(Boolean).pop();
        return selectedItems.includes(itemId!);
      })
      .map((item) => ({
        name: item.name,
        birthYear: item.birth_year,
        eyeColor: item.eye_color,
        gender: item.gender,
        hairColor: item.hair_color,
        height: item.height,
        mass: item.mass,
        skinColor: item.skin_color,
        url: item.url,
      }));

    const escapeCsvField = (field: string) => {
      if (field.includes('"') || field.includes(',') || field.includes('\n')) {
        field = field.replace(/"/g, '""');
        return `"${field}"`;
      }
      return field;
    };

    let content = 'data:text/csv;charset=utf-8,';
    const headerContent =
      'name,birth year,eye color,gender,hair color,height,mass,skin color,url\n';
    content += headerContent;

    selectedDetails.forEach((item) => {
      const itemContent = [
        escapeCsvField(item.name),
        escapeCsvField(item.birthYear),
        escapeCsvField(item.eyeColor),
        escapeCsvField(item.gender),
        escapeCsvField(item.hairColor),
        escapeCsvField(item.height),
        escapeCsvField(item.mass),
        escapeCsvField(item.skinColor),
        escapeCsvField(item.url),
      ].join(',');

      content += itemContent + '\n';
    });

    const encodedUri = encodeURI(content);
    const downloadLink = document.createElement('a');
    downloadLink.setAttribute('href', encodedUri);
    downloadLink.setAttribute('download', `${selectedItems.length}_people.csv`);
    downloadLink.click();
  };

  return (
    <div className={`${styles.flyout} ${styles[theme]}`}>
      <h3>{selectedItems.length} item(s) selected</h3>
      <button onClick={handleUnselectAll}>Unselect all</button>
      <button onClick={downloadHandler}>Download</button>
    </div>
  );
};

export default Flyout;
