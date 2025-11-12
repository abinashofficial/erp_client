// import { useEffect, useState } from "react";
// import { gapi } from "gapi-script";
// import Header from "../components/header"
// import { useNavigate } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';






// const CLIENT_ID = "252613924014-pajsq4m0ntcvr099amb4175nik39sj4h.apps.googleusercontent.com";


// // const CLIENT_ID = "542517918505-svmc1d3vh5r4g636mfp7j4d401mhdj7f.apps.googleusercontent.com";
// const SCOPES = "https://www.googleapis.com/auth/calendar.events";
// const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

// declare global {
//   interface Window {
//     gapi: any;
//   }
// }

// export default function ScheduleGmeet() {

//   const [signedIn, setSignedIn] = useState(false);
//   // const [meetLink, setMeetLink] = useState<string | null>("");
//     const [startDate, setDate] = useState<any>("");

//   const [title, setTitle] = useState("Team Meeting");
//   const [startTime, setStartTime] = useState(() => {
//     const d = new Date();
//     d.setMinutes(d.getMinutes() + 15);
//     return d.toISOString().slice(0, 16);
//   });
//   const [endTime, setEndTime] = useState(() => {
//     const d = new Date();
//     d.setMinutes(d.getMinutes() + 45);
//     return d.toISOString().slice(0, 16);
//   });
//   const [attendees] = useState("prisonbirdstech@gmail.com");
//   const [loading, setLoading] = useState(true);
//    const navigate = useNavigate()
//         const [selectedSlot, setSelectedSlot] = useState("");

//   // Define your time slots
//   const timeSlots = [
//     "09:00 AM - 10:00 AM",
//     "10:00 AM - 11:00 AM",
//     "11:00 AM - 12:00 PM",
//     "12:00 PM - 01:00 PM",
//     "01:00 PM - 02:00 PM",
//     "02:00 PM - 03:00 PM",
//     "03:00 PM - 04:00 PM",
//     "04:00 PM - 05:00 PM",
//     "05:00 PM - 06:00 PM",
//   ];

//   // Convert "9:00 AM" → "09:00", "1:00 PM" → "13:00"
//   const convertTo24Hour = (time: string): string => {
//     const [t, modifier] = time.split(" ");
//     let [hours, minutes] = t.split(":").map(Number);
//     if (modifier === "PM" && hours !== 12) hours += 12;
//     if (modifier === "AM" && hours === 12) hours = 0;
//     return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
//   };

//   // Update start/end time based on slot + date
//   const updateTimeFromSlot = (date: string, slot: string) => {
//     if (!date || !slot) return;

//     const [startLabel, endLabel] = slot.split(" - ");
//     const start24 = convertTo24Hour(startLabel);
//     const end24 = convertTo24Hour(endLabel);

//     setStartTime(`${date}T${start24}`);
//     setEndTime(`${date}T${end24}`);
//   };

//   // When slot changes
//   const handleSlotChange = (slot: string) => {
//     setSelectedSlot(slot);
//     updateTimeFromSlot(startDate, slot);
//   };



//   const signIn = () => gapi.auth2.getAuthInstance().signIn();
//   // const signOut = () => {
//   //   gapi.auth2.getAuthInstance().signOut();
//   //   setMeetLink(null);
//   // };

//   const createMeet = async () => {
//     setLoading(false);
//     if (isButtonDisabled){
//       alert("Select All the Fields")
//               setLoading(true);


//       return
//     }
//     const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
//     const startISO = new Date(startTime).toISOString(); // includes seconds & timezone
// const endISO = new Date(endTime).toISOString();
// if (new Date(endISO) <= new Date(startISO)) {
//   console.error("End time must be after start time");
//   return;
// }

//     const event = {
//       summary: title,
//       start: { dateTime: startISO, timeZone: tz },
//       end: { dateTime: endISO, timeZone: tz },
//       attendees: attendees.split(",").map((email) => ({ email: email.trim() })),
//       conferenceData: {
//         createRequest: {
//           requestId: String(Date.now()),
//           conferenceSolutionKey: { type: "hangoutsMeet" },
//         },
//       },
//         reminders: {
//     useDefault: true, // Google will send default email reminders
//   },
//     };

//     try {
//       const res = await gapi.client.calendar.events.insert({
//         calendarId: "primary",
//         resource: event,
//         conferenceDataVersion: 1,
//         sendUpdates: "all",
//       });
//       // setMeetLink(res.result.hangoutLink || null);
//               toast.success('Demo Booked');
      
//            setTimeout(() => {
//             navigate('/blog'); // Redirect to dashboard after login      
//           }, 5000);
//     } catch (err) {
//       console.error("Error creating meeting:", err);
//     } finally {
//                  setTimeout(() => {
//     setLoading(true);

//           }, 5000);
//     }
//   };
//   const isButtonDisabled = loading || !startDate || !selectedSlot;



  
//   useEffect(() => {
//     gapi.load("client:auth2", () => {
//       gapi.client.init({
//         clientId: CLIENT_ID,
//         discoveryDocs: DISCOVERY_DOCS,
//         scope: SCOPES,
//       }).then(() => {
//         const auth = gapi.auth2.getAuthInstance();
//         setSignedIn(auth.isSignedIn.get());
//         auth.isSignedIn.listen(setSignedIn);
//         // if (auth.isSignedIn.get()) {
//         //   const profile = auth.currentUser.get().getBasicProfile();
//         //   setAttendees(profile.getEmail());
//         // }
//       });
//     });
//   }, []);

//       // When date changes — reapply same slot if one is selected
//   useEffect(() => {
//     if (selectedSlot && startDate) {
//       updateTimeFromSlot(startDate, selectedSlot);
//     }
//   }, [startDate]); // runs whenever the date changes
//   return (
//       <div>
//         <Header/>
//         <div style={{
//           display:"flex",
//           justifyContent:"center",
//           alignItems:"center",
//           height:"80vh",

//         }}>

//         {loading?(
          
//    <div style={{display:"flex",alignItems:"center", flexDirection:"column", padding: 20, marginTop:"80px",height:"70vh", justifyContent:"center" }}>

//       <h2>Schedule Demo</h2>

//       {!signedIn && <button onClick={signIn}>Sign in with Google</button>}

//       {signedIn && (
//         <div style={{
//             display:"flex",
//             justifyContent:"center",
//             alignItems:"center",
//             flexDirection:"column",
//             gap:"20px",
//         }}>
//           <div style={{

//           }}>
//             <label>Title: </label>
//             <input value={title} onChange={(e) => setTitle(e.target.value)} />
//           </div>
//           {/* <div>
//             <label>Start: </label>
//             <input type="datetime-local" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
//           </div>
//           <div>
//             <label>End: </label>
//             <input type="datetime-local" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
//           </div> */}
// <div style={{
//   display:"flex",
//   flexDirection:"row",
//   alignItems:"center",

// }}>

//             <label >Date: </label>



//           <div style={{
//                       marginLeft:"10px",

//           }} >
//             <input

//             style={{
//                           cursor:"pointer", 

//             }}
//               id="date-of-birth"
//               type="date"
//               name = "date_of_birth"
//               value={startDate}
//               onChange={(e) => setDate(e.target.value)}
//               required

//             />
//           </div>
// </div>


// <div>
//             <label >Slot: </label>


//       <select
//         id="timeSlot"
//         value={selectedSlot}
//         onChange={(e) => handleSlotChange(e.target.value)}
//         style={{
//           height:"30px",
//           marginLeft:"10px",
//           cursor:"pointer",
//         }}
//       >
//         <option value="">Select a time slot</option>
//         {timeSlots.map((slot, index) => (
//           <option key={index} value={slot}>
//             {slot}
//           </option>
//         ))}
//       </select>
// </div>
//       {/* <div style={{ marginTop: "10px" }}>
//         <p>
//           <strong>Start Time:</strong> {startTime}
//         </p>
//         <p>
//           <strong>End Time:</strong> {endTime}
//         </p>
//       </div> */}
              
//           {/* <div>
//             <label>Attendees: </label>
//             <input value={attendees} onChange={(e) => setAttendees(e.target.value)} />
//           </div> */}

//       {/* Book Button */}
//       <div style={{ marginTop: 10 }}>
//         <button onClick={createMeet} >
//           {loading ? "Booking..." : "Book Demo"}
//         </button>
//       </div>
//         </div>
//       )}
// {/* 
//       {meetLink && (
//         <div style={{ marginTop: 20 }}>
//           <strong>Google Meet Link:</strong>{" "}
//           <a href={meetLink} target="_blank" rel="noreferrer">{meetLink}</a>
//         </div>
//       )} */}
//     </div>

//         ):(
          
// <div className="spinner"> </div>
//         )}



 
//             <ToastContainer/>
    
//           </div>
//                   </div>


//   );
// }








import { gapi } from "gapi-script";
import Header from "../components/header";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// // const CLIENT_ID = "542517918505-svmc1d3vh5r4g636mfp7j4d401mhdj7f.apps.googleusercontent.com";
import { useEffect, useState } from "react";
import GoogleReviews from "./googlereviews";
import { useAuth } from '../context/authContext';



const CLIENT_ID = "252613924014-pajsq4m0ntcvr099amb4175nik39sj4h.apps.googleusercontent.com";
const SCOPES = "https://www.googleapis.com/auth/calendar.events.readonly https://www.googleapis.com/auth/calendar.events";
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

// timeSlots predefined
const timeSlots = [
  "09:00 AM - 10:00 AM",
  "10:00 AM - 11:00 AM",
  "11:00 AM - 12:00 PM",
  "12:00 PM - 01:00 PM",
  "01:00 PM - 02:00 PM",
  "02:00 PM - 03:00 PM",
  "03:00 PM - 04:00 PM",
  "04:00 PM - 05:00 PM",
  "05:00 PM - 06:00 PM",
];

declare global {
  interface Window {
    gapi: any;
  }
}

// Convert "09:00 AM" → "09:00"
const convertTo24Hour = (time: string): string => {
  const [t, modifier] = time.split(" ");
  let [hours, minutes] = t.split(":").map(Number);
  if (modifier === "PM" && hours !== 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
};

// Map API events to booked slots
const parseBookedSlots = (events: any[]): string[] => {
  const booked: string[] = [];

  events.forEach(event => {
    const start = new Date(event.start.dateTime); // use local time
    const hours = start.getHours();
    const minutes = start.getMinutes();
    const formattedStart = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;

    // find matching slot
    const slot = timeSlots.find(s => convertTo24Hour(s.split(" - ")[0]) === formattedStart);
    if (slot) booked.push(slot);
  });

  return booked;
};

// ✅ check if a slot is active (weekday & future & within 9–6)
const isSlotActive = (date: string, slot: string): boolean => {
  if (!date) return false;

  const selected = new Date(date);
  const day = selected.getDay(); // 0=Sun, 6=Sat
  if (day === 0 || day === 6) return false; // weekends

  const [startLabel] = slot.split(" - ");
  const start24 = convertTo24Hour(startLabel);
  const startDateTime = new Date(`${date}T${start24}`);
  const now = new Date();

  // only future times on same day
  if (selected.toDateString() === now.toDateString()) {
    return startDateTime.getTime() > now.getTime();
  }

  return startDateTime.getTime() > now.getTime();
};

export default function ScheduleGmeet() {
    const [title, setTitle] = useState("Team Meeting");
const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [startDate, setDate] = useState<string>("");
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const [signedIn, setSignedIn] = useState(false);
  const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
        const { empDetail, setEmpDetail } = useAuth();
    

  const CALENDAR_ID = "prisonbirdstech@gmail.com"; // your public calendar ID
    const [attendees] = useState("prisonbirdstech@gmail.com");

const API_KEY = "AIzaSyDpw6VSlJBqfJ09wY2bvYwK4O1ufu3HmCk"; // from Google Cloud console
  const navigate = useNavigate();

    const [startTime, setStartTime] = useState(() => {
    const d = new Date();
    d.setMinutes(d.getMinutes() + 15);
    return d.toISOString().slice(0, 16);
  });
  const [endTime, setEndTime] = useState(() => {
    const d = new Date();
    d.setMinutes(d.getMinutes() + 45);
    return d.toISOString().slice(0, 16);
  });
  useEffect(() => {
                      if (empDetail.email ==="" && user!= null){
        setEmpDetail({...empDetail,
    employee_id: "",
    first_name: "",
    last_name: "",
    full_name:user.name || "",
    mobile_number: "",
    email: user.email || "",
    date_of_birth: "",
    gender: "",
    password: "",
    photo_url:user.imageUrl || "",
    confirmPassword:"",
    access_token: "",
    country_code:"",
    coins:"",
  });
    }
  }, [user, setEmpDetail, empDetail]);

  // ✅ Load Google API and initialize
  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.client
        .init({
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES,
        })
        .then(() => {
          const auth = gapi.auth2.getAuthInstance();

          // Check current sign-in state
          setSignedIn(auth.isSignedIn.get());
          if (auth.isSignedIn.get()) {
            const profile = auth.currentUser.get().getBasicProfile();
            setUser({
              id: profile.getId(),
              name: profile.getName(),
              email: profile.getEmail(),
              imageUrl: profile.getImageUrl(),
            });

          }

          // Watch for sign-in status changes
          auth.isSignedIn.listen((isSignedIn: boolean) => {
            setSignedIn(isSignedIn);
            if (isSignedIn) {
              const profile = auth.currentUser.get().getBasicProfile();
              setUser({
                id: profile.getId(),
                name: profile.getName(),
                email: profile.getEmail(),
                imageUrl: profile.getImageUrl(),
              });


            } else {
              setUser(null);
            }
          });

          setLoading(false);
        });
    });
  }, []);


  const signIn = async () => {
    const googleUser = await gapi.auth2.getAuthInstance().signIn();
    const profile = googleUser.getBasicProfile();
    setUser({
      id: profile.getId(),
      name: profile.getName(),
      email: profile.getEmail(),
      imageUrl: profile.getImageUrl(),
    });
    setSignedIn(true);
  };

  // ✅ Fetch booked events for the selected date

const fetchBookedSlots = async (date: string) => {
  if (!date) return;

  const startOfDay = new Date(`${date}T00:00:00+05:30`).toISOString();
  const endOfDay = new Date(`${date}T23:59:59+05:30`).toISOString();

  try {
    const res = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
        CALENDAR_ID
      )}/events?key=${API_KEY}&timeMin=${startOfDay}&timeMax=${endOfDay}&singleEvents=true&orderBy=startTime`
    );

    const data = await res.json();
    const booked = parseBookedSlots(data.items || []);
    setBookedSlots(booked);
  } catch (err) {
    console.error(err);
  }
};


  // ✅ When date changes → fetch booked slots
  useEffect(() => {
    if (signedIn && startDate) {
      fetchBookedSlots(startDate);
    }
  }, [startDate, signedIn]);

  // combined check → active + not booked
  const isSlotAvailable = (date: string, slot: string): boolean => {
    return isSlotActive(date, slot) && !bookedSlots.includes(slot);
  };

  const handleSlotChange = (slot: string) => {
    const available = isSlotAvailable(startDate, slot);
    if (!available) {
      toast.error("This slot is not available!");
      return;
    }
    setSelectedSlot(slot);
      updateTimesFromSlot(startDate, slot); // ✅ update times

  };


  const createMeet = async () => {
        setLoading(true);

    if (!startDate || !selectedSlot) {
      toast.warn("Please select a date and time slot before booking!");
      setLoading(false);

      return;
    }


    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const startISO = new Date(startTime).toISOString();
      const endISO = new Date(endTime).toISOString();

      if (new Date(endISO) <= new Date(startISO)) {
        toast.error("End time must be after start time!");
      setLoading(false);

        return;
      }

      const event = {
        summary: title ,
        start: { dateTime: startISO, timeZone: tz },
        end: { dateTime: endISO, timeZone: tz },
        attendees: attendees.split(",").map((email:any) => ({ email: email.trim() })),
        conferenceData: {
          createRequest: {
            requestId: String(Date.now()),
            conferenceSolutionKey: { type: "hangoutsMeet" },
          },
        },
        reminders: { useDefault: true },
      };

      const res = await gapi.client.calendar.events.insert({
        calendarId: "primary",
        resource: event,
        conferenceDataVersion: 1,
        sendUpdates: "all",
      });

      toast.success("Demo booked successfully!");
      console.log("Meet link:", res.result.hangoutLink);

      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (err) {
      console.error("Error creating meeting:", err);
      toast.error("Failed to create meeting.");
    } finally {
            setTimeout(() => {
      setLoading(false);
      }, 3000);
    }
  };
    const isButtonDisabled = !startDate || !selectedSlot || loading;
const updateTimesFromSlot = (date: string, slot: string) => {
  if (!date || !slot) return;

  const [startLabel, endLabel] = slot.split(" - ");

  // Convert to 24h format
  const start24 = convertTo24Hour(startLabel);
  const end24 = convertTo24Hour(endLabel);

  // Combine date + time
  setStartTime(`${date}T${start24}:00`); // append seconds
  setEndTime(`${date}T${end24}:00`);
};
  return (
    <div>
      <Header />
              {loading ? (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // flexDirection:"column",
          marginTop:"100px",
        }}
      >          <div className="spinner"></div>

                </div>
        ) : (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection:"column",
          marginTop:"100px",
          background:"rgb(239, 250, 239)",
        }}
      >



          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              padding: 20,
              justifyContent: "center",
              // marginTop:"80px",
            }}
          >
<h2 style={{
  marginBottom:"30px",
}}>Schedule Demo</h2>

      {!signedIn && <button onClick={signIn}>Sign in with Google</button>}

      {signedIn && (
        <>
                    <form onSubmit={createMeet}>
                   

                        <div className="input-group">
                  <label>Title: </label>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>


          <div  className="input-group">
            <label htmlFor="date-of-birth">Date</label>
            <input
                          id="date-of-birth"
style={{
  cursor:"pointer",
}}
              type="date"
              value={startDate}
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
                            required
 onClick={(e) => (e.currentTarget as HTMLInputElement).showPicker()}
            />
          </div>



                    {/* <div className="input-group">
            <label htmlFor="date-of-birth">Date of Birth</label>
            <input
              id="date-of-birth"
              type="date"
  
              required
              disabled

            />
          </div> */}

          <div  className="input-group">
            <label>Slot: </label>
            <select
              value={selectedSlot}
              onChange={(e) => handleSlotChange(e.target.value)}
              disabled={!startDate}
              style={{
  cursor:"pointer",
}}
            >
              <option value="">Select a time slot</option>
              {timeSlots.map((slot, i) => {
               const available = isSlotAvailable(startDate, slot);
                return (
                  <option
                    key={i}
                    value={slot}
                    disabled={!available}
                    style={{
                      color: available ? "green" : "red",
                      fontWeight: available ? "bold" : "normal",
                    }}
                  >
                    {available ? "🟢" : "🔴"} {slot}
                  </option>
                );
              })}
            </select>
          </div>

                {/* Book Button */}
                <div style={{ marginTop: 10 }}>
                  <button
 type="submit"                  
   disabled={isButtonDisabled}
                    style={{
                      cursor: isButtonDisabled ? "not-allowed" : "pointer",
                    }}
                  >
                    {loading ? "Booking..." : "Book Demo"}
                  </button>
                </div>
                   </form>
        </>
      )}




          </div>




                            <GoogleReviews/>

      </div>
              )}




    </div>
  );
}
