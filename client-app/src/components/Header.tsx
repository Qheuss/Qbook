import styles from './Header.module.scss';
import { HiMiniHome } from 'react-icons/hi2';
import { GiCalculator } from 'react-icons/gi';
import { FaMoon } from 'react-icons/fa6';
import { HiOutlineDownload } from 'react-icons/hi';
import { IoMdSearch, IoIosMail } from 'react-icons/io';
import { LuSunMedium } from 'react-icons/lu';
import { HiX } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { useContext, useState, useEffect } from 'react';
import { NavItem } from './NavItem';

interface HeaderProps {
  selectedPage: number;
}

const Header = ({ selectedPage }: HeaderProps) => {
  const navigate = useNavigate();
  const themeContext = useContext(ThemeContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [triggerSearch, setTriggerSearch] = useState(false);
  const [highlightedWordsExist, setHighlightedWordsExist] = useState(false);

  if (!themeContext) {
    throw new Error('ThemeToggle must be used within a ThemeProvider');
  }

  const navItems = [
    { icon: HiMiniHome, path: '/', index: 0 },
    { icon: IoIosMail, path: '/message', index: 1 },
    { icon: GiCalculator, path: '/calculator', index: 2 },
  ];

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
                `<mark style="background-color: #54c078;">${match}</mark>`
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

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setTriggerSearch(true);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    removeHighlights();
  };

  return (
    <section
      className={
        styles.header +
        (themeContext.theme === 'dark' ? ' bg-[#252728]' : ' bg-[#fff]')
      }
    >
      <div className={styles.header__logo}>
        <img
          className={styles.logo}
          src={
            themeContext.theme === 'dark'
              ? '/images/QDark.svg'
              : '/images/QLight.svg'
          }
          onClick={() => navigate('/')}
        />
        <div
          className={
            styles.searchBar +
            (themeContext.theme === 'dark'
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
            onKeyDown={handleKeyDown}
            className={
              themeContext.theme === 'dark'
                ? ' text-[#a6a9ac] placeholder:text-[#a6a9ac]'
                : ' text-[#606367] placeholder:text-[#606367]'
            }
          />
        </div>
      </div>
      <ul className={styles.header__middle}>
        {navItems.map((item) => (
          <NavItem
            key={item.index}
            {...item}
            selectedPage={selectedPage}
            navigate={navigate}
          />
        ))}
      </ul>
      <ul className={styles.header__profile}>
        <li
          className={
            themeContext.theme === 'dark' ? 'bg-[#4f5152]' : 'bg-[#e3e4e6]'
          }
        >
          <button onClick={themeContext.toggleTheme}>
            {themeContext.theme === 'dark' ? (
              <FaMoon className='text-white text-2xl hover:text-yellow-500' />
            ) : (
              <LuSunMedium className='text-yellow-500 text-2xl hover:text-white' />
            )}
          </button>
        </li>
        <li>
          <a
            href='CV-Quentin_Heusse.pdf'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img src='images/QuentinHeusse.jpg' alt='Profile' />
            <HiOutlineDownload
              className={
                themeContext.theme === 'dark'
                  ? 'bg-[#4f5152] text-[#e3e4e6]'
                  : 'bg-[#e3e4e6] text-[#4f5152]'
              }
            />
          </a>
        </li>
      </ul>
    </section>
  );
};

export default Header;
