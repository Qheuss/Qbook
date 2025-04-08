import { useEffect, useState } from 'react';
import { IoMdSearch } from 'react-icons/io';
import styles from './SearchBar.module.scss';
import { HiX } from 'react-icons/hi';
import { useAppSelector } from '@/redux/hooks';
import { useTranslation } from 'react-i18next';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [triggerSearch, setTriggerSearch] = useState(false);
  const [highlightedWordsExist, setHighlightedWordsExist] = useState(false);
  const theme = useAppSelector((state) => state.theme.theme);
  const { t } = useTranslation();

  const removeHighlights = () => {
    document.querySelectorAll('mark').forEach((mark) => {
      const parent = mark.parentNode;
      if (parent) {
        parent.replaceChild(
          document.createTextNode(mark.textContent || ''),
          mark
        );
      }
    });
    setHighlightedWordsExist(false);
  };

  useEffect(() => {
    if (!triggerSearch) return;

    const highlightMatches = () => {
      if (!searchQuery) return;
      removeHighlights();

      const content = document.querySelector('main');
      if (!content) return;

      const walker = document.createTreeWalker(
        content,
        NodeFilter.SHOW_TEXT,
        null
      );
      const regex = new RegExp(searchQuery, 'gi');

      let node;
      while ((node = walker.nextNode())) {
        if (node.parentNode && node.parentNode.nodeName !== 'INPUT') {
          const text = node.nodeValue;
          if (text && regex.test(text)) {
            const span = document.createElement('span');
            span.innerHTML = text.replace(
              regex,
              (match) =>
                `<mark style='background-color: #54c078;'>${match}</mark>`
            );
            node.parentNode.replaceChild(span, node);
          }
        }
      }
    };

    highlightMatches();
    setTriggerSearch(false);
  }, [triggerSearch, searchQuery]);

  useEffect(() => {
    const checkHighlightedWords = () => {
      const highlightedElements = document.querySelectorAll('mark');
      setHighlightedWordsExist(highlightedElements.length > 0);
    };

    checkHighlightedWords();
  }, [searchQuery]);

  const clearSearch = () => {
    setSearchQuery('');
    removeHighlights();
  };
  return (
    <div
      className={
        styles.searchBar +
        ' md:w-[250px] w-[180px]' +
        (theme === 'dark'
          ? ' bg-searchDark text-fontDarker'
          : ' bg-searchLight text-fontLighter')
      }
    >
      <label htmlFor='search'>
        <button
          onClick={clearSearch}
          style={{
            cursor:
              searchQuery || highlightedWordsExist ? 'pointer' : 'default',
          }}
        >
          {searchQuery || highlightedWordsExist ? <HiX /> : <IoMdSearch />}
        </button>
      </label>
      <input
        id='search'
        type='text'
        placeholder={t('Header.search')}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(event) => event.key === 'Enter' && setTriggerSearch(true)}
        className={
          theme === 'dark'
            ? ' text-fontDarker placeholder:text-fontDarker'
            : ' text-fontLighter placeholder:text-fontLighter'
        }
      />
    </div>
  );
};

export default SearchBar;
