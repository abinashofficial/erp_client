// src/pages/SignUp.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import { toast, ToastContainer } from 'react-toastify';




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

const SignUp: React.FC = () => {
  const [visible, setVisible] = useState<Boolean>(true);

    const { login } = useAuth();

      const [formData, setFormData] = useState<SignupFormData>({
        employee_id:'',
        first_name: '',
        last_name: '',
        full_name: '',
        mobile_number: '',
        email: '',
        date_of_birth: '',
        gender: '',
        password: '',
        confirmPassword:'',
        photo_url:"",
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

    // const apiUrl = 'http://localhost:8080/public/signup';

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
        console.log('Signed up successful:', result);
        setFormData({...formData,
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
      })
        login(result);
        toast.success('Signed up successful');
        setVisible(false)
        setTimeout(() => {
         navigate('/home'); // Redirect to dashboard after login
       }, 5000);

      }else if (response.status===401){
        alert("Invalid Password");
      }else if (response.status===400){
        alert("Invalid Email");
      }else{
        console.error('Signup failed:', response);
      }
    } catch (error) {
        alert("Internal server Error");
      console.error('Error:', error);
    }
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
              {visible && (

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
        </div>)}
        <ToastContainer/>

        </div>
    );
};

export default SignUp;
