// src/pages/SignUp.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import { toast, ToastContainer } from 'react-toastify';
import { RxAvatar } from "react-icons/rx";
import Select from "react-select";
import Upload from "../uploaddrive"
import { dividerClasses } from '@mui/material';



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
  country_code:any;
  access_token:any;
}

interface CountryOption {
  value: string;
  label: JSX.Element;
}

const SignUp: React.FC = () => {
  // const [visible, setVisible] = useState<Boolean>(true);


    const { login, empDetail, visible, setVisible } = useAuth();
    const [selectedCountry, setSelectedCountry] = useState<CountryOption | null>(null);

      const [formData, setFormData] = useState<SignupFormData>({
        employee_id:'',
        first_name: '',
        last_name: '',
        full_name: '',
        mobile_number: empDetail.mobile_number  || "",
        email: empDetail.email,
        date_of_birth: '',
        gender: '',
        password: '',
        confirmPassword:'',
        photo_url:"",
        country_code:empDetail.country_code,
        access_token:"",
      });

 const navigate = useNavigate()


//  setFormData({ ...formData, ["photo_url"]: empDetail.photo_url });



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
      if (empDetail.photo_url && empDetail.photo_url.length > 0) {
        formData.photo_url = empDetail.photo_url
      }
      const controller = new AbortController();
      setTimeout(() => controller.abort(), 10000); // 10 seconds timeout
        setVisible(false)

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords doesn't match");
            setVisible(true)
            return;
        }

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
          country_code:result.country_code,
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
        photo_url:result.photo_url,
        confirmPassword:result.confirmPassword,
        access_token:result.access_token,
        country_code:result.country_code,
      });
        toast.success('Signed up successful');
        setTimeout(() => {
          login(empDetail);
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
        alert("Internal server Error");
        setVisible(true)

      }
    } catch (error:any) {
      if (error.name === "AbortError") {
        setVisible(true)
        alert("Request timed out");
        return
        // setError("Request timed out");
      } else {
        setVisible(true)
        alert("Internal server Error");
        console.log(error, "Internal server Error")
        return
        // setError("Failed to fetch data: " + err.message);
      }
    }
    };

    const countryData = [
      {
        name: "United States",
        dialCode: "+1",
        flag: "https://flagcdn.com/us.svg",
      },
      {
        name: "India",
        dialCode: "+91",
        flag: "https://flagcdn.com/in.svg",
      },
      {
        name: "United Kingdom",
        dialCode: "+44",
        flag: "https://flagcdn.com/gb.svg",
      },
      {
        name: "Australia",
        dialCode: "+61",
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

    const countryMap: Record<string, { name: string; dialCode: string; flag: string }> = {
      "+1": {
        name: "United States",
        dialCode: "+1",
        flag: "https://flagcdn.com/us.svg",
      },
      "+91": {
        name: "India",
        dialCode: "+91",
        flag: "https://flagcdn.com/in.svg",
      },
      "+44": {
        name: "United Kingdom",
        dialCode: "+44",
        flag: "https://flagcdn.com/gb.svg",
      },
      "+61": {
        name: "Australia",
        dialCode: "+61",
        flag: "https://flagcdn.com/au.svg",
      },
    };

    
useEffect(() => {

                          if (empDetail.country_code){
                            let temp = countryMap[empDetail.country_code]
                            const selected = ({
                              value: temp.dialCode,
                              label: (
                                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                  <img
                                    src={temp.flag}
                                    alt={`${temp.name} flag`}
                                    style={{ width: "20px", height: "15px" }}
                                  />
                                  {temp.name} ({temp.dialCode})
                                </div>
                              ),
                            });
                            setSelectedCountry(selected);
                          }  
                                
                        }, [empDetail.country_code]);
    const handleCountryChange = (selected: CountryOption | null) => {
      setSelectedCountry(selected);
      formData.country_code = selected?.value
    };
    return (
      <div className='main-content'>
              {visible ? (

        <div className="form-container">


{/* <div style={{
                display:"flex",
  fontSize:"100px",
  justifyContent:"center",
  
              }}>
                
              < RxAvatar />
  
              </div> */}

                                {empDetail.photo_url ? (
                                  <div>
              
              <div 
                      style={{
                        display: 'flex',
                        justifyContent: "space-around",
                        alignItems: 'center',
                        padding:"10px",
                      }}
                      >
                      {empDetail.photo_url && (
                        <img
                          src={empDetail.photo_url}
                          alt="Profile Preview"
                          style={{
                            width: '100px',
                            height: '100px',
                            objectFit: 'cover',
                            borderRadius: '50px',
                          //   marginTop: '10px',
                          }}
                        />
                      )}
                    </div>
                                  </div>
                                ):(
                                  <div>
                                      <div style={{
                                        display:"flex",
                          fontSize:"100px",
                          justifyContent:"center",
                          
                                      }}>
                                        
                                      < RxAvatar />
                          
                                      </div>
                                  </div>
                                )}



    
      <Upload/>


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


        <div style={{
          display:"flex",
          justifyContent:"space-between",
          flexWrap:"wrap",

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
                  isDisabled ={!!formData.mobile_number}
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
          disabled={!!formData.mobile_number}
        />
        </div>


        <input
          type="email"
          name="email"
          placeholder = "Email"
          value={formData.email}
          onChange={handleChange}
          disabled={!!formData.email}
          required
        />
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
            {/* <p>Already have an account? <Link to="/">Sign In</Link></p> */}
            <p className="signin-link">
          Already have an account? <a href="/">Sign In</a>
        </p>
        </div>):(<div className="spinner"> </div>)}
        <ToastContainer/>

        </div>
    );
};

export default SignUp;
