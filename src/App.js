import logo from './logo.svg';
import Discount from './components/Discount/Discount.js';
import './assets/bootstrap/bootstrap4.css';
import './App.css';
import React from 'react';
import { Route ,Routes} from 'react-router-dom';
import FaqList from "./components/Faq_List/FaqList"
import Form from './components/Faq_List/Form';
import Table from './components/Faq_Cat_List/Table';

function App() {
  return (

    <div className={['App', 'container-fluid', 'p-0'].join(' ')}>
       <Routes>
        <Route path='/discount' element={<Discount/>}/>
        <Route path='/list' element={<FaqList/>}/>
        <Route path='/add' element={<Form/>}/>
        <Route path='/edit/:id' element={<Form/>}/>
        <Route path='/faq_cat' element={<Table/>}/>
        <Route path='/' element={<FaqList/>}/>
       </Routes>
      
    </div>
  );
}

export default App;
