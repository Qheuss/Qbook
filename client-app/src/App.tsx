import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Qbook from './pages/Qbook';
import Message from './pages/Message';
import Calculator from './pages/Calculator';
import BackgroundAnimation from './components/BackgroundAnimation';

function App() {
  window.addEventListener('unload', () => window.scrollTo(0, 0));

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
