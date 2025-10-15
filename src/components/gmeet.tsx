import React, { useEffect, useState } from "react";
import { gapi } from "gapi-script";
import Header from "../components/header"
const CLIENT_ID = "252613924014-pajsq4m0ntcvr099amb4175nik39sj4h.apps.googleusercontent.com";


// const CLIENT_ID = "542517918505-svmc1d3vh5r4g636mfp7j4d401mhdj7f.apps.googleusercontent.com";
const SCOPES = "https://www.googleapis.com/auth/calendar.events";
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

declare global {
  interface Window {
    gapi: any;
  }
}

export default function ScheduleGmeet() {

  const [signedIn, setSignedIn] = useState(false);
  const [meetLink, setMeetLink] = useState<string | null>(null);
  const [title, setTitle] = useState("Team Meeting");
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
  const [attendees, setAttendees] = useState("prisonbirdstech@gmail.com");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.client.init({
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      }).then(() => {
        const auth = gapi.auth2.getAuthInstance();
        setSignedIn(auth.isSignedIn.get());
        auth.isSignedIn.listen(setSignedIn);
        // if (auth.isSignedIn.get()) {
        //   const profile = auth.currentUser.get().getBasicProfile();
        //   setAttendees(profile.getEmail());
        // }
      });
    });
  }, []);

  const signIn = () => gapi.auth2.getAuthInstance().signIn();
  const signOut = () => {
    gapi.auth2.getAuthInstance().signOut();
    setMeetLink(null);
  };

  const createMeet = async () => {
    setLoading(true);
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const startISO = new Date(startTime).toISOString(); // includes seconds & timezone
const endISO = new Date(endTime).toISOString();
if (new Date(endISO) <= new Date(startISO)) {
  console.error("End time must be after start time");
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
        reminders: {
    useDefault: true, // Google will send default email reminders
  },
    };

    try {
      const res = await gapi.client.calendar.events.insert({
        calendarId: "primary",
        resource: event,
        conferenceDataVersion: 1,
        sendUpdates: "all",
      });
      setMeetLink(res.result.hangoutLink || null);
    } catch (err) {
      console.error("Error creating meeting:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
      <div>

<Header/>

    <div style={{display:"flex",alignItems:"center", flexDirection:"column", padding: 20, marginTop:"80px",height:"70vh", justifyContent:"center" }}>

      <h2>Schedule Demo</h2>

      {!signedIn && <button onClick={signIn}>Sign in with Google</button>}

      {signedIn && (
        <div style={{
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            flexDirection:"column",
            gap:"20px",
        }}>
          <div>
            <label>Title: </label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div>
            <label>Start: </label>
            <input type="datetime-local" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
          </div>
          <div>
            <label>End: </label>
            <input type="datetime-local" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
          </div>
          <div>
            <label>Attendees: </label>
            <input value={attendees} onChange={(e) => setAttendees(e.target.value)} />
          </div>

          <div style={{ marginTop: 10 }}>
            <button onClick={createMeet} disabled={loading}>
              {loading ? "Booking..." : "book Demo"}
            </button>
            <button onClick={signOut} style={{ marginLeft: 10 }}>Sign Out</button>
          </div>
        </div>
      )}

      {meetLink && (
        <div style={{ marginTop: 20 }}>
          <strong>Google Meet Link:</strong>{" "}
          <a href={meetLink} target="_blank" rel="noreferrer">{meetLink}</a>
        </div>
      )}
    </div>
          </div>

  );
}


