import { useEffect, useState } from 'react';
import { IoMdSearch } from 'react-icons/io';
import styles from './SearchBar.module.scss';
import { HiX } from 'react-icons/hi';
import { useAppSelector } from '@/redux/hooks';
import { useTranslation } from 'react-i18next';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const theme = useAppSelector((state) => state.theme.theme);
  const { t } = useTranslation();

  const removeHighlightElements = () => {
    document.querySelectorAll('mark').forEach((mark) => {
      const parent = mark.parentNode;
      if (parent) {
        parent.replaceChild(
          document.createTextNode(mark.textContent || ''),
          mark,
        );
        parent.normalize();
      }
    });
  };

  const removeHighlights = () => {
    removeHighlightElements();
  };

  useEffect(() => {
    if (!searchQuery.trim()) {
      removeHighlightElements();
      return;
    }

    const highlightMatches = () => {
      removeHighlightElements();

      const content = document.querySelector('main');
      if (!content) return;

      const walker = document.createTreeWalker(content, NodeFilter.SHOW_TEXT, {
        acceptNode: (node) => {
          const parent = node.parentNode;
          if (!parent) return NodeFilter.FILTER_REJECT;
          const tagName = parent.nodeName.toUpperCase();
          if (
            ['MARK', 'SCRIPT', 'STYLE', 'INPUT', 'TEXTAREA'].includes(tagName)
          ) {
            return NodeFilter.FILTER_REJECT;
          }
          return NodeFilter.FILTER_ACCEPT;
        },
      });

      const textNodes: Node[] = [];
      let node;
      while ((node = walker.nextNode())) {
        textNodes.push(node);
      }

      const regex = new RegExp(
        searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
        'gi',
      );

      textNodes.forEach((textNode) => {
        const text = textNode.nodeValue;
        if (!text) return;

        regex.lastIndex = 0;
        if (!regex.test(text)) return;
        regex.lastIndex = 0;

        const fragment = document.createDocumentFragment();
        let lastIndex = 0;
        let match;

        while ((match = regex.exec(text)) !== null) {
          if (match.index > lastIndex) {
            fragment.appendChild(
              document.createTextNode(text.substring(lastIndex, match.index)),
            );
          }

          const mark = document.createElement('mark');
          mark.style.backgroundColor = '#54c078';
          mark.textContent = match[0];
          fragment.appendChild(mark);

          lastIndex = match.index + match[0].length;
        }

        if (lastIndex < text.length) {
          fragment.appendChild(
            document.createTextNode(text.substring(lastIndex)),
          );
        }

        textNode.parentNode?.replaceChild(fragment, textNode);
      });
    };

    highlightMatches();
  }, [searchQuery]);

  const clearSearch = () => {
    setSearchQuery('');
    removeHighlights();
  };
  return (
    <div
      className={
        styles.searchBar +
        ' md:w-62.5 w-45' +
        (theme === 'dark'
          ? ' bg-searchDark text-fontDarker'
          : ' bg-searchLight text-fontLighter')
      }
    >
      <label htmlFor='search'>
        <button
          onClick={clearSearch}
          style={{
            cursor: searchQuery ? 'pointer' : 'default',
          }}
        >
          {searchQuery ? <HiX /> : <IoMdSearch />}
        </button>
      </label>
      <input
        id='search'
        type='text'
        placeholder={t('Header.search')}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
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
