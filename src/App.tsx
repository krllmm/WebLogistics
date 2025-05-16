import Drivers from './pages/driver/all';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './pages/layout';
import Logist from './pages/logist';
import Delivery from './pages/delivery/all';
import AddDelivery from "./pages/delivery/add";
import Home from './pages/home';
import AddDriver from './pages/driver/add';
import Product from './pages/product';
import Chat from './pages/chat';
import Settings from './pages/settings';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="logists" element={<Logist />} />
            <Route path="deliveries">
              <Route path="all" element={<Delivery />} />
              <Route path="add" element={<AddDelivery />} />
            </Route>
            <Route path="drivers">
              <Route path="all" element={<Drivers />} />
              <Route path="add" element={<AddDriver />} />
            </Route>
            <Route path="products" element={<Product/>}/>
            <Route path="chat" element={<Chat/>}/>
            <Route path="settings" element={<Settings/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
