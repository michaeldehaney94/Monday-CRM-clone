import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Dashboard from './pages/Dashboard'
import TicketPage from './pages/TicketPage'
import CategoriesContext from './context';

function App() {
  const [categories, setCategories] = useState(null)
  const value = { categories, setCategories}

  return (
    <div className="app">
      <CategoriesContext.Provider value={value}>
        <BrowserRouter>
          <NavBar />
          <Routes>
              <Route index path="/" element={<Dashboard />} />
              <Route path="/ticket" element={<TicketPage/>}/>
              {/* editMode will allow each record to be selected via id to be edited */}
              <Route path="/ticket/:id" element={<TicketPage editMode={true} />}/> 
          </Routes>
        </BrowserRouter> 
      </CategoriesContext.Provider>
    </div>
  )
}

export default App;
