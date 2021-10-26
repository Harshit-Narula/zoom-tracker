import React, { useEffect, useState } from 'react'
import FileUpload from './FileUpload'
import { useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

function Table() {
    const [cur,setCur] = useState("10/25/2021")
    const history = useHistory()//
    const [id, setId] = useState('')
    const [startDate, setStartDate] = useState(new Date());
    const [data, setData] = useState([])
    
    const handleClick = () => {
        console.log(`/${id}`)
        history.push(`/${id}`)
    }
    useEffect(async () => {
        // console.log(date)
        // changeData()
        // setCur(new Date("mm:dd:yyyy"))
        // console.log(cur);
    }, [])

    useEffect(async () => {
        // console.log(date)
        changeData()
    }, [startDate])

    const changeData = async() => {
        console.log("hi")
        console.log(startDate.toLocaleDateString("en-US"))
        let date = startDate.toLocaleDateString("en-US").replaceAll("/","-")
        console.log(date)
        try {
            const res = await axios.post('/getAll', { date: `${date}` })
            console.log(res)
            setData(res.data.result)
        } catch (err) {
            console.log(err)
        }
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
                    <button type="button" className="btn btn-dark">Set Meeting Link</button>
                </div>
            </div>
            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
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
