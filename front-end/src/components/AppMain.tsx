import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';

interface Job {
  id: number; 
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
    
      <div className='row row-cols-2
       justify-content-between mt-3'>
        <div className='box'>
          <h4 className='text-center box_title'>Saved</h4>
          <ul className='list-unstyled'>
             {savedJobs.map((job, index) => (
             <Link className='text-dark' to={`/job_detail/${job.id}`}>
             <li className='box_item' key={index}><p className="job_title"> {job.title} </p>
             <span className='job_company'> {job.company}</span>
             </li>
             </Link>
             ))}
          </ul>

        </div>
        <div className='box'>
          <h4 className='text-center box_title'>Applied</h4>
          <ul className='list-unstyled'>
              {appliedJobs.map((job, index) => (
                <Link className='text-dark' to={`/job_detail/${job.id}`}>
              <li className='box_item' key={index}><p className="job_title"> {job.title} </p>
              <span className='job_company'> {job.company}</span>
              </li>
              </Link>
              ))}
            </ul>

        </div>
      </div>
    </div>
  );
};

export default AppMain;