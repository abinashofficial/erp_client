// src/pages/SignUp.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useAuth } from '../../context/authContext';




interface SignInFormData {
    email: string;
    password: string;
    confirmPassword:string
  }

const ForgetPassword: React.FC = () => {
  const [visible, setVisible] = useState<Boolean>(true);

    const [formData, setFormData] = useState<SignInFormData>({
        email: '',
        password: '',
        confirmPassword:""
      });


      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });
      };
      const navigate = useNavigate()


    const handlePassword = async(e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords doesn't match");
            return;
        }
        setVisible(false)


         // Add your API endpoint here
 const apiUrl = 'https://erp-iliw.onrender.com/public/recovery';
// const apiUrl = 'http://localhost:8080/public/recovery';


 try {
   const response = await fetch(apiUrl, {
     method: 'PUT',
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify(formData),
   });

   if (response.ok) {
     const result = await response.json();
     toast.success('Password Changed successfull');
     setTimeout(() => {
      navigate('/'); // Redirect to dashboard after login
    }, 5000);

     // Handle successful sign-in (e.g., redirect or store token)
   }else if (response.status===400){
    alert("Invalid Email");
    setVisible(true)

  } else {
    console.error('recover failed:', response);
   }
 } catch (error) {
  setVisible(true)
  alert("Internal server Error");
   console.error('Error:', error);
 }
        // In a real app, add sign-up logic here
        console.log('Signing up with', formData.email, formData.password);
    };

    return (

        <div style={{
          // backgroundColor: "lightblue", // Dynamically change background color
          background: 'linear-gradient(to bottom, #ff99ff 0%, #66ccff 100%)',

          height: '100vh', // Ensure it takes full viewport height
          width: '100vw',  // Ensure it takes full viewport width
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>

      {visible ? (
        <div className="form-container" >
            <h2>Recovery Password</h2>
            <form onSubmit={handlePassword}>
                <input type="email" name='email' placeholder="Email" value={formData.email} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                <input type="password" name='confirmPassword' placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
                <button type="submit">Change Password</button>

            </form>
            <p>Already have an account? <Link to="/">Sign In</Link></p>
            </div>
          ):(<div className="spinner"> </div>
          )}
<ToastContainer/>

        </div>
    );
};

export default ForgetPassword;
