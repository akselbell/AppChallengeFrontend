

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
    // Send POST request using fetch API
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
      console.log("error");
      console.error('Error submitting form:', error);
    return null;
  }
}

export const getCourses = async (netid) => {
  try {
      const url = `http://localhost:80/api/courses/${netid}`;

      const options = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        };
        // Send POST request using fetch API
        const response = await fetch(url, options);
        const data = await response.json();
        return data;
  } catch (error) {
      console.log("error");
      console.error('Error submitting form:', error);
    return null;
  };
}

export const createCourse = async (course) => {
  try {
      console.log("creating course api");
      const url = `http://localhost:80/api/courses/new`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(course)
      });

      if (!response.ok) {
          throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Success:', data);
      return data; // Return the response data
  } catch (error) {
      console.log("error");
      console.error('Error submitting form:', error);
    return null;
  };
}