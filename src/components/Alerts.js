import React from "react";
import { Fragment } from "react";
import { useEffect } from "react";
const Alerts =props=>{
  useEffect(()=>{
    console.log("now");
    const interval = setInterval(() => { 
      props.close();
      }, 3000);
      return () => clearInterval(interval);
  })
return(
    <Fragment>
    <div className={['alert text-center', props.type].join(' ')}role="alert">
        {
            props.text
        }
  <button type="button" class="close" ><span aria-hidden="true" onClick={props.close}>&times;</span>
</button>
</div>
 
</Fragment>
)
}
export default Alerts;