import './Test.css';
import Course from './Course';
import { createCourse, getCourses, getLocation, getNextCourse } from '../controllers/AppController';
import { useState, useEffect } from 'react';
import Modal from 'react-modal';

const dayNameToIndex = {
    'Sunday': 0, 'Monday': 1, 'Tuesday': 2, 'Wednesday': 3, 'Thursday': 4, 'Friday': 5, 'Saturday': 6
};

function Test() {
    const [courses, setCourses] = useState(null);
    const [popupAdd, setPopupAdd] = useState(false);
    const urlParams = new URLSearchParams(window.location.search);
    const netid = urlParams.get('netid')?.toString();
    const givenName = urlParams.get('givenName')?.toString();
    const [nextCourse, setNextCourse] = useState(null);
    const [timeToLeave, setTimeToLeave] = useState(null);
    const [location, setLocation] = useState(null);
    const togglePopup = (bool) => {
        setPopupAdd(bool);
    };

    
    const getLocation = () => {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    resolve({ latitude: latitude, longitude: longitude });
                }, () => {
                    console.log("Cannot get location.")
                    reject("Cannot get location");
                });
            } else {
                console.log("Geolocation not supported");
                reject("Geolocation not supported");
            }
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedCourses = await getCourses(netid);
                setCourses(fetchedCourses);
                const fetchedNextCourse = await getNextCourse(netid);
                setNextCourse(fetchedNextCourse);
                
                const days = fetchedNextCourse.days.split(',').map(day => day.trim());
                for (const day of days) {
                    const dayIndex = dayNameToIndex[day];
                    if (dayIndex === new Date().getDay()) {
                        setTimeToLeave("5:00 PM");
                    }
                }

                const fetchedLocation = await getLocation();
                console.log(fetchedLocation);
                setLocation(fetchedLocation);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };
        fetchData();

        // Fetch location every minute
        const intervalId = setInterval(async () => {
            try {
                const fetchedLocation = await getLocation();
                console.log(fetchedLocation);
                setLocation(fetchedLocation);
            } catch (error) {
                console.error('Error fetching location:', error);
            }
        }, 60000); // Interval set to 1 minute (60000 milliseconds)

        // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []); // Empty dependency array to fetch courses only once when the component mounts

    const addCourseButton = () => {
        togglePopup(true);
        // createCourse()
    }

    const postCourse = async (course) => {
        try {
            await createCourse(course);
            const fetchedNextCourse = await getNextCourse(netid);
            setNextCourse(fetchedNextCourse);

            const days = fetchedNextCourse.days.split(',').map(day => day.trim());
            for (const day of days) {
                const dayIndex = dayNameToIndex[day];
                if (dayIndex === new Date().getDay()) {
                    setTimeToLeave("5:00 PM");
                }
            }
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    }

    return (
        <div className="background">
            <div className="header">
                <div className="nameButton">Welcome {givenName}</div>
                <div className="nameButton"><a href="/">Logout</a></div>
            </div>
            <div className="wrapper">
                <div className="coursesTitle">
                    <div className="currentCourseTitle">Current Courses</div>
                    { courses ?
                        (
                            courses.map((course, index) => {
                            return <Course 
                                        key={index}
                                        name={course.name} 
                                        building={course.building} 
                                        startTime={course.startTime}
                                        days={course.days} 
                                        campus={course.campus}/>
                        }))
                        : (<p>Loading courses...</p>)
                    }
                    <button className="addCourseButton" onClick={addCourseButton}>Add Course</button>
                </div>
                <div className="coursesTitle" id="nextCourse">
                    <div className="currentCourseTitle">Next Upcoming Course</div>
                    {  nextCourse ?
                        <Course 
                                        name={nextCourse.name} 
                                        building={nextCourse.building} 
                                        startTime={nextCourse.startTime}
                                        days={nextCourse.days} 
                                        campus={nextCourse.campus}/>
                        : (<p>Loading next course...</p>)
                    }
                </div>
                <div className="coursesTitle" id="nextCourse">
                    <div className="currentCourseTitle">Time to Leave:</div>
                    <div className="locationBox">
                        <div>{location ? (<>Longitude: {location.longitude}</>) : (<>No Location Detected</>)}</div>
                        <div>{location ? (<>Latitude: {location.latitude}</>) : (<>No Location Detected</>)}</div>
                        <div className="TTL">Time to leave: {timeToLeave ? <>{timeToLeave}</> : (<>No Class Today</>)}</div>
                    </div>
                </div>
                
            </div>

            <Modal className="verificationPopup" isOpen={popupAdd} onRequestClose={() => {setPopupAdd(false);}} ariaHideApp={false} style={{
                overlay: {
                backgroundColor: 'rgba(0, 0, 0.5, 0.5)', /* Adjust the opacity as needed */
                }}}>
                <form className="addCourse" onSubmit={(e) => {
                    e.preventDefault();
                    const name = (document.getElementById("Name")).value;
                    const building = (document.getElementById("Building")).value;
                    const startTime = (document.getElementById("StartTime")).value;
                    const days = (document.getElementById("Days")).value;
                    const campus = (document.getElementById("Campus")).value;
                    
                    const newCourse = {name: name, building: building, startTime: startTime, days: days, campus: campus, netid: netid};
                    const newCourses = [...courses, newCourse];
                    setCourses(newCourses);
                    postCourse(newCourse);
                    togglePopup(false);
                }}>
                    <div className="popupTitle">Add Course</div>

                    <div className="input">
                        <label className="addCourse-label" htmlFor="name">Course Name:</label>
                        <input id="Name" type="text" className="login-input" name="name" required />
                    </div>
                    <div className="input">
                        <label className="addCourse-label" htmlFor="building">Building:</label>
                        <input id="Building" type="text" className="login-input" name="building" required />
                    </div>

                    <div className="input">
                        <label className="addCourse-label" htmlFor="startTime">Start Time:</label>
                        <input id="StartTime" type="text" className="login-input" name="startTime" required />
                    </div>

                    <div className="input">
                        <label className="addCourse-label" htmlFor="days">Days:</label>
                        <input id="Days" type="text" className="login-input" name="days" required />
                    </div>

                    <div className="input">
                        <label className="addCourse-label" htmlFor="campus">Campus:</label>
                        <input id="Campus" type="text" className="login-input" name="campus" required />
                    </div>
                    <button className="popupOKButton" id="payNow" type="submit">Submit</button>
                </form>
            </Modal>
        </div>
    );
}

export default Test;