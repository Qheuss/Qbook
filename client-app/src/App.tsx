import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Qbook from './pages/Qbook';
import Message from './pages/Message';
import Calculator from './pages/Calculator';
import { useContext, useEffect } from 'react';
import { ThemeContext } from './context/ThemeContext';
import BackgroundAnimation from './components/BackgroundAnimation';

function App() {
  window.addEventListener('unload', () => window.scrollTo(0, 0));

  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error('ThemeToggle must be used within a ThemeProvider');
  }

  useEffect(() => {
    document.body.style.backgroundColor =
      themeContext.theme === 'dark' ? '#1c1c1d' : '#f2f4f7';
  }, [themeContext.theme]);

  return (
    <BrowserRouter>
      <BackgroundAnimation />
      <Routes>
        <Route path='/message' element={<Message />} />
        <Route path='/calculator' element={<Calculator />} />
        <Route path='/' element={<Qbook />} />
        <Route path='*' element={<Qbook />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
