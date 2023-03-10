import React from 'react';
import axios from 'axios';
import './css/Data.css';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import {Table} from 'react-bootstrap';

const Data = () => {

    const [district,setDistrict] = useState(null);
    const [loading, setLoading] = useState(false);
    const [divone, setDivone] = useState(true);
    const [fulldata, setFulldata] = useState(null);
    const [message, setMessage] = useState(null);
    const [msgSts, setMsgsts] = useState(false);
    const [divTwo,setDivTwo] = useState(false);
    const [coursename, setCourseName] = useState(null);
    const [btntitle, setBtntitle] = useState("Select");

    useEffect(() => {
        if((district)&&district != null && (coursename)&&coursename != null)
        {
            setLoading(true);
            setDivone(false);

            var postData = {
                district: (district)&&district,
                course: (coursename)&&coursename
            }
            axios.post('https://avodha.net/api/v1/data',(postData)).then((res) => {
                var rawData = res.data;
                if(rawData.length > 0)
                {
                    setFulldata(rawData);
                } else
                {
                    setLoading(false);
                    setMsgsts(true);
                    setMessage('No data found!');
                }
            }).catch((e) => {
                setLoading(false);
                setMsgsts(true);
                setMessage('Something went wrong!');
            });
        }
    },[district]);

    useEffect(() => {
        if((fulldata)&&fulldata != null)
        {
            setLoading(false);
            setDivTwo(true)
        }
    },[fulldata]);

    const backFun = () => {
        window.location.reload();
    };

    return(
        <>
        <h2 className={(msgSts)&&msgSts ? 'text-center':'hidden-element'}>{(message)&&message}</h2>
        <div className={(msgSts)&&msgSts ? 'd-flex justify-content-center align-items-center mx-auto p-2 mt-2' : 'hidden-element'}>
            <button className='refresh' onClick={backFun}>Refresh</button>
        </div>
        <div className={(loading)&&loading ? 'loader':'hidden-element'}></div>
            <div className={(divone)&&divone ? 'd-flex justify-content-center align-items-center mx-auto p-4' : 'hidden-element'}>
                <div className='district-selector'>
                    <h1>Select your Course</h1>
                        <div className='d-flex justify-content-center align-items-center mx-auto p-2 mt-2'>
                            <DropdownButton id="dropdown-basic-button" title={(btntitle)&&btntitle}>
                                <Dropdown.Item onClick={(event) => {setCourseName('Medical Coding'); setBtntitle('Medical Coding')}}>Medical Coding</Dropdown.Item>
                                <Dropdown.Item onClick={(event) => {setCourseName('MERN Stack'); setBtntitle('MERN Stack')}}>MERN Stack</Dropdown.Item>
                                <Dropdown.Item onClick={(event) => {setCourseName('Learning Android'); setBtntitle('Learning Android')}}>Learning Android</Dropdown.Item>
                                <Dropdown.Item onClick={(event) => {setCourseName('Python and Django'); setBtntitle('Python and Django')}}>Python and Django</Dropdown.Item>
                                <Dropdown.Item onClick={(event) => {setCourseName('Flutter Development'); setBtntitle('Flutter Development')}}>Flutter Development</Dropdown.Item>
                                <Dropdown.Item onClick={(event) => {setCourseName('UI and UX Design'); setBtntitle('UI and UX Design')}}>UI and UX Design</Dropdown.Item>
                                <Dropdown.Item onClick={(event) => {setCourseName('.NET'); setBtntitle('.NET')}}>.NET</Dropdown.Item>
                            </DropdownButton>
                        </div>
                    <h1 className='mt-4'>Select your district</h1>
                    <div className='d-flex justify-content-center align-items-center mx-auto p-2 mt-2'>
                        <DropdownButton id="dropdown-basic-button" title="Select">
                            <Dropdown.Item onClick={(event) => {setDistrict('Trivandrum')}}>Trivandrum</Dropdown.Item>
                            <Dropdown.Item onClick={(event) => {setDistrict('Kollam')}}>Kollam</Dropdown.Item>
                            <Dropdown.Item onClick={(event) => {setDistrict('Alappuzha')}}>Alappuzha</Dropdown.Item>
                            <Dropdown.Item onClick={(event) => {setDistrict('Pathanamthitta')}}>Pathanamthitta</Dropdown.Item>
                            <Dropdown.Item onClick={(event) => {setDistrict('Kottayam')}}>Kottayam</Dropdown.Item>
                            <Dropdown.Item onClick={(event) => {setDistrict('Idukki')}}>Idukki</Dropdown.Item>
                            <Dropdown.Item onClick={(event) => {setDistrict('Ernakulam')}}>Ernakulam</Dropdown.Item>
                            <Dropdown.Item onClick={(event) => {setDistrict('Thrissur')}}>Thrissur</Dropdown.Item>
                            <Dropdown.Item onClick={(event) => {setDistrict('Palakkad')}}>Palakkad</Dropdown.Item>
                            <Dropdown.Item onClick={(event) => {setDistrict('Malappuram')}}>Malappuram</Dropdown.Item>
                            <Dropdown.Item onClick={(event) => {setDistrict('Kozhikode')}}>Kozhikode</Dropdown.Item>
                            <Dropdown.Item onClick={(event) => {setDistrict('Wayanad')}}>Wayanad</Dropdown.Item>
                            <Dropdown.Item onClick={(event) => {setDistrict('Kannur')}}>Kannur</Dropdown.Item>
                            <Dropdown.Item onClick={(event) => {setDistrict('Kasaragod')}}>Kasaragod</Dropdown.Item>
                            <Dropdown.Item onClick={(event) => {setDistrict('Bangalore')}}>Bangalore</Dropdown.Item>
                            <Dropdown.Item onClick={(event) => {setDistrict('Chennai')}}>Chennai</Dropdown.Item>
                            <Dropdown.Item onClick={(event) => {setDistrict('Hyderabad')}}>Hyderabad</Dropdown.Item>
                            <Dropdown.Item onClick={(event) => {setDistrict('Mumbai')}}>Mumbai</Dropdown.Item>
                        </DropdownButton>
                    </div>
                </div>
            </div>

            <div className={(divTwo)&&divTwo ? 'p-4 ani mt-4':'hidden-element'}>
                <h1 className='text-center'>{(coursename)&&coursename + " in "}{(district)&&district}</h1>
                <div className='table-responsive mt-4'>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                            <th>AOC Code</th>
                            <th>Address</th>
                            <th>Batch Start Date</th>
                            <th>Vacant Seat</th>
                            <th>Batch Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                (fulldata)&&fulldata.map((value,index) => {
                                    return(
                                        <>
                                            <tr>
                                            <td>{value.aocCode}</td>
                                            <td>{value.aocAddress}</td>
                                            <td>{value.aocBatchDate}</td>
                                            <td>{value.aocSeat}</td>
                                            <td>{value.aocBatch}</td>
                                            </tr>
                                        </>
                                    )
                                })
                            }
                            </tbody>
                        </Table>
                    </div>
                <div className='d-flex justify-content-center align-items-center mx-auto p-2'>
                    <button className='refresh' onClick={backFun}>Back</button>
                </div>
            </div>
        </>
    );
};

export default Data;
