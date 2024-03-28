import './App.css';
import { useState } from 'react';
import { login } from '../controllers/AppController';

function App() {
  const [user, setUser] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(e).then((user) => {
      setUser(user)
      console.log(user);
      if (user[0] && user[0].netid && user[0].givenName) {
        window.location.href = `/test?netid=${user[0].netid}&givenName=${user[0].givenName}`;
      }
    });
  }

  return (
    <div className="App">
      {!user 
       &&
        <header className="App-header">
          <form onSubmit={handleSubmit}>
            <p>Enter Your netID:</p>
            <input type="text" className="loginInput" id="netid"></input>
            <input type="submit" className="submitButton"></input>
          </form>
        </header>
      }

    </div>
  );
}

export default App;
