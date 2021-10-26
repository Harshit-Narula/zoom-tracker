import React, { useEffect, useState } from 'react';
import FileUpload from './components/FileUpload';
import './App.css';
import Table from './components/Table';

const App = () => {
    const [data, setData] = useState([{ name: "Udai", phone: "9999999999" }, { name: "Udai", phone: "9999999999" }, { name: "Udai", phone: "9999999999" }, { name: "Udai", phone: "9999999999" }])
    useEffect(() => {

    }, [])

    return (
        <div className='container mt-4'>
            <h4 className='display-4 text-center mb-4'>
                <i className='fas fa-video' /> Zoom Attendance
            </h4>

            <Table data={data} />
        </div>)
};

export default App;
