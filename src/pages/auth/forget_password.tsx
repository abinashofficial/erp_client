// src/pages/SignUp.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';



interface SignInFormData {
    email: string;
    password: string;
    confirmPassword:string
  }

const ForgetPassword: React.FC = () => {
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
            alert("Passwords don't match");
            return;
        }

         // Add your API endpoint here
 const apiUrl = 'https://erp-iliw.onrender.com/public/recovery';

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
     console.log('Sign-in successful:', result);
     toast.success('Password Changed successful!');

     navigate('/'); // Redirect to dashboard after login
     // Handle successful sign-in (e.g., redirect or store token)
   } else {
     console.error('Sign-in failed:', response.statusText);
   }
 } catch (error) {
    alert("Sign-in failed")
   console.error('Error:', error);
 }
        // In a real app, add sign-up logic here
        console.log('Signing up with', formData.email, formData.password);
    };

    return (
        <div className="form-container">
            <h2>Recovery Password</h2>
            <form onSubmit={handlePassword}>
                <input type="email" name='email' placeholder="Email" value={formData.email} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                <input type="password" name='confirmPassword' placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
                <button type="submit">Change Password</button>
            </form>
            <p>Already have an account? <Link to="/">Sign In</Link></p>
        </div>
    );
};

export default ForgetPassword;
