import React, { useContext } from 'react';
import styles from './Flyout.module.css';
import { ThemeContext } from '../../context/ThemeContext';
import { ItemsContext, ItemsContextType } from '../../context/ItemsContext';
import { People } from '../../types/types';

interface FlyoutProps {
  items: People[];
}
export const Flyout = ({ items }: FlyoutProps) => {
  const { theme } = useContext(ThemeContext);
  const { selectedItems, unselectAllItems } = useContext(
    ItemsContext,
  ) as ItemsContextType;
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
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
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
