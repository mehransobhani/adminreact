import React from 'react';
import { Fragment } from 'react';
import { useEffect, useState } from 'react';
 import axios from 'axios';
import Tr from './Tr';
 import Pagination from 'react-js-pagination';
 import Alerts from "../Alerts"
 import * as Constants from '../../constants/urls';

  const Table = (props) => {

    const [cats,setcats]=useState([]);
     const [current_page,setcurrent_page]=useState(1);
    const [per_page,setper_page]=useState(1);
    const [total,settotal]=useState(1);
    const [alert,setalert]=useState(false);
    const[alerttype,setalerttype]=useState("alert-success");
    const[alertmassage,setalertmassage]=useState("");
    
       async function get_items(page=1){
        const url=Constants.apiUrl+"/api/get_answer_item";

       await axios.get(`${url}?page=${page}`).then((response) => {
                setcats(response.data.data);
                setcurrent_page(response.data.current_page);
                setper_page(response.data.per_page);
                settotal(response.data.total);
                console.log(response.data);
         }).catch((error) => {
            alert_on();
            setalerttype("alert-danger");
             setalertmassage("خطایی رخ داده است !");
             console.log(error);
         
 
        });
    }
 
     useEffect(() => {
       get_items(current_page);
      },[])
     
  const mp=  cats.map((item) => {return(<Tr id={item.id} question={item.question} answer={item.answer} status={item.status} cat={item.title} catid={item.question_cats_id} top={item.top}  alert={alert_on} error={setalertmassage} alert_type={setalerttype}/>)})
 
 
function alert_on()
{
     setalert(true); 
}
function alert_off()
{
     setalert(false); 
}
 

  return(
     <Fragment>
         {console.log(alertmassage)}
    {alert==true && 
<Alerts type={alerttype} text={alertmassage} close={alert_off}/> }
         <div className='container-fluid'>
         <div className='table-responsive'>

         <table className="table table-striped table_answers mt-5 mb-5 table-hover">
  <thead className=" ">
    <tr>
      <th scope="col">شناسه</th>
      <th scope="col">پرسش</th>
      <th scope="col">پاسخ</th>
      <th scope="col">دسته بندی</th>
      <th scope="col">وضعیت</th>
      <th scope="col">پرسش متداول</th>
      <th scope="col">ویرایش</th>
    </tr>

  </thead> 
  <tbody>
 {
     mp
  }
     </tbody>
 </table>
 </div>
  <div className='pager Page navigation example'>
 <Pagination
 totalItemsCount={total} 
 activePage={current_page}
 itemsCountPerPage={per_page}
 onChange={(number)=>{get_items(number)}}
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