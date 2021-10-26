import React, { useEffect, useState } from 'react'
import FileUpload from './FileUpload'
import { useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

function Table() {
    const history = useHistory()
    const [id, setId] = useState('')
    const [date, setDate] = useState(formatDate(new Date()));
    const [data, setData] = useState([])
    const [link,setLink]=useState();
    
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

    useEffect(async () => {
        changeData()
    }, [date])

    const changeData = async() => {
        console.log(date)
        try {
            const res = await axios.post("/getAll", { date: `${date}` })
            console.log(res)
            setData(res.data.result)
        } catch (err) {
            console.log(err)
        }
    }

    const clickMeetingLink=async()=>{
        const res=await axios.post('/enterZoomLink',{
            link:link
        });
        console.log(res);
    }

    const handleMeetingLink= (e)=>{
        let val=e.target.value;
        console.log(e.target.value);
        setLink(val);
    }

    useEffect(() => {
        handleClick()
    }, [id])


    return (
        <div>
            <FileUpload />
            <div className="input-group mb-3">
                <input onChange={handleMeetingLink}type="text" className="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2" value={link}/>
                <div className="input-group-append">
                    <button type="button" className="btn btn-dark" onClick={clickMeetingLink} >Set Meeting Link</button>
                </div>
            </div>
            <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} style={{marginBottom:"15px"}}/>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Traffic Count</th>
                        <th scope="col">Joined Count</th>
                        <th scope="col">Zoom</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        (data && data.length > 0) ? data.map((row, idx) => (
                            <tr>
                                <th>{idx + 1}</th>
                                <td>{row.name}</td>
                                <td>{row.email}</td>
                                <td>{row.page_open_count}</td>
                                <td>{row.count}</td>
                                <td><button type="button" className="btn btn-primary" onClick={() => {
                                    setId(row.uuid)
                                }
                                }>Zoom</button></td>
                            </tr>
                        ))
                        :
                        <h2>No Records found</h2>
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Table
