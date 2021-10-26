import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./style.css";
import validator from "validator";
import axios from 'axios';
import webinarImage from '../images/webinar.jpg'

function Client() {
  const param = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [reqGone, setReqGone] = useState(false);
  const [webinarDate, setwebinarDate] = useState("");
  const [webinarTime, setwebinarTime] = useState("");
  const [batchDetails, setBatchDetails] = useState("");
  const [link, setLink] = useState(null);
  const [total, setTotal] = useState("")
  const [href,setHref] = useState("")
  console.log(param);


  useEffect(async() => {
    console.log("12345")
    try {
      const res = await axios.post('http://192.168.1.160:5000/update',{uuid:param.id});
      console.log(res,"dbdiucbdu");
      // setwebinarDate(res.date);
      // setwebinarTime(res.time);
      // setBatchDetails(res.batchDetails);
    }
    catch (err) {
      console.log(err.message);
    }
  }, [])

  const handleSubmit = async() => {
    try {
      const res = await axios.post('http://192.168.1.160:5000/updateCount',{uuid:param.id});
      console.log(res,"6789");
      console.log(href,"678967896789");
    }
    catch (err) {
      console.log(err.message);
    }
  }

  const getWebinarDetails = async () => {
    try {
      const res = await axios.get('http://192.168.1.160:5000/getWebinarDetails');
      console.log(res,"12345");
      setwebinarDate(res.data.result[0].date_of_webinar);
      setwebinarTime(res.data.result[0].time_of_webinar);
      setBatchDetails(res.data.result[0].details);
      setHref(res.data.result[0].zoom_link)
    }
    catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    getWebinarDetails();
  }, []);

  const handleClick = () => {
    let isPhone = validatePhoneNumber(phone);
    let isEmail = validateEmail(email);

    if (isPhone && isEmail) {
      setReqGone(true);
      setLink("ononoivn");
    }
    else {
      alert("Please enter valid email or/and phone")
    }
  };

  const validatePhoneNumber = (number) => {
    const isValidPhoneNumber = validator.isMobilePhone(number);
    return isValidPhoneNumber;
  };

  const validateEmail = (email) => {
    const isValidEmail = validator.isEmail(email);
    return isValidEmail;
  };

  return (
    <div>
      <li class="card" id="card_1">
        <div class="card__content">
          <div>
            <h2 style={{marginTop:'15px'}}>Webinar Details</h2>
            <h5>{webinarDate}</h5>
            <h2>{webinarTime}</h2>
            <h3>Enter your Details</h3>
            <input
              type="text"
              value={name}
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              value={phone}
              placeholder="Number"
              onChange={(e) => setPhone(e.target.value)}
            />
            <button
              disabled={name === "" || email === "" || phone === ""}
              onClick={handleClick}
            >
              Submit
            </button>
            {link && (
              <a href={href} target="_blank">
                <button type="button" class="btn btn-primary" onClick={handleSubmit}>
                  Join Zoom Meeting
                </button>
              </a>
            )}
          </div>
          <figure>
            <img
              src={webinarImage}
              alt=" description"
            />
          </figure>
          <h1>{batchDetails}</h1>
        </div>
      </li>
    </div>
  );
}

export default Client;
