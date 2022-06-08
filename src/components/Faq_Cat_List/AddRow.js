import React from "react"
import { useState } from "react";
const AddRow =props=>{
    const [title , settitle]=useState("");
    const [status , setstatus]=useState(1);
    const [btn , setbtn]=useState(true);
    function submit(){
        if(btn)
        {
            if(title!="")
            {
        setbtn(false)
        props.submit(title,status);
            }
            else{
                props.alert_type("alert-danger");
                props.error("عنوان دسته نمیتواند خالی باشد !");
              props.alert();
            }
        }

    }
    function changetitle(e){
        settitle(e.target.value);

    }
    function changestatus(e){
        setstatus(e.target.value);

    }
return(
    <tr>
    <th scope="row">

         <div class="badge badge-info">جدید</div>
        </th>
    <td>
     <input type="text" className="form-control title_input" value={title} onChange={changetitle} />
      </td>

    <td>
   <select className="form-control status_input" value={status} onChange={changestatus}><option value={0}> غیرفعال</option><option value={1}> فعال</option></select>
         </td>
    <td>
        <div className="btn-group">
           <div className="btn btn-success m-2" onClick={submit} >ذخیره </div>
                <div className="btn btn-danger m-2" onClick={props.cancel} >انصراف </div>
    
    </div>
        </td>
 
  </tr>
)
}
export default AddRow;