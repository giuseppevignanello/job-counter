import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Job {
  sendOrSave: boolean;
}

const AppMain = () => {
  const [apiUrl, setApiUrl] = useState<string>('http://127.0.0.1:8000/api/jobs');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);
  const [appliedJobs, setAppliedJobs] = useState<Job[]>([]);

  useEffect(() => {
    axios.get(apiUrl)
      .then((response) => {
        const fetchedJobs = response.data;
        setJobs(fetchedJobs);
      

        const savedJobs = fetchedJobs.filter((job: Job) => job.sendOrSave == false);
        setSavedJobs(savedJobs);
       

        const appliedJobs = fetchedJobs.filter((job: Job) => job.sendOrSave == true);
        setAppliedJobs(appliedJobs);
        
      })
      .catch((error) => {
        console.error('Error', error);
      });
  }, [apiUrl]);

  return (
    <div className='container'>
      <div className='row row-cols-6 justify-content-center mt-3'>
        <div>
          <h2>Saved</h2>
          <ul>
             {savedJobs.map((job, index) => (
             <li key={index}>{job.company}</li>
             ))}
          </ul>

        </div>
        <div>
          <h2>Applied</h2>
          <ul>
              {appliedJobs.map((job, index) => (
              <li key={index}>{job.company}</li>
              ))}
            </ul>

        </div>
      </div>
    </div>
  );
};

export default AppMain;
