import axios from "axios";
import React from "react"
import { useState } from "react";
import { useEffect } from "react";
import { Redirect } from 'react-router-dom';
import "./styles.css";
 
const Tr =props=>{
    const[edit,setedit]=useState(false);
    const[title,settitle]=useState("");
    const[status,setstatus]=useState(0);
    const[id,setid]=useState(0);
    const [btn , setbtn]=useState(true);

 

 
    useEffect(() => {
        settitle(props.title);
        setid(props.id);
setstatus(props.status)
setedit(false);
         }, [props.id]);
    function edithandler(){
        setedit(true);

    }
    function canclehandler(){
        setedit(false);
        settitle(props.title);
        setid(props.id);
setstatus(props.status)
    }
    function typinghandler(e)
    {
         settitle(e.target.value);

    }
   function selectinghandler(e){
       setstatus(e.target.value);
   }
   function savehandler(){
       if(btn==true)
       {
           if(title!="")
           {
            setbtn(false);
            props.edit(btn,id,title,status);
            setbtn(true);
            setedit(false);
           }
           else
           {
               props.alert_type("alert-danger");
               props.error("عنوان دسته نمیتواند خالی باشد !");
             props.alert();
           }
        
       }

       


   }

  return(

    <tr>
        
    <th scope="row">
<span className="tablespan">
     {id }
     </span>
        </th>
    <td>
        <span>
    {edit==true && <input type="text" className="form-control title_input"  value={title}  onChange={typinghandler}/>}
    {edit==false && title}
    </span>
     </td>

    <td>
    <span className="tablespan">
    {edit==true && <select className="form-control status_input" value={status} onChange={selectinghandler}><option value={0}> غیرفعال</option><option value={1}> فعال</option></select>}
    {edit==false && (status==1?<div className="badge badge-success">فعال</div>:<div className="badge badge-danger">غیرفعال</div>)}
    </span>
         </td>
    <td>
    <span className="tablespan">
        <div className="btn-group">
            {edit==false &&  <div className="btn btn-warning" id={id} onClick={edithandler}>ویرایش </div>}
            {edit ==true &&     <div className="btn btn-success m-2" id={id} onClick={savehandler}>ذخیره </div>}
            {edit ==true &&     <div className="btn btn-danger m-2" id={id} onClick={canclehandler}>انصراف </div>}
    
    </div>
    </span>
        </td>
 
  </tr>
)
}
export default Tr;