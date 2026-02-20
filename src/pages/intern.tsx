// src/pages/SignUp.tsx
import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { RxAvatar } from "react-icons/rx";
import Select from "react-select";
import CloudinaryUploader from './uploaddrive';
import { useAuth } from '../context/authContext';
// import { dividerClasses } from '@mui/material';





interface IntershipFormData {
  first_name: any;
  last_name: any;
  mobile_number: any;
  email: any;
  date_of_birth: any;
  gender: any;
  photo_url:any;
  country_code:any;
  duration:any;
  role:any;
}

interface CountryOption {
  value: string;
  label: JSX.Element;
}

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
    
const Internship: React.FC = () => {


    const { empDetail, visible, setVisible } = useAuth();
    const [selectedCountry, setSelectedCountry] = useState<CountryOption | null>(null);

      const [formData, setFormData] = useState<IntershipFormData>({
  first_name: "",
  last_name: "",
  mobile_number: "",
  email: "",
  date_of_birth: "",
  gender: "",
  photo_url:"",
  country_code:"",
  duration:"",
  role:"",
      });



      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
            // Allow only numbers in mobile_number field
    if (name === 'mobile_number' && !/^\d*$/.test(value)) {
        return; // Prevent updating state if the value is not a valid integer
      }
        setFormData({ ...formData, [name]: value });
      };



const handleSignUp = async (e: React.FormEvent) => {
  e.preventDefault();

  // Attach photo URL if exists
  if (empDetail.photo_url && empDetail.photo_url.length > 0) {
    formData.photo_url = empDetail.photo_url;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 sec timeout
  setVisible(false);

  console.log('Submiting up with', formData);

  // API endpoint
  // const apiUrl = 'http://localhost:8080/public/internship';
  const apiUrl = 'https://crud-production-a206.up.railway.app/public/internship';

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        created_at: new Date().toISOString(), // current timestamp
      }),
      signal: controller.signal,
    });

    const result = await response.json();
    console.log('Result:', result);

    if (response.ok) {
      toast.success('Registered successfully');

      // Open new tab after 5 seconds and restore visibility
      setTimeout(() => {
        window.open('https://shindentech.vercel.app', '_blank');
        setVisible(true);
      }, 5000);

    } else if (response.status === 401) {
      alert('This mobile number is already registered.');
      setVisible(true);
    } else if (response.status === 400) {
      alert('This Email is already registered.');
      setVisible(true);
    } else {
      console.error('Signup failed:', response);
      alert('Internal server error');
      setVisible(true);
    }
  } catch (error: any) {
    if (error.name === 'AbortError') {
      alert('Request timed out');
    } else {
      console.error('Internal server error:', error);
      alert('Internal server error');
    }
    setVisible(true);
  } finally {
    clearTimeout(timeoutId); // clean up timeout
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
        {/* <Header/> */}
              {visible ? (

        <div className="form-container"
        // style={{
        //     marginTop:"60px"
        // }}
        >


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


                  <h2>College ID Card</h2>

    
      <CloudinaryUploader/>


            <form onSubmit={handleSignUp}>


                            <div
            style={{
              display:"flex",
              alignItems:"center",
              justifyContent:"space-between",
            }}>
        <label>Duration:</label>
        <select
                  style={{
                    height:"40px",
                    borderRadius:"10px",
                  }}
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          required
        >
          <option value="">Select Duration</option>
          <option value="Week">1 Week</option>
          <option value="Weeks">2 Weeks</option>
                    <option value="1 Month">1 Month</option>
            <option value="2 Months">2 Months</option>
                    <option value="3 Months">3 Months</option>
                                <option value="6 Months">6 Months</option>



        </select>
      </div>




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
          placeholder="Surname"
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
                  isDisabled ={empDetail.mobile_number}
                  className="country-select"
                  required
                />
</div>

          
       
            <input
          type="text"
          name="mobile_number"
          placeholder="Mobile Number"
          value={formData.mobile_number}
          onChange={handleChange}
          required
           disabled={empDetail.mobile_number}
        />
        </div>


        <input
          type="email"
          name="email"
          placeholder = "Email"
          value={formData.email}
          onChange={handleChange}
          disabled={!!empDetail.email}
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

                           <div
            style={{
              display:"flex",
              alignItems:"center",
              justifyContent:"space-between",
              marginTop:"20px",
            }}>
        <label>Role:</label>
        <select
                  style={{
                    height:"40px",
                    borderRadius:"10px",
                  }}
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
        >
          <option value="">Select Role</option>
          <option value="IT & Technology">IT & Technology</option>
          <option value="Marketing & Digital Media">Marketing & Digital Media</option>
                    <option value="Engineering & Logistics">Engineering & Logistics</option>
            <option value="Finance & Consulting">Finance & Consulting</option>
                    <option value="Other Roles">Other Roles</option>


        </select>
      </div>


       <button
       style={{
        marginTop:"20px",
    }}
       type="submit">Submit</button>

            </form>
            {/* <p>Already have an account? <Link to="/">Sign In</Link></p> */}




        </div>):(<div className="spinner"> </div>)}

        </div>
    );
};

export default Internship;
