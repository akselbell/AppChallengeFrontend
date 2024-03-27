import './App.css';
import { useState } from 'react';
import { login } from '../controllers/AppController';

function App() {
  const [user, setUser] = useState(null);

  const handleSubmit = async (e) => {
    login(e).then((user) => {setUser(user)});
  }

  return (
    <div className="App">
      {user ? 
        <header className="App-header">
          <p>hello {user[0].givenName}, your NetID is {user[0].netid}</p>
        </header>
        :
        <header className="App-header">
          <form onSubmit={handleSubmit}>
            <p>Enter your NetId:</p>
            <input type="text" className="loginInput" id="netid"></input>
            <input type="submit" className="submitButton"></input>
          </form>
        </header>
      }

    </div>
  );
}

export default App;
