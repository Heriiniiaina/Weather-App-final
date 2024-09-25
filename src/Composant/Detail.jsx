import React from 'react';

export default function Detail({ details }) {
  return (
   <div className='detail'>
      
      <div className='feels one'>
                     <p className='titre'>{details[0].title}</p>
                     <p>{details[0].value}</p>
                </div>
       
                <div className='preicpitation one'>
                     <p className='titre'>{details[1].title}</p>
                     <p>{details[1].value}</p>
                </div>
       
                <div className='visibility one'>
                   <p className='titre'>{details[2].title}</p>
                   <p>{details[2].value}</p>
                </div>
       
                <div className='humidity one'>
                   <p className='titre'>{details[3].title}</p>
                   <p>{details[3].value}</p>
                </div>
   </div>
  );
}
