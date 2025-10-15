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









import { useEffect, useState, useCallback } from "react";
import { gapi } from "gapi-script";
import Header from "../components/header";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// // const CLIENT_ID = "542517918505-svmc1d3vh5r4g636mfp7j4d401mhdj7f.apps.googleusercontent.com";

const CLIENT_ID =
  "252613924014-pajsq4m0ntcvr099amb4175nik39sj4h.apps.googleusercontent.com";
const SCOPES = "https://www.googleapis.com/auth/calendar.events";
const DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
];

export default function ScheduleGmeet() {
  const [signedIn, setSignedIn] = useState(false);
  const [startDate, setDate] = useState<string>("");
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const [title, setTitle] = useState("Team Meeting");
  const [attendees] = useState("prisonbirdstech@gmail.com");

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

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Time slots
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

  const convertTo24Hour = (time: string): string => {
    const [t, modifier] = time.split(" ");
    let [hours, minutes] = t.split(":").map(Number);
    if (modifier === "PM" && hours !== 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
  };

const updateTimeFromSlot = useCallback((date: string, slot: string) => {
  if (!date || !slot) return;

  const [startLabel, endLabel] = slot.split(" - ");
  const start24 = convertTo24Hour(startLabel);
  const end24 = convertTo24Hour(endLabel);

  setStartTime(`${date}T${start24}`);
  setEndTime(`${date}T${end24}`);
}, [setStartTime, setEndTime]);


  const handleSlotChange = (slot: string) => {
    setSelectedSlot(slot);
    updateTimeFromSlot(startDate, slot);
  };

  const signIn = () => gapi.auth2.getAuthInstance().signIn();

  const isButtonDisabled = !startDate || !selectedSlot || loading;

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
        summary: title,
        start: { dateTime: startISO, timeZone: tz },
        end: { dateTime: endISO, timeZone: tz },
        attendees: attendees.split(",").map((email) => ({ email: email.trim() })),
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
        navigate("/blog");
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

  // gapi init
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
          setSignedIn(auth.isSignedIn.get());
          auth.isSignedIn.listen(setSignedIn);
        });
    });
  }, []);

useEffect(() => {
  if (selectedSlot && startDate) {
    updateTimeFromSlot(startDate, selectedSlot);
  }
}, [startDate, selectedSlot, updateTimeFromSlot]);


  return (
    <div>
      <Header />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        {loading ? (
          <div className="spinner"></div>
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              padding: 20,
              marginTop: "80px",
              height: "70vh",
              justifyContent: "center",
            }}
          >
            <h2>Schedule Demo</h2>

            {!signedIn && (
              <button onClick={signIn}>Sign in with Google</button>
            )}

            {signedIn && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <div>
                  <label>Title: </label>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <label>Date: </label>
                  <div style={{ marginLeft: "10px" }}>
                    <input
                      style={{ cursor: "pointer" }}
                      id="date"
                      type="date"
                      value={startDate}
                      onChange={(e) => setDate(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label>Slot: </label>
                  <select
                    id="timeSlot"
                    value={selectedSlot}
                    onChange={(e) => handleSlotChange(e.target.value)}
                    style={{
                      height: "30px",
                      marginLeft: "10px",
                      cursor: "pointer",
                    }}
                  >
                    <option value="">Select a time slot</option>
                    {timeSlots.map((slot, index) => (
                      <option key={index} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Book Button */}
                <div style={{ marginTop: 10 }}>
                  <button
                    onClick={createMeet}
                    disabled={isButtonDisabled}
                    style={{
                      cursor: isButtonDisabled ? "not-allowed" : "pointer",
                    }}
                  >
                    {loading ? "Booking..." : "Book Demo"}
                  </button>
                </div>
              </div>
            )}

          </div>
        )}
      </div>
                  <ToastContainer />

    </div>
  );
}
