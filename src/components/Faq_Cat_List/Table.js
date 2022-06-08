import React from 'react';
import { Fragment } from 'react';
import { useEffect, useState } from 'react';
import  "./styles.css";
import axios from 'axios';
import Tr from './Tr';
import AddRow from './AddRow';
import Pagination from 'react-js-pagination';
 import Alerts from "../Alerts"
 import * as Constants from '../../constants/urls';
 import Header from "../Header/Header";
 import { Drawer } from "@material-ui/core";
 import RightMenu from "../RightMenu";
 const Table = (props) => {

    const [cats,setcats]=useState([]);
    const [add,setadd]=useState(false);
    const [current_page,setcurrent_page]=useState(1);
    const [per_page,setper_page]=useState(1);
    const [total,settotal]=useState(1);
    const [alert,setalert]=useState(false);
    const[alerttype,setalerttype]=useState("alert-success");
    const[alertmassage,setalertmassage]=useState("");
    const [state, setState] = React.useState({right: false});

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
        setState({ ...state, [anchor]: open });
      };
       async function get_cats(page=1){
        
        const url=Constants.apiUrl+"/api/cats_list";
        await axios.get(`${url}?page=${page}`).then((response) => {
                setcats(response.data.data);
                setcurrent_page(response.data.current_page);
                setper_page(response.data.per_page);
                settotal(response.data.total);
         }).catch((error) => {
            alert_on();
            setalerttype("alert-danger");
             setalertmassage("خطایی رخ داده است !");
             console.log(error);
         
 
        });
    }
    async function savehandler(btn,id,title,status){
          
    const url=Constants.apiUrl+"/api/cats_update";

   await axios.post(url,{id:id,title:title,status:status}).then((response) => {
     alert_on();
     setalerttype("alert-success");
     setalertmassage("عملیات با موفقیت انجام شد !");
 
     }).catch((error) => {
        alert_on();
        setalerttype("alert-danger");
        setalertmassage("خطایی رخ داده است !");

     });
  
get_cats(current_page);   

  }
     useEffect(() => {
       get_cats(current_page);
      },[])
      function disabled(){
          if(add==false)
          {
              return "diesabled";
          }
          return "false";
      }
 const mp= cats!=null && cats.map((item) => {return(<Tr id={item.id} title={item.title} status={item.status} edit={savehandler} alert={alert_on} error={setalertmassage} alert_type={setalerttype}/>)})
 function add_click(){
     setadd(true);
 }   
 function cancel_add(){
    setadd(false);
}   
function alert_on()
{
     setalert(true); 
}
function alert_off()
{
     setalert(false); 
}
async function submit_add(title,status){
     const url=Constants.apiUrl+"/api/add_cat";

    await axios.post(url,{title:title,status:status}).then((response) => {
     setadd(false);
     get_cats(current_page);
     alert_on();
     setalerttype("alert-success");
     setalertmassage("عملیات با موفقیت انجام شد !");


      }).catch((error) => {
        alert_on();
        setalerttype("alert-danger");
        setalertmassage("خطایی رخ داده است !");

      });
}   


  return(
     <Fragment>
                 <Header title="مدیریت دسته های پرسش های متداول" menuItemClicked = {toggleDrawer('right', true)}/>
                <Drawer anchor="right" open={state['right']} onClose={toggleDrawer('right', false)}>
          <RightMenu />
        </Drawer>
     {alert==true && 
<Alerts type={alerttype} text={alertmassage} close={alert_off}/> }
         <div className='container-fluid'>
         <div className='table-responsive mt-5 mb-5'>

         <table className="table table-striped table-hover">
  <thead className=" ">
    <tr>
      <th scope="col">شناسه</th>
      <th scope="col">عنوان</th>
      <th scope="col">وضعیت</th>
      <th scope="col">عملیات</th>
    </tr>

  </thead> 
  <tbody>
 {
     mp
  }
  {  add==true && <AddRow cancel={cancel_add} submit={submit_add}  alert={alert_on} error={setalertmassage} alert_type={setalerttype}/>}
    </tbody>
 </table>
 </div>
 <button className='btn-block btn-success add-btn'   onClick={add_click} >افزودن دسته جدید</button>
 <div className='pager Page navigation example'>
 <Pagination
 totalItemsCount={total} 
 activePage={current_page}
 itemsCountPerPage={per_page}
 onChange={(number)=>{get_cats(number)}}
 itemClass="page-item"
 linkClass='page-link'
 firstPageText="اولین صفحه"
 lastPageText="آخرین صفحه"
 nextPageText="بعدی"
 prevPageText="قبلی"
 activeClass='pageactive'
 />
 </div>
 </div>
     </Fragment>
    );
}

export default Table;