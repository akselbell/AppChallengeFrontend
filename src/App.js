import './App.css';

function App() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const netid = document.getElementById("netid").value;

    try {
      const url = `http://localhost:80/api/getData/${netid}`;
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          netID: netid
        })
      };

      // Send POST request using fetch API
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data); // Handle response data as needed
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSubmit}>
          <p>Enter your NetId:</p>
          <input type="text" className="loginInput" id="netid"></input>
          <input type="submit" className="submitButton"></input>
        </form>
      </header>
    </div>
  );
}

export default App;
