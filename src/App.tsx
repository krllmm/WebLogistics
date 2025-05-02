import Drivers from './pages/driver/all';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './pages/layout';
import Logist from './pages/logist';
import Delivery from './pages/delivery';
import Home from './pages/home';
import AddDriver from './pages/driver/add';

function App() {

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="logists" element={<Logist />} />
          <Route path="deliveries" element={<Delivery />} />
          <Route path="drivers">
            <Route path="all" element={<Drivers />} />
            <Route path="add" element={<AddDriver />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
