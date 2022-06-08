import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import  "./itemstyles.css";
import axios from "axios";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import Alerts from "../Alerts";
import * as Constants from '../../constants/urls';
import Header from "../Header/Header";
import { Drawer } from "@material-ui/core";
import RightMenu from "../RightMenu";


 const Form=props=>{
  const[answer,setanswer]=useState("")
  const[shortanswer,setshortanswer]=useState("")
  const[question,setquestion]=useState("")
  const[cat,setcat]=useState(0)
  const[status,setstatus]=useState(1)
  const[top,settop]=useState(0)
  const[catlist,setcatlist]=useState()
  const[alert,setalert]=useState(false)
  const[alerttype,setalerttype]=useState("")
  const[alertmassage,setalertmassage]=useState("")
  const[id,setid]=useState(0)
 
 const get_id=useParams().id;
 console.log(get_id);
 
   const location = useLocation()
  const prop= location.state;
 

    function changetop(e){
     const val=e.target.value;
     val==1 && settop(0);
     val==0 && settop(1);
    }
    function selectinghandler(e){
      setcat(e.target.value);
  }
  function changequestion(e){
    setquestion(e.target.value);
}
    function changestatus(e){
       const val=e.target.value;
      val==1 && setstatus(0);
      val==0 && setstatus(1);
      }


      async function get_cats(){
         const url=Constants.apiUrl+"/api/get_cat_list";

      await axios.get(url).then((response) => {
             setcatlist(response.data);
              
      }).catch((error) => {
        console.log(error);
      });
      }
      async function get_items(){
        const url=Constants.apiUrl+"/api/get_select_answer";

       await axios.get(`${url}/${get_id}`).then((response) => {
        setid(response.data.id);      
        setquestion(response.data.question);      
        setanswer(response.data.answer);      
        setshortanswer(response.data.short_answer);      
        setcat(response.data.question_cats_id);      
        settop(response.data.top);      
        setstatus(response.data.status);      
        setstatus(response.data.status);      
 
      }).catch((error) => {
        console.log(error);
      });
      }
    useEffect(() => {

     get_cats();
     if(get_id!=null)
     {
  get_items();
      }
       },[]);
        const mp=catlist!=null && catlist.map((item,index) => {return(<option key={index} value={item.id}>{item.title}</option>)});
 async function submit()
{
  let error_massage="پر کردن ";
  let errors=0;
   if(question.trim()=="")
  {
    error_massage+="پرسش "
    errors++;
  }
  if(shortanswer=="")
  {
    if(errors>0)
    error_massage+="و "
    error_massage+="پاسخ کوتاه "
    errors++;
  }
  if(answer=="")
  {
    if(errors>0)
    error_massage+="و "
    error_massage+="پاسخ کامل "
    errors++;
  }
  if(cat==0)
  {
    if(errors>0)
    error_massage+="و "
    error_massage+="دسته "
    errors++;
  }
  error_massage+="الزامیست"
  if(errors>0)
  {
    setalertmassage(error_massage);
    setalert(true);
    setalerttype("alert-danger");
  }
  else{
 if(id==0)
 {
   
     const url=Constants.apiUrl+"/api/add_answer";

    await axios.post(url,{question:question,answer:answer,top:top,status:status,question_cats_id:cat,short_answer:shortanswer})
    .then((response) => {
 setalert(true);
     setalerttype("alert-success");
     setalertmassage("عملیات با موفقیت انجام شد !");
     settop(0);
     setstatus(1);
     setanswer("");
     setquestion("");
     setshortanswer("");
     setcat(0);


      }).catch((error) => {
        setalert(true);
        setalerttype("alert-danger");
        setalertmassage("خطایی رخ داده است !");

      });
  }
  else{
    const url=Constants.apiUrl+"/api/update_answer";

     await axios.post(url,{id:id,question:question,answer:answer,top:top,status:status,question_cats_id:cat,short_answer:shortanswer})
    .then((response) => {
 setalert(true);
     setalerttype("alert-success");
     setalertmassage("عملیات با موفقیت انجام شد !");
      


      }).catch((error) => {
        setalert(true);
        setalerttype("alert-danger");
        setalertmassage("خطایی رخ داده است !");

      });
  }
}


}
function alert_off(){
  setalert(false);
}

const [state, setState] = React.useState({right: false});

const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

        return(
<Fragment>


<Header title={id==0?"افزودن یک پرسش ":"ویرایش پرسش"} menuItemClicked = {toggleDrawer('right', true)}/>
                <Drawer anchor="right" open={state['right']} onClose={toggleDrawer('right', false)}>
          <RightMenu />
        </Drawer>

           {alert==true && <Alerts type={alerttype} text={alertmassage} close={alert_off}/> }
      <div className="container">
    <div className="card mt-5 mb-5">
    <div class="card-header">
<span>
  {prop==null ? "افزودن" : "ویرایش"} 
  
  </span>  </div>
    <div className="card-body">
        
    <div className="form-group m-4">
    <label   className="form-label">پرسش</label>
    <label className="form-label text-danger">*</label>
    
    <input type="text" className="form-control" onChange={changequestion} value={question}/>
  </div>
  <div className="form-group m-4">
    <label   className="form-label">پاسخ کوتاه </label>
    <label  className="form-label text-danger">*</label>

    <CKEditor
                    editor={ ClassicEditor }
                    data={shortanswer}
                     onChange={ ( event, editor ) => {
                        setshortanswer(editor.getData());
                     } }
                    
                 
                />

  </div>

  <div className="form-group m-4">
    <label   className="form-label">پاسخ کامل</label>
    <label  className="form-label text-danger">*</label>

    <CKEditor
                    editor={ ClassicEditor }
                    data={answer}
                     onChange={ ( event, editor ) => {
                        setanswer(editor.getData());
                     } }
                    
                 
                />
  </div>


      
  <div className="form-group m-4">
    <label   className="form-label">دسته بندی</label>
    <label  className="form-label text-danger">*</label>

    <select className="form-control" value={cat} onChange={selectinghandler}>
      <option value="0">انتخاب کنید </option>
        {mp}
    
    </select>
  </div>
  <div className="row m-4">
<div className="col-sm-6">
  <div className="form-group form-check">
    <label className="form-check-label ml-2 form-label">
      موارد مهم
      <input className="form-check-input mr-2" type="checkbox" value={top} checked={top==1 && "checked"} onChange={changetop}/> 

    </label>
    </div>
    </div>
    <div className="col-sm-6">

  <div className="form-group form-check">
  <label className="form-check-label ml-2 form-label">
      فعال
      <input className="form-check-input mr-2" type="checkbox" value={status} checked={status==1 && "checked"} onChange={changestatus} />

    </label>
    </div>
    </div>

  </div>
  <div className="form-group m-4">
  <button type="submit" class="btn-block btn-success submit" onClick={submit}>
  {prop==null ? "ذخیره" : "ویرایش"} 

  </button>
  </div>
  </div>
  </div>
  </div>
  </Fragment>
  )
}
export default Form;