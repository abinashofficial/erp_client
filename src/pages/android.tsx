import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Coins from "../pages/coins"
import coinEmoji from "../assets/animations/coin.json";
import Lottie from "lottie-react";
import androidAnime from "../assets/animations/android-anime.json"
import windowsAnime from "../assets/animations/windows.json"
    import { useAuth } from "../context/authContext"
        import { toast, ToastContainer } from 'react-toastify';
        import playstationAnime from "../assets/animations/playstation.json"
                import { SiPlaystation2, SiPlaystation3  } from "react-icons/si";
                import Playstation2Icon from "../assets/animations/playstation-icon.svg"







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

const Android: React.FC = () => {
  const navigate = useNavigate();
      const { empDetail, visible, setEmpDetail} = useAuth();
          const [liveUpdate, setLiveUpdate] = useState<any | null>(null);
          
      
              const [error, setError] = useState<string >("");
      
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
  
        const AddCoins = async (add :any, msg :string) => {
    const updatedFormData = {
      ...formData,
      coins: add,
    };
  
    const apiUrl = 'https://erp-iliw.onrender.com/public/updateprofile';
  
    try {
                          setEmpDetail({...empDetail,
              employee_id: updatedFormData.employee_id,
              first_name: updatedFormData.first_name,
              last_name: updatedFormData.last_name,
              full_name:updatedFormData.full_name,
              mobile_number: updatedFormData.mobile_number,
              email: updatedFormData.email,
              date_of_birth: updatedFormData.date_of_birth,
              gender: updatedFormData.gender,
              password: "",
              photo_url:updatedFormData.photo_url,
              access_token:updatedFormData.access_token,
              country_code:updatedFormData.country_code,
              coins:updatedFormData.coins,
          })
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${empDetail.access_token}`,
        },
        body: JSON.stringify(updatedFormData),
      });
  
      const result = await response.json();
  
      if (response.ok) {
  
        console.log('Updated employee data:', updatedFormData);
        // setEmpDetail(updatedFormData);
  
  
        toast.success(msg);
        return
      } else if (response.status === 500) {
          setError('Internal server error');
        alert(result.message);
        return
      } else {
          setError('Update failed');
        console.error('Update failed:', result);
        return
      }
    } catch (error) {
      setError('Internal server error');
      alert('Internal server error');
      console.error('Error:', error);
      return
    }
  };

  const handleDownload = (url: string, free :boolean): void => {
        // const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
        // if (isMobile) {
        //     alert('Download links only work on PC or Laptop devices.');
        //     return;
        // }
        if (free){
  window.open(url, "_blank", "noopener,noreferrer");
            return;
        }

    if(empDetail.coins && empDetail.coins >= 50 && !free && error === "") {
            AddCoins(liveUpdate-50, "you have downloaded the game");

        console.log("You have enough coins to download this game.");

  window.open(url, "_blank", "noopener,noreferrer");
    }else{
        alert("You don't have enough coins to download this game. Please add coins.")
    }
};
    return (


      <div>
  <Coins/>

  <div style={{
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "20px",
    marginTop: "30px",  
  }}>

    
               <div className='platform-button'

               onClick={() => navigate("/game")}>

              

<div style={{
              display:"flex",
              justifyContent:"center",
              alignContent:"center",
              alignItems:"center",

            }}>
                            Windows
                            

            </div>

            <div>
  <Lottie style={{
    height:"45px",
    width:"45px",
    marginLeft:"10px"
}} animationData={windowsAnime} loop autoplay />
            </div>
            
              </div>



                <div style={{
                display:"flex",
                flexDirection:"row",
                background:"#f1f1f1",
                              justifyContent:"center",
                              width:"160px",
                              borderRadius:"10px",
                              cursor:"pointer",

              }}

               onClick={() => navigate("/android")}
>

<div style={{
              display:"flex",
              justifyContent:"center",
              alignContent:"center",
              alignItems:"center",

            }}>
                            Android
                            

            </div>

            <div>
  <Lottie style={{
    height:"50px",
    width:"50px",
    marginLeft:"10px"
}} animationData={androidAnime} loop autoplay />
            </div>
            
              </div>


                             <div className='platform-button'

               onClick={() => navigate("/ps2")}>

              

<div style={{
              display:"flex",
              justifyContent:"center",
              alignContent:"center",
              alignItems:"center",
            }}>
                            <SiPlaystation2 style={{
                                fontSize:"50px",
                            }}/>
                            

            </div>
            <div>
                                      <img
              src={Playstation2Icon}
              alt="ps2"
              style={{ width: "50px", height: "45px" }}
                            className="icon-bounce"
            />  
            </div>


            
              </div>




                  <div className='platform-button'

               onClick={() => navigate("/ps3")}>

              

<div style={{
              display:"flex",
              justifyContent:"center",
              alignContent:"center",
              alignItems:"center",
fontSize:"50px"
            }}>
                            <SiPlaystation3/>
                            

            </div>
                            <div>
      <Lottie style={{
        height:"45px",
        width:"45px",
        marginLeft:"10px"
    }} animationData={playstationAnime} loop autoplay />
                </div>
                
              </div>

                            </div>



<div className='main-content'>



<div style={{
        display:"flex",
        // flexDirection:"column",
        flexWrap:"wrap",
justifyContent:"space-around",
gap:"50px",
      }}>



 <div className='service_box'>
        <div style={{
        display:"flex",
        justifyContent:"center",
        borderRadius:"10px",

        }}>
        <img style={{
        borderRadius:"10px"}} src="data:image/png;base64,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" alt="" sizes='10px' />

        </div>

<div style={{
        display:"flex",
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center",
    textAlign:"center",
    // marginTop:"10px"
}}>
    <h3>GTA SA</h3>
    <div style={{
      fontSize:"50px"
    }}>
    {/* < FcAndroidOs/> */}
        <Lottie style={{
    height:"50px",
    width:"50px",
    marginLeft:"10px"
}} animationData={androidAnime} loop autoplay />

    </div>
    <p>size 3gb</p>
</div>

<button
 className='course_box'

// style={{
//     height:"50px",
// }}
 onClick={() => handleDownload("https://dl.apkvision.org/grand-theft-auto-san-andreas/GTA-SA-v2.11.277-full-mod-money-apkvision.apk", true)}

  >
    
<div className='game-button'>
    <h3>Download</h3>

<div style={{
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center",
    textAlign:"center",
    // marginTop:"10px"
}}>
   

<Lottie style={{
    height:"50px",
    width:"50px",
    marginLeft:"10px"
}} animationData={coinEmoji} loop autoplay />
Free
</div>

</div>

  </button>
 
      </div>





       <div className='service_box'>
        <div style={{
        display:"flex",
        justifyContent:"center",
        borderRadius:"10px",

        }}>
        <img style={{
        borderRadius:"10px"}} src="data:image/jpeg;base64,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" alt="" sizes='10px' />

        </div>

<div style={{
        display:"flex",
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center",
    textAlign:"center",
    // marginTop:"10px"
}}>
    <h3>NFS Most Wanted</h3>
    <div style={{
      fontSize:"50px"
    }}>
    {/* < FcAndroidOs/> */}
        <Lottie style={{
    height:"50px",
    width:"50px",
    marginLeft:"10px"
}} animationData={androidAnime} loop autoplay />

    </div>
    <p>size 1gb</p>
</div>

<button
 className='course_box'

// style={{
//     height:"50px",
// }}
 onClick={() => handleDownload("https://cdn700.onehost.io/2023/Need_For_Speed_Most_Wanted_1.3.128_1695274246_latestmodapks.com.apk", true)}

  >
    
<div className='game-button'>
    <h3>Download</h3>

<div style={{
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center",
    textAlign:"center",
    // marginTop:"10px"
}}>
   

<Lottie style={{
    height:"50px",
    width:"50px",
    marginLeft:"10px"
}} animationData={coinEmoji} loop autoplay />
Free
</div>

</div>

  </button>
 
      </div>








  <div className='service_box'>
        <div style={{
        display:"flex",
        justifyContent:"center",
        borderRadius:"10px",

        }}>
        <img style={{
        borderRadius:"10px"}} src="data:image/jpeg;base64,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" alt="" sizes='10px' />

        </div>

<div style={{
        display:"flex",
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center",
    textAlign:"center",
    // marginTop:"10px"
}}>
    <h3>Naruto ultimate ninja storm</h3>
    <div style={{
      fontSize:"50px"
    }}>
    {/* < FcAndroidOs/> */}
        <Lottie style={{
    height:"50px",
    width:"50px",
    marginLeft:"10px"
}} animationData={androidAnime} loop autoplay />

    </div>
    <p>size 4gb</p>
</div>

<button
 className='course_box'

// style={{
//     height:"50px",
// }}
 onClick={() => handleDownload("https://dl.apkvision.org/naruto-ultimate-ninja-storm/Ultimate-Ninja-STORM-v1.2.6-unlocked-apkvision.apk", true)}

  >
    
<div className='game-button'>
    <h3>Download</h3>

<div style={{
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center",
    textAlign:"center",
    // marginTop:"10px"
}}>
   

<Lottie style={{
    height:"50px",
    width:"50px",
    marginLeft:"10px"
}} animationData={coinEmoji} loop autoplay />
Free
</div>

</div>

  </button>
 
      </div>









        <div className='service_box'>
        <div style={{
        display:"flex",
        justifyContent:"center",
        borderRadius:"10px",

        }}>
        <img style={{
        borderRadius:"10px"}} src="data:image/jpeg;base64,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" alt="" sizes='10px' />

        </div>

<div style={{
        display:"flex",
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center",
    textAlign:"center",
    // marginTop:"10px"
}}>
    <h3>Leo's fortune</h3>
    <div style={{
      fontSize:"50px"
    }}>
    {/* < FcAndroidOs/> */}
        <Lottie style={{
    height:"50px",
    width:"50px",
    marginLeft:"10px"
}} animationData={androidAnime} loop autoplay />

    </div>
    <p>size 1gb</p>
</div>

<button
 className='course_box'

// style={{
//     height:"50px",
// }}
 onClick={() => handleDownload("https://dl.apkvision.org/leo039s-fortune/Leos-Fortune-v1-0-11-patched-apkvision.apk", true)}

  >
    
<div className='game-button'>
    <h3>Download</h3>

<div style={{
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center",
    textAlign:"center",
    // marginTop:"10px"
}}>
   

<Lottie style={{
    height:"50px",
    width:"50px",
    marginLeft:"10px"
}} animationData={coinEmoji} loop autoplay />
Free
</div>

</div>

  </button>
 
      </div>






       <div className='service_box'>
        <div style={{
        display:"flex",
        justifyContent:"center",
        borderRadius:"10px",

        }}>
        <img style={{
        borderRadius:"10px"}} src="data:image/jpeg;base64,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" alt="" sizes='10px' />

        </div>

<div style={{
        display:"flex",
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center",
    textAlign:"center",
    // marginTop:"10px"
}}>
    <h3>Grid Autosport</h3>
    <div style={{
      fontSize:"50px"
    }}>
    {/* < FcAndroidOs/> */}
        <Lottie style={{
    height:"50px",
    width:"50px",
    marginLeft:"10px"
}} animationData={androidAnime} loop autoplay />

    </div>
    <p>size 3gb</p>
</div>

<button
 className='course_box'

// style={{
//     height:"50px",
// }}
 onClick={() => handleDownload("https://dl.apkvision.org/grid-autosport/grid-autosport-1.10.2RC1-mod-apkvision.apk", true)}

  >
    
<div className='game-button'>
    <h3>Download</h3>

<div style={{
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center",
    textAlign:"center",
    // marginTop:"10px"
}}>
   

<Lottie style={{
    height:"50px",
    width:"50px",
    marginLeft:"10px"
}} animationData={coinEmoji} loop autoplay />
Free
</div>

</div>

  </button>
 
      </div>






             <div className='service_box'>
        <div style={{
        display:"flex",
        justifyContent:"center",
        borderRadius:"10px",

        }}>
        <img style={{
        borderRadius:"10px"}} src="data:image/png;base64,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" alt="" sizes='10px' />

        </div>

<div style={{
        display:"flex",
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center",
    textAlign:"center",
    // marginTop:"10px"
}}>
    <h3>PPSSPP Gold</h3>
    <div style={{
      fontSize:"50px"
    }}>
    {/* < FcAndroidOs/> */}
        <Lottie style={{
    height:"50px",
    width:"50px",
    marginLeft:"10px"
}} animationData={androidAnime} loop autoplay />

    </div>
    <p>size 50mb</p>
</div>

<button
 className='course_box'

// style={{
//     height:"50px",
// }}
 onClick={() => handleDownload("https://dl.apkvision.org/ppsspp-gold-psp-emulator/ppsspp-gold_1.18.1-apkvision.apk", true)}

  >
    
<div className='game-button'>
    <h3>Download</h3>

<div style={{
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center",
    textAlign:"center",
    // marginTop:"10px"
}}>
   

<Lottie style={{
    height:"50px",
    width:"50px",
    marginLeft:"10px"
}} animationData={coinEmoji} loop autoplay />
Free
</div>

</div>

  </button>
 
      </div>








                   <div className='service_box'>
        <div style={{
        display:"flex",
        justifyContent:"center",
        borderRadius:"10px",

        }}>
        <img style={{
        borderRadius:"10px"}} src="data:image/jpeg;base64,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" alt="" sizes='10px' />

        </div>

<div style={{
        display:"flex",
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center",
    textAlign:"center",
    // marginTop:"10px"
}}>
    <h3>Vector Classic</h3>
    <div style={{
      fontSize:"50px"
    }}>
    {/* < FcAndroidOs/> */}
        <Lottie style={{
    height:"50px",
    width:"50px",
    marginLeft:"10px"
}} animationData={androidAnime} loop autoplay />

    </div>
    <p>size 150mb</p>
</div>

<button
 className='course_box'

// style={{
//     height:"50px",
// }}
 onClick={() => handleDownload("https://dl.apkvision.org/vector-classic/Vector-Full-v1.4.3-full-apkvision.apk", true)}

  >
    
<div className='game-button'>
    <h3>Download</h3>

<div style={{
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center",
    textAlign:"center",
    // marginTop:"10px"
}}>
   

<Lottie style={{
    height:"50px",
    width:"50px",
    marginLeft:"10px"
}} animationData={coinEmoji} loop autoplay />
Free
</div>

</div>

  </button>
 
      </div>







      
                   <div className='service_box'>
        <div style={{
        display:"flex",
        justifyContent:"center",
        borderRadius:"10px",

        }}>
        <img style={{
        borderRadius:"10px"}} src="data:image/jpeg;base64,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" alt="" sizes='10px' />

        </div>

<div style={{
        display:"flex",
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center",
    textAlign:"center",
    // marginTop:"10px"
}}>
    <h3>Shadow Fight 2 Special Edition</h3>
    <div style={{
      fontSize:"50px"
    }}>
    {/* < FcAndroidOs/> */}
        <Lottie style={{
    height:"50px",
    width:"50px",
    marginLeft:"10px"
}} animationData={androidAnime} loop autoplay />

    </div>
    <p>size 150mb</p>
</div>

<button
 className='course_box'

// style={{
//     height:"50px",
// }}
 onClick={() => handleDownload("https://dl.apkvision.org/shadow-fight-2-se/shadow-fight-2-se-mod-v1.0.12-apkvision.org.apk", true)}

  >
    
<div className='game-button'>
    <h3>Download</h3>

<div style={{
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center",
    textAlign:"center",
    // marginTop:"10px"
}}>
   

<Lottie style={{
    height:"50px",
    width:"50px",
    marginLeft:"10px"
}} animationData={coinEmoji} loop autoplay />
Free
</div>

</div>

  </button>
 
      </div>







 <div className='service_box'>
        <div style={{
        display:"flex",
        justifyContent:"center",
        borderRadius:"10px",

        }}>
        <img style={{
        borderRadius:"10px"}} src="data:image/jpeg;base64,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" alt="" sizes='10px' />

        </div>

<div style={{
        display:"flex",
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center",
    textAlign:"center",
    // marginTop:"10px"
}}>
    <h3>Hitman Sniper</h3>
    <div style={{
      fontSize:"50px"
    }}>
    {/* < FcAndroidOs/> */}
        <Lottie style={{
    height:"50px",
    width:"50px",
    marginLeft:"10px"
}} animationData={androidAnime} loop autoplay />

    </div>
    <p>size 700mb</p>
</div>

<button
 className='course_box'

// style={{
//     height:"50px",
// }}
 onClick={() => handleDownload("https://dl.apkvision.org/hitman-sniper/hitman-sniper-mod_1.15.13-apkvision.apk", true)}

  >
    
<div className='game-button'>
    <h3>Download</h3>

<div style={{
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center",
    textAlign:"center",
    // marginTop:"10px"
}}>
   

<Lottie style={{
    height:"50px",
    width:"50px",
    marginLeft:"10px"
}} animationData={coinEmoji} loop autoplay />
Free
</div>

</div>

  </button>
 
      </div>








       <div className='service_box'>
        <div style={{
        display:"flex",
        justifyContent:"center",
        borderRadius:"10px",

        }}>
        <img style={{
        borderRadius:"10px"}} src="data:image/jpeg;base64,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" alt="" sizes='10px' />

        </div>

<div style={{
        display:"flex",
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center",
    textAlign:"center",
    // marginTop:"10px"
}}>
    <h3>Hitman Blood Money Reprisal</h3>
    <div style={{
      fontSize:"50px"
    }}>
    {/* < FcAndroidOs/> */}
        <Lottie style={{
    height:"50px",
    width:"50px",
    marginLeft:"10px"
}} animationData={androidAnime} loop autoplay />

    </div>
    <p>size 3gb</p>
</div>

<button
 className='course_box'

// style={{
//     height:"50px",
// }}
 onClick={() => handleDownload("https://dl.apkvision.org/hitman-blood-money-reprisal/hitman-bmr-v1.2RC13-apkvision.apks", true)}

  >
    
<div className='game-button'>
    <h3>Download</h3>

<div style={{
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center",
    textAlign:"center",
    // marginTop:"10px"
}}>
   

<Lottie style={{
    height:"50px",
    width:"50px",
    marginLeft:"10px"
}} animationData={coinEmoji} loop autoplay />
Free
</div>

</div>

  </button>
 
      </div>








       <div className='service_box'>
        <div style={{
        display:"flex",
        justifyContent:"center",
        borderRadius:"10px",

        }}>
        <img style={{
        borderRadius:"10px"}} src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ8NDQ0NFREWFhURFRUYHSggGBolGxUVITIhJSkrLjAuFx81ODMtNygtLisBCgoKDg0OFQ8PFSsdFR0tKysrKystKy0tKy4rKystKy0tKysrLSstLSstLS0rKy0tKy0tKystLSsrLS0tLSstLf/AABEIAKgBLAMBEQACEQEDEQH/xAAbAAEBAAMBAQEAAAAAAAAAAAABAAMEBQIGB//EAEIQAAIBAgIDCgoHCQEAAAAAAAABAgMEBRESITEGExRBUVNxgbHhByIyM1JhgpGTshU0VJKho9IWFyMkQoPB0eJD/8QAGgEBAQEBAQEBAAAAAAAAAAAAAAEDAgQFBv/EACgRAQEAAgECBAYDAQAAAAAAAAABAhEDEjEEExRhITIzQVFSFSJiQv/aAAwDAQACEQMRAD8A2T8M+YCoAIqgAAAIoAACKBhQwIAKIAACgYAUDAgACZVAAAABRADKoAigAAAAAigCu0zxsgyiAiqAAAKIDywIogAKAAogAAKACAGUAABFUAAABFAAFAFQAUQAwAAKIKAO0eRkAIqgAAAIoGAARQMKGAARQADKIAACgAgAqgCAAAoAIoAoAigAAAAAigCgo7R42SKoAgAAKIAYAUQAFAAUDYHlso8uRdA0xpVpl0DTGgaQ0DSKLSGhaQFmQRQAQAUAVABRADAAAogoZQAdo8bJFUAAABFAwACKAKABlA2BilM6kGGdY7mLrTBK4R3MF088JR10GnnhKHlrpcKQ8s0OEovQaXCUOg0lcodBp7jXObgmmaNQ4sRkTIEiIoAoAigAAAAAiqAAogO0eRmABgAEAFAwIogoAABlGKpIsg07irkbY4upGtTp1Kvk6o8cns7zW3HDu63pkeFSe2r7od5z58/VOt5+h3zz+53l9RP1XreoYLntrtf21l2kvif8p1+zJ+z759/D7zn1c/U8z2X7PP7Q/h949Z/k8z2X7PP7Q/h949Z/k8z2K3Pvn38PvHq/8nmezzVwWrFZwqRqeprQb6NeRZ4nG95o6592pTqtNxkmpJ5NPU0zS4zW46btOeZjY50ypnKEIAqKAAAAACKIDyVUBAdo8jMMAAAJlAwACKAKAAoJAa1aRpjFjl3EtKSjys9OM1Nu9OnYyWjo+jq6jz8s+O3NbBm5QEwMTxDR1R8bs6jqcW16W5b3UKmx5P0Xt7zLLjuLmzTOcCAgjkY/brRVZapRajL1xez3PtPX4bO/JWmF+zRtp5mucdVuRZlXL2QAEUAAAABRAAUFEAAdo8jMMAAigAAIoABhUAFHmZYNS4eo0xdRydL+LHr7D1/8u72b1vU0ZJ8Wx9BhlNxzXSPO4YqtxGPrfIjrHC1ZGlVrSnt2ci2G0xkdaYzpUBvW2Iyjqn4y5f6l/sxz4Zezm4unSqxms4tNfiuk89xs7uHs5Gjjf1ar0R+ZG/hvqR1h3jhWcth7M2ldGmeeuHsggAoAAAAiqAAogACKO0eNmAACKBgBRAAUABRAeJFhGnc7DXB1HJi/40fa7Gev/hp9nRo0J1HlFZ8r4kefLOY93G9Mt1KcHvelsSza1Z6jnCTL+ySfd3dw+A2mIzrUq9StCrCMZ0405QSlDPKT1p608vefQ8JwYctsyvxbceEy7vrv3aWPPXf36X6D2/x3H+a08mL92djz939+l+gfx3H+aeTHw9/gCVC+vLec5WlpeO1g5pOdSEWozq5rVoqby2cT5Dycvg7JlljdyM7h8LY4R4Wb1TnKLzi2n6iWS90dezu3OOc9ueWa2Hl5OPpvwcWMWOP+Vq9EfmR34b6sXD5o4NlxHt5GldOmeauKyEABAAAAFEAMKCiYAUAHaPGzAEUDAAIoAoYEUAAB5kWDTudjNsHcaFhTU7qEZLNePq9lm3JbOK2Llfg+ojFJZJJJcS1I+dbtk4uI+el7PYj18Xyx3j2ZsCxOdldUrmCz3t+NDPLTg1lKPu/wenh5Lx5zKO8cum7frW5TdN9J78428qMKWitOVRT0pPPxVq5F+KPteH8R52/6609WGfU2N2GKuysLitDzriqVBZ5Z16j0Ifi8+hM25cunG1crqHC8ApUcMhh0lpQ4O6NV+nKae+S6XJyYmEmHSTH4afhNejO0r1bWt5VGpOk30PLPoe3rPhc3H05WfePLlNXTIedy37LyOtmHJ3cVjxdvg1Vcqj8yO/D/AFIuPdybI9PI0rp0zzVxWQiIAAAACKAKCiAAAogO0eNmAIoAAogAKAAogADxMo07jYzbB3GnhX1un0VPlZtzfSq5fK+nPmsXExHz0vZ7Eezi+WNMezWZo6ftu4jC+CYfRhJZVKi36ry6c9eT6Fkuo/QeF4vL45Pu9eGOo+D8M+LadW3sIvVTXCK2XpyzjBdS0n7SMPGcnxmMccl+z7rcJjHDsNt6snnVhHeK/LvsNTb6VlL2j1cHJ14StMLuPgvC7g+9XdK8ivEuYb3Uy56C1Prjl91nh8dhrKZfllyzV2+KoTy1PZ2HzcoxrrWXkdbPLyd2dY8X+r1eiPzI78P9SLj3cmy2Hp5GldOmeas6yEABAAAUTChlABABQMAA7R42aKBgAEUAUARQAAAB5kdQadzsZrg7jSwyWV3Tb5J/Kzblm+KusvlfTpp7D5rBxcR89L2exHs4vljTHs39yOF8Mv6FFrOClvtXk3qGtp9LyXWezw3H5nJJ9mmGO6/cz9C9j4DGfBpG8uq91UvqinXqOeiqMWorZGK17Ekl1Hkz8JM8rlayvHu72zbl8KeCX0bJ1pVrfEKcp0pyioaN1S8qGSfHB5+yOLDyc+nfwq4zpuvy7W7jCeG4dXpxWdSEd+o8u+Q15LpWa6zTxGHXx2fdc5uPwqKPg15XXsPNrpZ5OT5nFYcZqRVCpHPW1HV7SNPDy9cq493Msj0cjuunTPPXDIcoAAAAigCgogAAZQARR2jxs0B5AiiAAoACiAGAMo8SLBqXOxmuDuNCx+sw6J/Kz0cn0q6vZ3oya2Hg1tk07ylKUnNa88s0tuw248pJp1Hb3F7pLTC9/q3FKvOpU0IRdKMJKNNZtrXJbXl7kfT8FzYcdvV3rbjykfULwrYbzN78Ol+s9/rcPdt5sK8KeHczefDpfrJ67D8U82OTum3e2d3Rp7xSuY3NCvRuLedSFOMYzjLWm1JvJxcl1mXL4vDKfCXccZcks+DsR8J9g0s6F3nlrWhSaz++d/yHH+K682Pza9jCvc1pWsJqjOrOdOMkk4RbzyeTyR8jm5Meq2fCPPlZt6rwnRjGGa1pvNcvIefG453biXbm33mp9Xaj08XzR3O7HZbC8i10qZ564ZDlABABRMKCgAgAoAACKO0eNmAAogAKAAogAAKADzIsGrcLUzXB1GjZR/mYdE/lZtn9Ou72do8bJAY61CM9q18qOsc7F2493YSpvSSzj6uI9eHLMvg0l2wRR3VZacG2kk23sS1s5t0ldW0wpvJ1dS9Fbetnlz5/1Z3L8OrTpxisopJciPNbb3cMN9R06bS2rxl/o748tVZdPnL3zcurtR7+P5o2nd5s47C5ldGBhXL2coAAogoACiAGAMoAIqgDtHjZACKAKgAAKIAACgA8sqsFZHeNWObNunOM/RefSuM9E/tjY7dqE1JKSeaazTPJZq6rMkRAQGrVsISea8Tly2PqNceWyOpk6FpQpwXiLXxt+UzDPPK93FtbBmiAgPmsaio1HTj/AFZTyXEuT3n0fD3eO62w/LxbwyGVK3YmVQkQARQBQUQABFHkCKqAAO0eNkAIoAoACiAAAoAIAZRjmjqLGnXpZmuOTqVrU6lSl5D1ccXrRpZjn3XW2V4tJf8Ajn7fcc+nn5Oh5+mZcz+Z3F9NP2Oj3X01LmPzO4emn7HR7j6alzH5ncPTT9jo9ysbktlH8zuHpsf2Oj3ZY7op8dDP+5/yc+jx/ZPL93pboZfZ/wA3/kno5+yeX7vFXG601lCEafrb031cRcfDYTvdrMI1KdJtuUm23rbettmty+0dNynAxtc2spyhIACKBhQUQAAFABFUAAHaZ42SKBhQBABRADACgAijyAMoxyiWVWCdI7mS7YpUEd9a7eODovWuxwdF6zY4Oh1m1wYdZscGQ6zZVuOs29xo5E6jbLGBzam3tI5QkABFAFBRAAAUAEVUAAAHaPIyQAFAAUQAAFABABQADAGVQ0UeXEbBol2o0BsGiNi0S7BojYtEbFkNgAgJgBRBQygAgAAZQFVAAAAAds8jIMKGAFEAABRADACgAgAqgCAAAoAIoAoAigAAAAAiqAAogAAKACKoAAIAA7Z5GYYAAFEAMAZQARQZgAABFUAAAAFEAFAFQAUAABMAKIAYUFEAFAAMogoAAACA7R5GYYAUQAAFABMoBoA0IoAoAmAMAKACKAKAIoAAAACiCgAKIAKBgQAUDGlA0ACAC6H/2Q==" alt="" sizes='10px' />

        </div>

<div style={{
        display:"flex",
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center",
    textAlign:"center",
    // marginTop:"10px"
}}>
    <h3>Zarchiever</h3>
    <div style={{
      fontSize:"50px"
    }}>
    {/* < FcAndroidOs/> */}
        <Lottie style={{
    height:"50px",
    width:"50px",
    marginLeft:"10px"
}} animationData={androidAnime} loop autoplay />

    </div>
    <p>size 10mb</p>
</div>

<button
 className='course_box'

// style={{
//     height:"50px",
// }}
 onClick={() => handleDownload("https://dl.apkvision.org/hitman-blood-money-reprisal/hitman-bmr-v1.2RC13-apkvision.apks", true)}

  >
    
<div className='game-button'>
    <h3>Download</h3>

<div style={{
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center",
    textAlign:"center",
    // marginTop:"10px"
}}>
   

<Lottie style={{
    height:"50px",
    width:"50px",
    marginLeft:"10px"
}} animationData={coinEmoji} loop autoplay />
Free
</div>

</div>

  </button>
 
      </div>








      
       <div className='service_box'>
        <div style={{
        display:"flex",
        justifyContent:"center",
        borderRadius:"10px",

        }}>
        <img style={{
        borderRadius:"10px"}} src="data:image/png;base64,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" alt="" sizes='10px' />

        </div>

<div style={{
        display:"flex",
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center",
    textAlign:"center",
    // marginTop:"10px"
}}>
    <h3>Ps2 Emulator</h3>
    <div style={{
      fontSize:"50px"
    }}>
    {/* < FcAndroidOs/> */}
        <Lottie style={{
    height:"50px",
    width:"50px",
    marginLeft:"10px"
}} animationData={androidAnime} loop autoplay />

    </div>
    <p>size 30mb</p>
</div>

<button
 className='course_box'

// style={{
//     height:"50px",
// }}
 onClick={() => handleDownload("https://get.apkfile.store/AetherSX2-v1.5-4248-Aethersx2apk.com.apk", true)}

  >
    
<div className='game-button'>
    <h3>Download</h3>

<div style={{
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center",
    textAlign:"center",
    // marginTop:"10px"
}}>
   

<Lottie style={{
    height:"50px",
    width:"50px",
    marginLeft:"10px"
}} animationData={coinEmoji} loop autoplay />
Free
</div>

</div>

  </button>
 
      </div>








      




    </div>
</div>

      </div>



    );
};

export default Android;
