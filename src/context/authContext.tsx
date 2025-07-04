import React, { createContext, useContext, useState, ReactNode,useEffect } from 'react';


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
    access_token:any;
    country_code:any,
    coins:any,
  }
  
  interface CountryOption {
    value: string;
    label: JSX.Element;
  }



interface AuthContextType {
    isAuthenticated: boolean;
    visible: boolean;
setVisible:(result: boolean) => void
    empDetail:any;
    login: (result: SignupFormData) => void;
    logout: () => void;
    setEmpDetail: (result: SignupFormData) => void;
}

interface GameSpecs {
  title:any;
  size: any;
  price: any;
  coins: any;
  download_link: any;
  image_link: any;
  platform: any;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [timeoutId, setTimeoutId] = useState<number | null>(null);
    const [visible, setVisible] = useState(true);
    const [empDetail, setEmpDetail] = useState<SignupFormData>({
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
        access_token:"",
        country_code:"",
        coins:0,
      });

      const [gameSpecs, setGameSpecs] = useState<GameSpecs[]>([
 {
    title: "SmackDown Pain",
    size: "3 GB",
    price: "Free",
    coins: 0,
    download_link: "https://dl.mprd.se/happyXXtd72mal901realEP/Playstation2/WWE%20SmackDown!%20Here%20Comes%20the%20Pain%20(USA).7z",
    image_link: "https://romsfun.com/wp-content/uploads/2019/09/2139896-box_wwesdhctp-300x381.png",
    platform: "PS2",
  },
  {
    title: "God Of War II",
    size: "7 GB",
    price: "Price",
    coins: 50,
    download_link: "https://dl.mprd.se/happyXXtd72mal901realEP/Playstation2/God%20of%20War%20II%20(USA).7z",
    image_link: "https://romsfun.com/wp-content/uploads/2019/08/God-of-War-II-ps2-300x411.jpg",
    platform: "PS2",
  },
      {
    title: "God Of War I",
    size: "7 GB",
    price: "Free",
    coins: 0,
    download_link: "https://dl.mprd.se/happyXXtd72mal901realEP/Playstation2/God%20of%20War%20(USA).7z",
    image_link: "https://romsfun.com/wp-content/uploads/2020/05/cover-God-Of-War-2-Ps2-Pal-Iso-300x416.jpeg",
    platform: "PS2",
  },
    {
    title: "MKSM",
    size: "3 GB",
    price: "Price",
    coins: 50,
    download_link: "https://dl.mprd.se/happyXXtd72mal901realEP/Playstation2/Mortal%20Kombat%20-%20Shaolin%20Monks%20(USA).7z",
    image_link: "https://romsfun.com/wp-content/uploads/2023/05/Mortal-Kombat-Shaolin-Monks-300x423.jpg",
    platform: "PS2",
  },
    {
    title: "Downhill Domination",
    size: "7 GB",
    price: "Free",
    coins: 0,
    download_link: "https://dl.mprd.se/happyXXtd72mal901realEP/Playstation2Europe/isos/Downhill%20Domination%20(Europe)%20(En,Fr,De,Es,It).7z",
    image_link: "https://romsfun.com/wp-content/uploads/2019/09/downhill-domination-box-art-300x426.jpg",
    platform: "PS2",
  },
    {
    title: "God Hand",
    size: "2 GB",
    price: "Free",
    coins: 0,
    download_link: "https://dl.mprd.se/happyXXtd72mal901realEP/Playstation2/God%20Hand%20(USA).7z",
    image_link: "https://romsfun.com/wp-content/uploads/2019/09/153422-God_Hand_Europe_EnFrDeEsIt-1482315106-300x424.jpg",
    platform: "PS2",
  },
    {
    title: "Urban Reign",
    size: "2 GB",
    price: "Free",
    coins: 0,
    download_link: "https://dl.mprd.se/happyXXtd72mal901realEP/Playstation2Europe/isos/Urban%20Reign%20(Europe)%20(En,Fr,De,Es,It).7z",
    image_link: "https://romsfun.com/wp-content/uploads/2020/05/51E7QES99ML._SY445_-300x425.jpg",
    platform: "PS2",
  },
    {
    title: "Dragon Ball Z Budokai Tenkaichi 3",
    size: "2 GB",
    price: "Free",
    coins: 0,
    download_link: "https://dl.mprd.se/happyXXtd72mal901realEP/Playstation2/DragonBall%20Z%20-%20Budokai%20Tenkaichi%203%20(USA)%20(En,Ja).7z",
    image_link: "https://romsfun.com/wp-content/uploads/2019/08/Dragon-Ball-Z-Budokai-Tenkaichi-3-300x424.jpg",
    platform: "PS2",
  },

      ]);

    const login = (result: SignupFormData) => {
        setIsAuthenticated(true);
        setEmpDetail({...empDetail,
            employee_id: result.employee_id,
            first_name: result.first_name,
            last_name: result.last_name,
            full_name:result.full_name,
            mobile_number: result.mobile_number,
            email: result.email,
            date_of_birth: result.date_of_birth,
            gender: result.gender,
            password: "",
            photo_url:result.photo_url,
            access_token:result.access_token,
            country_code:result.country_code,
            coins:result.coins,
        })

        console.log("empDetail:-", empDetail)
        const id = window.setTimeout(() => {
            logout();
            alert("Your session has expired. Please log in again.");
        }, 15 * 60 * 1000); // 15 minutes
    
        // Optional: Set an alert for 14 minutes
        const alertId = window.setTimeout(() => {
            alert("Your session will expire in 2 minute. Please save your work.");
        }, 13 * 60 * 1000); // 14 minutes
        setTimeoutId(id);
            setVisible(true);
        // Clean up the alert timeout when logging out
        return () => {
            clearTimeout(alertId);
        };
    };


    const logout = () => {
        setIsAuthenticated(false);
        if (timeoutId) {
            setTimeoutId(null);
            clearTimeout(timeoutId);
        }
        setEmpDetail({...empDetail,
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
            access_token:"",
            country_code:"",
            coins:0,
        })
        };


    useEffect(() => {
        // Clean up timeout on component unmount
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [timeoutId]);

    return (
        <AuthContext.Provider value={{ isAuthenticated, empDetail, login, logout, setEmpDetail, setVisible, visible }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
