import Driver from './pages/driver';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './pages/layout';
import Logist from './pages/logist';
import Delivery from './pages/delivery';
import Home from './pages/home';

function App() {

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="logists" element={<Logist />} />
          <Route path="deliveries" element={<Delivery />} />
          <Route path="driver" element={<Driver />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
