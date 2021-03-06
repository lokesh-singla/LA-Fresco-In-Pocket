import React, {useContext} from "react";
import ReactDOM from "react-dom";
import {useHistory} from 'react-router-dom';
import Axios from "axios";
import Cookies from 'js-cookie';
import './Comp-CSS/SignInUp_modal.css';
import './Comp-CSS/Sign_Up_form.css';



const Modal = React.forwardRef((props, ref)=>{

    const [display, setDisplay] = React.useState(false);

    const history = useHistory();

    React.useImperativeHandle(ref, () => {
        return {
         openModal: ()=> open(),
         close: ()=> close()
        }
      });

    const open = ()=>{
    setDisplay(true);
    };
    
    const close = ()=>{
    setDisplay(false);
    };

    const [email, setEmail] = React.useState("");
    const [password, setPaasword] = React.useState("");

    const signInHandler = async (e)=>{
        e.preventDefault();

           const loginRes = await Axios.post(
                "http://localhost:5000/users/login",
                 {
                  username: email,
                  password: password,
                }
                )
                Cookies.set('username', loginRes.data.user.username)
                Cookies.set('id', loginRes.data.user._id)
                Cookies.set('basket', loginRes.data.user.basket);
                Cookies.set('token', loginRes.data.token);
                console.log(Cookies.get());
                close();
                history.push('/');
            
            
    }
    
    if(display)
    {
        return ReactDOM.createPortal(
            <div className = {"modal-wrapper"}>
                <div className={"modal-backdrop"}>
                    <div className={"modal-box"}>
                    <form onSubmit={signInHandler}>
                        <div className="form-container">
                            <h1>Sign In</h1><br/>
                            <p>Please fill in this form to create an account.</p>
                             <hr/><br/>
                            <label><b>Email</b></label><br/>
                            <input type="text" onChange={e => setEmail(e.target.value)} placeholder="Enter Email" required/><br/>
                            <label><b>Password</b></label><br/>
                            <input type="password" onChange={e => setPaasword(e.target.value)} placeholder="Enter Password" required/><br/>

                    <div className="clearfix">
                        <button type="button" class="cancelbtn" onClick={close}>Cancel</button>
                        <button type="submit" class="signupbtn">Sign In</button>
                    </div>
                </div>
            </form>  
                    </div>
                </div>
            </div>,
            document.getElementById('modal-root')
        );
    }
    else{ return null; };
});


export default Modal;