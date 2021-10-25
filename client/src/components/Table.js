import React, { useEffect, useState } from 'react'
import FileUpload from './FileUpload'
import { useHistory } from "react-router-dom";
import axios from 'axios';

function Table() {
    const [cur,setCur] = useState("10/25/2021")
    const history = useHistory()//
    const [id, setId] = useState('')
    
    const handleClick = () => {
        console.log(`/${id}`)
        history.push(`/${id}`)
    }
    const [data, setData] = useState([])
    useEffect(async () => {
        // console.log(date)
        // changeData()
        setCur(new Date("mm:dd:yyyy"))
        console.log(cur);
    }, [])

    // useEffect(async () => {
    //     // console.log(date)
    //     // changeData()
    // }, [date])

    const changeData = async() => {
        console.log("hi")
        try {
            // const res = await axios.post('/getAll', { date: date })
            // console.log(res)
            // setData(r/es.data.result)
        } catch (err) {
            console.log(err)
        }
    }

    // useEffect(() => {
    //     handleClick()
    // }, [id])

    // useEffect(()=>{
    //     setDate(cur.toISOString().substr(0, 10))
    // },[cur])

    return (
        <div>
            <FileUpload />
            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                <div className="input-group-append">
                    <button type="button" className="btn btn-dark">Set Meeting Link</button>
                </div>
            </div>
            <input type="date" value={cur} onChange={(e) => setCur(e.target.value)} />
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
