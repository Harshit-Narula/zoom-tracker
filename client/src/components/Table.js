import React, { useEffect, useState } from 'react'
import FileUpload from './FileUpload'
import { useHistory } from "react-router-dom";

function Table({ data }) {
    const history = useHistory()
    const [id, setId] = useState('')
    const handleClick = () => {
        console.log(`/${id}`)
        history.push(`/${id}`)
    }

    useEffect(()=>{
        handleClick()
    },[id])

    return (
        <div>
            <FileUpload />
            <table class="table table-striped">
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
                        data.map((row, idx) => (
                            <tr>
                                <th>{idx + 1}</th>
                                <td>{row.name}</td>
                                <td>{row.phone}</td>
                                <td>{row.count}</td>
                                <td><button type="button" class="btn btn-primary" onClick={() => {
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
