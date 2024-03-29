import './Test.css';
import Course from './Course';
import { getCourses } from '../controllers/AppController';
import { useState, useEffect } from 'react';


function Test() {
    const [courses, setCourses] = useState(null);
    const urlParams = new URLSearchParams(window.location.search);
    const netid = urlParams.get('netid')?.toString();
    const givenName = urlParams.get('givenName')?.toString();
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
    }, []); // Empty dependency array to fetch courses only once when the component mounts
    
    

    return (
        <div className="background">
            <div className="header">
                <div className="nameButton">Welcome {givenName}</div>
                <div className="nameButton"><a href="/">Logout</a></div>
            </div>
            <div className="coursesTitle">
                Current Courses
                { courses ?
                    (
                        courses.map((course) => {
                        return <Course 
                                    courseName={course.courseName} 
                                    building={course.building} 
                                    startTime={course.startTime}
                                    endTime={course.endTime} 
                                    days={course.days} 
                                    campus={course.campus}/>
                    }))
                    : (<p>Loading courses...</p>)
                }
            </div>
        </div>
    );
}

export default Test;