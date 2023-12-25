import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home.tsx'
import Search from './pages/search.tsx'
import Watch from './pages/wacht.tsx'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



function App() {
  return (
    <BrowserRouter>
    <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/search' element={<Search />} />
        <Route path='/watch/:id' element={<Watch />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
