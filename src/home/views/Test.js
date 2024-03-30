import './Test.css';
import Course from './Course';
import { getCourses } from '../controllers/AppController';
import { useState, useEffect } from 'react';
import Modal from 'react-modal';


function Test() {
    const [courses, setCourses] = useState(null);
    const [popupAdd, setPopupAdd] = useState(true);
    const urlParams = new URLSearchParams(window.location.search);
    const netid = urlParams.get('netid')?.toString();
    const givenName = urlParams.get('givenName')?.toString();
    
    const togglePopup = (bool) => {
        setPopupAdd(bool);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedCourses = await getCourses(netid);
                setCourses(fetchedCourses);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };
        fetchData();
    }, [courses]); // Empty dependency array to fetch courses only once when the component mounts

    const addCourse = () => {
        togglePopup(true);
    }

    return (
        <div className="background">
            <div className="header">
                <div className="nameButton">Welcome {givenName}</div>
                <div className="nameButton"><a href="/">Logout</a></div>
            </div>
            <button onClick={addCourse}>add course</button>
            <div className="coursesTitle">
                Current Courses
                { courses ?
                    (
                        courses.map((course) => {
                        return <Course 
                                    courseName={course.courseName} 
                                    building={course.building} 
                                    startTime={course.startTime}
                                    days={course.days} 
                                    campus={course.campus}/>
                    }))
                    : (<p>Loading courses...</p>)
                }
            </div>
            <Modal className="verificationPopup" isOpen={popupAdd} onRequestClose={() => {setPopupAdd(false);}} ariaHideApp={false} style={{
                overlay: {
                backgroundColor: 'rgba(0, 0, 0.5, 0.5)', /* Adjust the opacity as needed */
                }}}>
                <form className="addCourse" onSubmit={(e) => {
                    e.preventDefault();

                }}>
                    <div className="popupTitle">Add Course</div>

                    <label className="addCourse-label" htmlFor="name">Course Name:</label>
                    <input id="Name" type="text" className="login-input" name="name" required />
                    
                    <div>
                        <label className="addCourse-label" htmlFor="building">Building:</label>
                        <input id="Building" type="text" className="login-input" name="building" required />
                    </div>

                    <div>
                        <label className="addCourse-label" htmlFor="startTime">Start Time:</label>
                        <input id="StartTime" type="text" className="login-input" name="startTime" required />
                    </div>

                    <div>
                    <label className="addCourse-label" htmlFor="days">Days:</label>
                    <input id="Days" type="text" className="login-input" name="days" required />
                    </div>

                    <div>
                    <label className="addCourse-label" htmlFor="campus">Campus:</label>
                    <input id="Campus" type="text" className="login-input" name="campus" required />
                    </div>
                </form>
                <button className="popupOKButton" id="payNow" onClick={() => {
                    togglePopup(false);
                }}>Submit</button>
            </Modal>
        </div>
    );
}

export default Test;