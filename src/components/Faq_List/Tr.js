import axios from "axios";
import React from "react"
import { useState } from "react";
import { useEffect } from "react";
import { Link, Redirect } from 'react-router-dom';
import  "./itemstyles.css";
import image from "../../assets/images/edit_black.png"
 
const Tr =props=>{
     const[question,setquestion]=useState("");
    const[answer,setanswer]=useState("");
    const[cat,setcat]=useState("");
    const[catid,setcatid]=useState("");
    const[status,setstatus]=useState(0);
    const[id,setid]=useState(0);
    const[top,settop]=useState(0);
 
 

 
    useEffect(() => {
        setquestion(props.question);
        setid(props.id);
        setstatus(props.status)
        setanswer(props.answer)
        setcat(props.cat)
        settop(props.top)
        setcatid(props.catid);
        
         }, [props.id]);
     
       

  return(

    <tr>
        
    <th scope="row"className="tableth">
<span>
     {id }
     </span>
        </th>
        <td className="tabletd">
        <span>
             {question}
       </span>
     </td>
     <td className="tabletd">
        <span>
             {answer}
       </span>
     </td>
     <td className="tabletd">
        <span>
             {cat}
       </span>
     </td>
     <td className="tabletd">
        <span>
              {status==1?<div className="badge badge-success">فعال</div>:<div className="badge badge-danger">غیرفعال</div>}

       </span>
     </td>
     <td className="tabletd">
        <span>
        {top==1?<div className="badge badge-success">فعال</div>:<div className="badge badge-danger">غیرفعال</div>}

        
       </span>
     </td>
 
     <td className="tabletd">
        <span>
            <Link to={`/edit/${id}`} >
                <div className="edit_icon">
                 <img src={image}/>
                 </div>
            </Link>
       </span>
     </td>
 
 
  </tr>
)
}
export default Tr;