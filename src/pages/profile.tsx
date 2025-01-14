// src/pages/SignUp.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { RxAvatar } from "react-icons/rx";
import { MdOutlineEdit } from "react-icons/md";


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
      <div className='main-content'>

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

                                  <div className="input-group">
            <label htmlFor="first-name">First Name</label>
            <input
              id="first-name"
              type="text"
              value={empDetail.first_name}
              onChange={handleChange}
              placeholder="Enter your first name"
              required
              disabled
            />
          </div>

          <div className="input-group">
            <label htmlFor="first-name">Last Name</label>
            <input
              id="last-name"
              type="text"
              value={empDetail.last_name}
              onChange={handleChange}
              placeholder="Enter your last name"
              required
              disabled
            />
          </div>


          <div className="input-group">
            <label htmlFor="date-of-birth">Date of Birth</label>
            <input
              id="date-of-birth"
              type="date"
              value={formatDate(empDetail.date_of_birth)}
              onChange={handleChange}
              required
              disabled

            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              value={empDetail.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              name="email"
              disabled
            />
          </div>

          <div className="input-group">
            <label htmlFor="mobile-number">Mobile Number</label>

            <input
              id="mobile-number"
              type="text"
              value={empDetail.mobile_number}
              onChange={handleChange}
              placeholder="Enter your mobile number"
              required
              disabled

            />

          </div>

          <div className="input-group">
            <label htmlFor="gender">Gender</label>
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
