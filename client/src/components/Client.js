import React,{ useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function Client() {
    const param = useParams()
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [phone,setPhone] = useState('')
    const [reqGone,setReqGone] = useState(false)
    const [link,setLink] = useState(null)   
    console.log(param)
    const handleClick = ()=>{
        //request for count ++
        //set link
        setReqGone(true)
        setLink('ononoivn')
    }
    return (
        <div>
            <input type="text" value={name} placeholder="Name" onChange={(e)=>setName(e.target.value)}/>
            <input type="email" value={email} placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
            <input type="number" value={phone} placeholder="Number" onChange={(e)=>setPhone(e.target.value)}/>
            <button disabled={name==''||email==''||phone==''} onClick={handleClick}>Submit</button>
            {
                link &&
                <a href="https://www.google.com" target="_blank">
                <button type="button" class="btn btn-primary" >Join Zoom Meeting</button></a>
            }
        </div>
    )
}

export default Client