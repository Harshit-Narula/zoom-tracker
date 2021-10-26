import React, { useEffect, useState } from 'react';
import FileUpload from './components/FileUpload';
import './App.css';
import Table from './components/Table';
import { BrowserRouter, Switch, Route, useParams } from 'react-router-dom';
import Client from './components/Client';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState([{ name: "Udai", phone: "9999999999",count:'5'}, { name: "Udai", phone: "9999999999",count:'5'}, { name: "Udai", phone: "9999999999",count:'5'}, { name: "Udai", phone: "9999999999",count:'5'}])
  useEffect(() => {
    
  }, [])
  const params = useParams()
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/:id">
          <Client/>
        </Route>
        <Route path="/">
          <div className='container mt-4' >
            <h4 className='display-4 text-center mb-4'>
              <i className='fas fa-video' /> Zoom Attendance
            </h4>
            <Table data={data} />
          </div>
        </Route>
      </Switch>
    </BrowserRouter>
  )
};

export default App;
