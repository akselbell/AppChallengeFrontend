import './Test.css';
import Course from './Course';

function Test() {
    const urlParams = new URLSearchParams(window.location.search);
    const netid = urlParams.get('netid')?.toString();
    const givenName = urlParams.get('givenName')?.toString();

    return (
        <div className="background">
            <div className="header">
                <div className="nameButton">Welcome {givenName}</div>
            </div>
            <div className="coursesTitle">Courses</div>
            <Course />
        </div>
    );
}

export default Test;