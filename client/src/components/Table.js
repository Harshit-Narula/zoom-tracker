import React, { useEffect, useState } from 'react'
import FileUpload from './FileUpload'
import { useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

function Table() {
    // const [cur,setCur] = useState("10/25/2021")
    const history = useHistory()//
    const [id, setId] = useState('')
    const [date, setDate] = useState(formatDate(new Date()));
    // const [data, setData] = useState([])
    
    const handleClick = () => {
        console.log(`/${id}`)
        history.push(`/${id}`)
    }
    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }
     
    // console.log(formatDate('Sun May 11,2014'));
    useEffect(async () => {

    }, [])

    // useEffect(async () => {
    //     // console.log(date)
    //     changeData()
    // }, [startDate])

    const changeData = async() => {
        console.log("hi")
        // console.log(startDate.toLocaleDateString("en-US"))
        console.log(date)
        try {
            const res = await axios.post('/getAll', { date: `${date}` })
            console.log(res)
            // setData(res.data.result)
        } catch (err) {
            console.log(err)
        }
    }

    const handleMeetingLink=async ()=>{
        const res=axios.post('/enterZoomLink',{
            // link:link
        });
        console.log(res);
        // setLink()
    }

    useEffect(() => {
        handleClick()
    }, [id])


    return (
        <div>
            <FileUpload />
            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                <div className="input-group-append">
                    <button type="button" className="btn btn-dark" onClick={handleMeetingLink} >Set Meeting Link</button>
                </div>
            </div>
            <input type="date" value={date} onChange={(e)=>setDate(e.target.value)}/>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Count</th>
                        <th scope="col">Zoom</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.length > 0 && data.map((row, idx) => (
                            <tr>
                                <th>{idx + 1}</th>
                                <td>{row.name}</td>
                                <td>{row.phone}</td>
                                <td>{row.cur_count}</td>
                                <td><button type="button" className="btn btn-primary" onClick={() => {
                                    setId(row.phone)
                                }
                                }>Zoom</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Table
