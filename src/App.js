import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home.tsx'
import Search from './pages/search.tsx'
import Watch from './pages/wacht.tsx'



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/search' element={<Search />} />
        <Route path='/watch/:id' element={<Watch />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
