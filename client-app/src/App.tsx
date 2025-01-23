import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Excelent from './pages/Qbook';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Excelent />} />
        <Route path='*' element={<Excelent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
