import React, { useState, useContext, useEffect } from 'react';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Password } from '@mui/icons-material';

interface SignInFormData {
    email: string;
    password: string;
  }

  interface SignupFormData {
    employee_id:any;
    first_name: any;
    last_name: any;
    mobile_number: any;
    email: any;
    date_of_birth: any;
    gender: any;
    password: any;
    confirmPassword:any;
  }


const SignIn: React.FC = () => {
    const [formData, setFormData] = useState<SignInFormData>({
        email: '',
        password: '',
      });
    const { login, empDetail } = useAuth();
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
//  const apiUrl = 'https://erp-iliw.onrender.com/public/signin';
const apiUrl = 'http://localhost:8080/public/signin';


 try {
   const response = await fetch(apiUrl, {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify(formData),
   });
    console.log("response: ", response)
    const result:SignupFormData = await response.json();


   if (response.ok) {
     console.log('Sign-in successful:', result.employee_id);
     login(result);
     console.log("empDetail: ", empDetail)

     navigate('/home'); // Redirect to dashboard after login
     // Handle successful sign-in (e.g., redirect or store token)
   } else {
     console.error('Sign-in failed:', result);
   }
 } catch (error) {
    alert("Sign-in failed")
    console.error('Error:', error);
 }

    };


    return (
        <div className="form-container">
            <h2>Sign In</h2>
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
<div>
<nav>
            <Link to="/recoverypassword">Forget Password</Link>

            <Link to="/signup">Sign Up</Link>

        </nav>
</div>



        </div>
    );
};


export default SignIn;



