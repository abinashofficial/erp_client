import React, { useState, useMemo } from 'react';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css'
import GoogleSignIn from './google'; // Adjust the path as necessary


interface SignInFormData {
    email: string;
    password: string;
  }

  interface SignupFormData {
    employee_id:any;
    first_name: any;
    last_name: any;
    full_name: any;
    mobile_number: any;
    email: any;
    date_of_birth: any;
    gender: any;
    password: any;
    confirmPassword:any;
    photo_url:any;
  }

const SignIn: React.FC = () => {
    const [formData, setFormData] = useState<SignInFormData>({
        email: '',
        password: '',
      });


    const { login } = useAuth();



    const navigate = useNavigate();
    // const { empDetail, setEmpDetail} = useContext(locateContext);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        console.log(name)
        setFormData({ ...formData, [name]: value });
      };

    const handleSignin = async(e: React.FormEvent) => {
        e.preventDefault();
        // login(formData.email, formData.password);

 // Add your API endpoint here
 const apiUrl = 'https://erp-iliw.onrender.com/public/signin';
// const apiUrl = 'http://localhost:8080/public/signin';


 try {
   const response = await fetch(apiUrl, {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify(formData),
   });
    console.log("response: ", response)

  if (response.ok) {
    const result:SignupFormData = await response.json();
    console.log('Signup successful:', result);

  const empDetail = ({
    employee_id: result.employee_id,
    first_name: result.first_name,
    last_name: result.last_name,
    full_name:result.first_name + " " + result.last_name,
    mobile_number: result.mobile_number,
    email: result.email,
    date_of_birth: result.date_of_birth,
    gender: result.gender,
    password: result.password,
    photo_url:result.photo_url,
    confirmPassword:result.confirmPassword,

  });
    login(empDetail);
    navigate('/home'); // Redirect to dashboard after login

  }else if (response.status===401){
    alert("Invalid Password");
  }else if (response.status===400){
    alert("Invalid Email");
  }else{
    console.error('Signup failed:', response);
  }
 } catch (error) {
  alert("Internal server Error");
  console.log('result :', error);

 }

    };

    



    return (
      <div style={{
        background: 'linear-gradient(to bottom, #ff99ff 0%, #66ccff 100%)',
        height: '100vh', // Ensure it takes full viewport height
        width: '100vw',  // Ensure it takes full viewport width
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <div className="form-container">

            <h2>Sign In </h2>
            <div>

            <form onSubmit={handleSignin}>
                <input
                    type="email"
                    name='email'
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name='password'
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Sign In</button>


            </form>
            </div>
<div style={{
  marginTop:"10px"
}}>
<nav>
            <Link to="/recoverypassword">Forget Password</Link>

            <Link to="/signup">Sign Up</Link>

        </nav>

</div>
<GoogleSignIn/>

        </div>
        </div>
    );
};


export default SignIn;



