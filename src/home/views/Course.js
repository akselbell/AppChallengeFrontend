import "./Course.css"

function Course(props) {
    const { name, building, startTime, endTime, days, campus } = props;
    return (
        <>
            <div className="course">
                <div className="courseName">{name}</div>
                <div className="courseDetail">Building: {building}</div>
                <div className="courseDetail">Start Time: {startTime}</div>
                <div className="courseDetail">End Time: {endTime}</div>
                <div className="courseDetail">Days: {days}</div>
                <div className="courseDetail">Campus: {campus}</div>
            </div>
        </>
    );
}

export default Course;