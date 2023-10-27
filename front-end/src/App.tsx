import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [apiUrl, setApiUrl] = useState<string>('http://127.0.0.1:8000/api/jobs');
  const [jobs, setJobs] = useState<Object[]>([]);

  useEffect(() => {
    axios.get(apiUrl)
      .then((response) => {
    
        setJobs(response.data);
      })
      .catch((error) => {
        console.error('Error', error);
      });
  }, [apiUrl]); 

  return (
    <div>
      <ul>
        {jobs.map((job, index) => (
          <li key={index}>{JSON.stringify(job)}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;