import App from "./App";
import './Test.css';

function Test() {
    const urlParams = new URLSearchParams(window.location.search);
    const netid = urlParams.get('netid')?.toString();
    const givenName = urlParams.get('givenName')?.toString();

    return (
        <div className="background">
            <div className="header">
                <div>{givenName}</div>
                <div>{netid}</div>
            </div>
        </div>
    );
}

export default Test;