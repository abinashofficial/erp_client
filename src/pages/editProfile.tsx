// src/pages/SignUp.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { toast } from 'react-toastify';
import { RxAvatar } from "react-icons/rx";
import Select from "react-select";
import UploadDrive from "../pages/uploaddrive"
import Header from '../components/header';



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
  coins:any;
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
const EditProfile: React.FC = () => {
    const [selectedCountry, setSelectedCountry] = useState<CountryOption | null>(null);

    const {login, empDetail, visible, setVisible} = useAuth();



      const [formData, setFormData] = useState<SignupFormData>({
        employee_id:empDetail.employee_id,
        first_name: empDetail.first_name,
        last_name: empDetail.last_name,
        full_name: empDetail.full_name,
        mobile_number: empDetail.mobile_number,
        email: empDetail.email,
        date_of_birth: empDetail.date_of_birth,
        gender: empDetail.gender,
        password: "",
        confirmPassword: "",
        photo_url: empDetail.photo_url,
        country_code:empDetail.countryCode,
        access_token: empDetail.access_token,
        coins:empDetail.coins, 
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
      if (empDetail.photo_url && empDetail.photo_url.length > 0) {
        formData.photo_url = empDetail.photo_url
      }
        e.preventDefault();
        setVisible(false)

        // In a real app, add sign-up logic here
        console.log('Signing up with', formData);
        // Add your API endpoint here

        const apiUrl = 'https://erp-iliw.onrender.com/public/updateprofile';
// const apiUrl = 'http://localhost:8080/public/updateprofile';


 try {
   const response = await fetch(apiUrl, {
     method: 'PUT',
     headers: {
       'Content-Type': 'application/json',
       Authorization: `Bearer ${empDetail.access_token}`,

     },
     body: JSON.stringify(formData),
   });
   const result = await response.json();

   if (response.ok) {
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
        photo_url:result.photo_url,
        confirmPassword:result.confirmPassword,
        access_token:result.access_token,
        country_code:result.country_code,
        coins:result.coins,

      });
        login(empDetail);
        toast.success('Updated successfull');

     setTimeout(() => {
      navigate('/profile'); // Redirect to dashboard after login
      setVisible(true)

    }, 5000);

     // Handle successful sign-in (e.g., redirect or store token)
   }else if (response.status===500){
          alert(result.message + " Sign in again");
    setVisible(true)

  } else {
    console.error('update failed:', response);
   }
 } catch (error) {
  setVisible(true)
  alert("Internal server Error");
   console.error('Error:', error);
 }
        // In a real app, add sign-up logic here
        console.log('updated', formData);
    };


    const formatDate = (timestamp: string) => {
        if (timestamp !==""){

            const date = new Date(timestamp);
            return date.toISOString().split('T')[0]; // Get only the date part (YYYY-MM-DD)
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
        name: "Canada",
        dialCode: "+1",
        flag: "https://flagcdn.com/ca.svg",
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

        // useEffect(() => {
        //   let temp = countryMap[empDetail.country_code]
        //   setSelectedCountry ({
        //         value: temp.dialCode,
        //         label: (
        //           <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        //             <img
        //               src={temp.flag}
        //               alt={`${temp.name} flag`}
        //               style={{ width: "20px", height: "15px" }}
        //             />
        //             {temp.name} ({temp.dialCode})
        //           </div>
        //         ),
        //       });    
                
        // }, [empDetail.country_code]);

    const handleCountryChange = (input: CountryOption | null) => {
      formData.country_code = input?.value
      setSelectedCountry(input)
    };

    return (
      <div className='main-content'>
        <Header/>

              {visible ? (

        <div className="form-container">
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


{/* 
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
      </div> */}

                        <UploadDrive/>
            <form onSubmit={handleSignUp}>

                
            <div className="input-group">
            <label htmlFor="first-name">First Name</label>
            <input
              type="text"
              placeholder="Enter your first name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
            />


          </div>

          <div className="input-group">
            <label htmlFor="first-name">Last Name</label>
            <input
              id="last-name"
              type="text"
              name = "last_name"
              value={formData.last_name}
              onChange={handleChange}
              placeholder="Enter your last name"
              required
            />
          </div>


          <div className="input-group">
            <label htmlFor="date-of-birth">Date of Birth</label>
            <input
              id="date-of-birth"
              type="date"
              name = "date_of_birth"
              value={formatDate(formData.date_of_birth)}
              onChange={handleChange}
              required

            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              name="email"
            />
          </div>

          <div className="input-group">
            <label htmlFor="mobile-number">Mobile Number</label>


          </div>


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
                  name = "selected_country"
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
        </div>


          
          <div className="input-group">
            <label htmlFor="gender">Gender</label>
            <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
        >
          <option value="">Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
          </div>




      <div style={{
                display:"flex",
                flexDirection:"column",
                justifyContent:"space-around",
                padding:"20px",
            }}>
            <button type="submit">Submit</button>
                <button style={{
                    background:"none",
                    color:"black",
                }} onClick={()=> navigate("/profile")}>Cancel</button>
            </div>
            </form>

        </div>):(<div className="spinner"> </div>)}

        </div>
    );
};

export default EditProfile;
