import React from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import Table from "./Table";
import Header from "../Header/Header";
import { Drawer } from "@material-ui/core";
import RightMenu from "../RightMenu";

const FaqList =()=>{
    const [state, setState] = React.useState({right: false});

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
        setState({ ...state, [anchor]: open });
      };
return(
    <Fragment>
                <Header title="مدیریت پرسش های متداول" menuItemClicked = {toggleDrawer('right', true)}/>
                <Drawer anchor="right" open={state['right']} onClose={toggleDrawer('right', false)}>
          <RightMenu />
        </Drawer>

            
            <Table />
            <div className="link">
            <Link to="/add">
            <div className="btn-block btn-success text-center pt-2 pb-2 ">
                افزودن مورد جدید
            </div>
            </Link>
            </div>

    </Fragment>
 )
}
export default FaqList;