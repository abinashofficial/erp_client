// src/pages/SignUp.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import { toast, ToastContainer } from 'react-toastify';
import { RxAvatar } from "react-icons/rx";
import Select from "react-select";



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
  countryCode:any;
  access_token:any;
}

interface CountryOption {
  value: string;
  label: JSX.Element;
}

const SignUp: React.FC = () => {
  const [visible, setVisible] = useState<Boolean>(true);

    const { login, empDetail } = useAuth();
    const [selectedCountry, setSelectedCountry] = useState<CountryOption | null>(null);

      const [formData, setFormData] = useState<SignupFormData>({
        employee_id:'',
        first_name: '',
        last_name: '',
        full_name: '',
        mobile_number: '',
        email: empDetail.email,
        date_of_birth: '',
        gender: '',
        password: '',
        confirmPassword:'',
        photo_url:"",
        countryCode:"",
        access_token:"",
      });

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
        setVisible(false)

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords doesn't match");
            setVisible(true)
            return;
        }
        // In a real app, add sign-up logic here
        if (selectedCountry?.value ==="" || selectedCountry?.value ===null){

        }else{
          formData.mobile_number = selectedCountry?.value + formData.mobile_number
        }
        console.log('Signing up with', formData);
        const controller = new AbortController();
        setTimeout(() => controller.abort(), 10000); // 10 seconds timeout
        // Add your API endpoint here
        //  const apiUrl = 'https://erp-iliw.onrender.com/public/signup';

    const apiUrl = '';

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
      console.log('result :', result);

      if (response.ok) {
        console.log('Signed up successful:', result);


        setFormData({...formData,
          employee_id: result.employee_id,
          first_name: result.first_name,
          last_name: result.last_name,
          full_name: (result.first_name + " " + result.last_name),
          mobile_number: result.mobile_number,
          email: result.email,
          date_of_birth: result.date_of_birth,
          gender: result.gender,
          password: result.password,
          photo_url:result.photo_url,
          access_token:result.access_token,
      })


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
        photo_url:"",
        confirmPassword:result.confirmPassword,
        access_token:result.access_token,
      });
        login(empDetail);
        toast.success('Signed up successful');
        setTimeout(() => {
         navigate('/home'); // Redirect to dashboard after login
       }, 5000);

      }else if (response.status===401){
        setVisible(true)
        alert("This mobile number is already registered.");
      }else if (response.status===400){
        setVisible(true)
        alert("This Email is already registered.");
      }else{
        console.error('Signup failed:', response);
      }
    } catch (error) {
      setVisible(true)
        alert("Internal server Error");
      console.error('Error:', error);
    }
    };

    const countryData = [
      {
        name: "United States",
        dialCode: "1",
        flag: "https://flagcdn.com/us.svg",
      },
      {
        name: "India",
        dialCode: "91",
        flag: "https://flagcdn.com/in.svg",
      },
      {
        name: "United Kingdom",
        dialCode: "44",
        flag: "https://flagcdn.com/gb.svg",
      },
      {
        name: "Canada",
        dialCode: "1",
        flag: "https://flagcdn.com/ca.svg",
      },
      {
        name: "Australia",
        dialCode: "61",
        flag: "https://flagcdn.com/au.svg",
      },
    ];
    
    
  
    const countryOptions = countryData.map((country) => ({
      value: country.dialCode,
      label: (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img
            src={country.flag}
            alt={`${country.name} flag`}
            style={{ width: "20px", height: "15px" }}
          />
          {country.name} ({country.dialCode})
        </div>
      ),
    }));

    const handleCountryChange = (selected: CountryOption | null) => {
      setSelectedCountry(selected);
    };
    return (
      <div style={{
        // background: 'linear-gradient(to bottom, #ff99ff 0%, #66ccff 100%)',

        height: '100vh', // Ensure it takes full viewport height
        width: '100vw',  // Ensure it takes full viewport width
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
              {visible ? (

        <div className="form-container">
            <div>
            <div style={{
              display:"flex",
fontSize:"100px",
justifyContent:"center",

            }}>
              
            < RxAvatar />

            </div>
            </div>


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
        {/* <div style={{
          display:"flex",
          justifyContent:"space-between",
        }}>

<div style={{
  display:"flex",
  alignItems:"center",
}}>
<Select
                  options={countryOptions}
                  value={selectedCountry}
                  onChange={handleCountryChange}
                  placeholder="Select Country"
                  // className="country-select"
                />
</div>

          
       
            <input
          type="text"
          name="mobile_number"
          placeholder="Mobile Number"
          value={formData.mobile_number}
          onChange={handleChange}
          required
        />
        </div> */}
        {/* <input
          type="email"
          name="email"
          placeholder = "Email"
          value={formData.email}
          onChange={handleChange}
          required
        /> */}
      <div       style={{
        display:"flex",
        alignItems:"center",
        justifyContent:"space-between",
      }}>
        <label>Date of Birth:</label>
        <input
          type="date"
          name="date_of_birth"
          value={formData.date_of_birth}
          onChange={handleChange}
          required
        />
      </div>
      <div
            style={{
              display:"flex",
              alignItems:"center",
              justifyContent:"space-between",
            }}>
        <label>Gender:</label>
        <select
                  style={{
                    height:"40px",
                    borderRadius:"10px",
                  }}
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
        </div>):(<div className="spinner"> </div>)}
        <ToastContainer/>

        </div>
    );
};

export default SignUp;
