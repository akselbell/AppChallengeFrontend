

export const login = async (e) => {
    e.preventDefault();
    const netid = document.getElementById("netid").value;

    try {
      const url = `http://localhost:80/api/getData/${netid}`;
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      };
      console.log("here");
      // Send POST request using fetch API
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
        console.log("error");
        console.error('Error submitting form:', error);
      return null;
    }
  }