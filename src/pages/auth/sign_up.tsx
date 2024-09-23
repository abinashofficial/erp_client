// src/pages/SignUp.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';


interface SignupFormData {
    first_name: string;
    last_name: string;
    mobile_number: string;
    email: string;
    date_of_birth: string;
    gender: string;
    password: string;
    confirmPassword:string;
  }

const SignUp: React.FC = () => {
    const { login, empDetail } = useAuth();

    const [formData, setFormData] = useState<SignupFormData>({
        first_name: '',
        last_name: '',
        mobile_number: '',
        email: '',
        date_of_birth: '',
        gender: '',
        password: '',
        confirmPassword:'',
      });
      const [err, setErr] = useState<any>({});
 const navigate = useNavigate()
      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
            // Allow only numbers in mobile_number field
    if (name === 'mobile_number' && !/^\d*$/.test(value)) {
        return; // Prevent updating state if the value is not a valid integer
      }
        setFormData({ ...formData, [name]: value });
      };

    const handleSignUp = async(e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords doesn't match");
            return;
        }
        // In a real app, add sign-up logic here
        console.log('Signing up with', formData);
        // Add your API endpoint here
    const apiUrl = 'https://erp-iliw.onrender.com/public/signup';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          created_at: new Date().toISOString(), // Set created_at to current timestamp
        }),
      });
      const result = await response.json();
      setErr(result)
      console.log('result :', result);

      if (response.ok) {
        console.log('Signup successful:', result);
        login(result);
        navigate('/home'); // Redirect to dashboard after login

      } else {
        console.error('Signup failed:', result);

      }
    } catch (error) {
        console.log('err :', err);

        alert("Internal server Error");
      console.error('Error:', error);
    }
    };

    return (
        <div className="form-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSignUp}>
        <input
          type="text"
          placeholder="Name"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="last_name"
          placeholder="Sure Name"
          value={formData.last_name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="mobile_number"
          placeholder="Mobile Number"
          value={formData.mobile_number}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder = "Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      <div>
        <label>Date of Birth:</label>
        <input
          type="date"
          name="date_of_birth"
          value={formData.date_of_birth}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Gender:</label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>
        <input
          type="password"
          name="password"
          placeholder= "Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
                <input
          type="password"
          name="confirmPassword"
          placeholder= "Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
                <button type="submit">Sign Up</button>
            </form>
            <p>Already have an account? <Link to="/">Sign In</Link></p>
        </div>
    );
};

export default SignUp;
