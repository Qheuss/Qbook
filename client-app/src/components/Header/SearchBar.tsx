import { useEffect, useState } from 'react';
import { IoMdSearch } from 'react-icons/io';
import styles from './SearchBar.module.scss';
import { HiX } from 'react-icons/hi';
import { useAppSelector } from '../../redux/hooks';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [triggerSearch, setTriggerSearch] = useState(false);
  const [highlightedWordsExist, setHighlightedWordsExist] = useState(false);
  const theme = useAppSelector((state) => state.theme.theme);

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
        (theme === 'dark'
          ? ' bg-[#333334] text-[#a6a9ac]'
          : ' bg-[#f0f2f5] text-[#606367]')
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
        placeholder='Rechercher'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(event) => event.key === 'Enter' && setTriggerSearch(true)}
        className={
          theme === 'dark'
            ? ' text-[#a6a9ac] placeholder:text-[#a6a9ac]'
            : ' text-[#606367] placeholder:text-[#606367]'
        }
      />
    </div>
  );
};

export default SearchBar;
