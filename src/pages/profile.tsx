// src/pages/SignUp.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
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
}

const Profile: React.FC = () => {

    const { empDetail} = useAuth();


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
        countryCode:"+91",
      });

      const formatDate = (timestamp: string) => {
        if (timestamp !==""){
            const date = new Date(timestamp);
            return date.toISOString().split('T')[0]; // Get only the date part (YYYY-MM-DD)
        }

    };
 const navigate = useNavigate()

      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
            // Allow only numbers in mobile_number field
    if (name === 'mobile_number' && !/^\d*$/.test(value)) {
        return; // Prevent updating state if the value is not a valid integer
      }
        setFormData({ ...formData, [name]: value });
      };

    return (
      <div style={{
        // backgroundColor: "lightblue", // Dynamically change background color
        // background: 'linear-gradient(to bottom, #ff99ff 0%, #66ccff 100%)',

        height: '100vh', // Ensure it takes full viewport height
        width: '100vw',  // Ensure it takes full viewport width
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>

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
                                  <form >



                <div
                style={{
                    display:"flex",
                    alignItems:"center",
                    justifyContent:"space-between",
                }}>
                    <h3>
                    Full Name : 
                    </h3>
                <input
          type="text"
          placeholder="Name"
          name="first_name"
          value={empDetail.full_name}
          onChange={handleChange}
          disabled
        />
                </div>



          <div style={{
            display:"flex",
            alignItems:"center",
            justifyContent:"space-between",
          }}>
            <h3>
            Mobile :
            </h3>


            <input 
          type="text"
          name="mobile_number"
          placeholder="Mobile Number"
          value={empDetail.mobile_number}
          onChange={handleChange}
          disabled
        />
          </div>
       

<div
style={{
    display:"flex",
    alignItems:"center",
    justifyContent:"space-between",
  }}
  >
    <h3>
    Email :

    </h3>
        <input
          type="email"
          name="email"
          placeholder = "Email"
          value={empDetail.email}
          onChange={handleChange}
          disabled
        />
</div>

      <div
      style={{
        display:"flex",
        alignItems:"center",
        justifyContent:"space-between",
      }}
      >
        <label>
            <h3>
            Date of Birth :
                </h3></label>
        <input
          type="date"
          name="date_of_birth"
          value={formatDate(empDetail.date_of_birth)}
          onChange={handleChange}
          disabled
        />
      </div>


      <div
      style={{
        display:"flex",
        alignItems:"center",
        justifyContent:"space-between",
      }}
      >
        <label>
            <h3>
            Gender :</h3></label>
        <select
                  style={{
                    height:"40px",
                    borderRadius:"10px",
                    display:"block",
                  }}
          name="gender"
          value={empDetail.gender}
          disabled
        >
          <option value="">Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>


            </form>
            {empDetail.mobile_number ==="" ? (
            <div>
            <p>Signed in with Google account? <Link to="/signup">Sign Up</Link></p>


            </div>):(   
                <div style={{
                    display:"flex",
                    justifyContent:"center",
                }}>
            <button onClick={()=> navigate("/editprofile")}>Edit Profile</button>

                </div>        
        )}


        </div>

        </div>
    );
};

export default Profile;
