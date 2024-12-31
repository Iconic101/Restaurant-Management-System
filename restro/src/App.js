import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home'
import Tables from './components/Tables'
import Clock from './components/Clock';
import Register from './components/Register';
import Bills from "./components/Bills";
import Table from './components/DynamicRoutes/Table';
import Order from './components/DynamicRoutes/Order';
import OldOrder from './components/DynamicRoutes/OldOrder'


function App() {
  let site_name = "/Restaurant-Management-System/"
  return (
    <>

    <nav>
      <h4>Mitho Bites</h4>
    </nav>
        <div className="App">
       <>  <Home/></>
<Routes>

<Route path='/Tables' element={<Tables/>}/>
<Route path='/Tables/:id' element={<Table/>}/>

<Route path='/Clock' element={<Clock/>}/>
<Route path='/Register' element={<Register/>}/>
<Route path='/Bill/:id' element={<Bills/>}/>
<Route path='/Order/:table' element={<Order/>}/>
<Route path='/Old/:table' element={<OldOrder/>}/>


</Routes>
</div>
    </>

  
  );
}

export default App;
