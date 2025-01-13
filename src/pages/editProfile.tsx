// src/pages/SignUp.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { toast, ToastContainer } from 'react-toastify';
import { RxAvatar } from "react-icons/rx";



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

const EditProfile: React.FC = () => {
  const [visible, setVisible] = useState<Boolean>(true);

    const {login, empDetail, logout} = useAuth();



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
        countryCode:empDetail.countryCode,
        access_token: empDetail.access_token,
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
        photo_url:"",
        confirmPassword:result.confirmPassword,
        access_token:result.access_token,
      });
        login(empDetail);
        toast.success('Updated successfull');

     setTimeout(() => {
      navigate('/profile'); // Redirect to dashboard after login
    }, 5000);

     // Handle successful sign-in (e.g., redirect or store token)
   }else if (response.status===500){
    alert(result.message);
    setVisible(true)
    logout()

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


    return (
      <div className='main-content'>
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

                <div                 style={{
                    display:"flex",
                    alignItems:"center",
                    justifyContent:"space-between",
                }}>
                    <h4>
                        First Name :
                    </h4>
        <input
          type="text"
          placeholder="Name"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          required
        />
                </div>


                <div                 style={{
                    display:"flex",
                    alignItems:"center",
                    justifyContent:"space-between",
                }}>
                    <h4>
                        Last Name :
                    </h4>
                    <input
          type="text"
          name="last_name"
          placeholder="Sure Name"
          value={formData.last_name}
          onChange={handleChange}
        />
                    </div>
                    <div                 style={{
                    display:"flex",
                    alignItems:"center",
                    justifyContent:"space-between",
                }}>
                    <h4>
                        Mobile :
                    </h4>
                    <input
          type="text"
          name="mobile_number"
          placeholder="Mobile Number"
          value={formData.mobile_number}
          onChange={handleChange}
        />
                    </div>



      <div       style={{
        display:"flex",
        alignItems:"center",
        justifyContent:"space-between",
      }}>
        <label>
            <h4>
            Date of Birth :
                </h4></label>
        <input
          type="date"
          name="date_of_birth"
          value={formatDate(formData.date_of_birth)}

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
        <label>
          <h4>
        Gender :
            </h4>
            </label>
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
        <ToastContainer/>

        </div>
    );
};

export default EditProfile;
