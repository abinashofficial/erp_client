import React, { useState, useEffect } from 'react';
import Lottie from "lottie-react";
        import Coins from "./coins"
import Header from '../components/header';
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";












  interface Animations {
  [key: string]: any; // JSON object for each Lottie animation
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

const Game: React.FC = () => {
  const [gameSpecs] = useState<GameSpecs[]>([
    {
      title: "GTA V",
      size: "120 GB",
      price: "Price",
      coins: 100,
      download_link: ["https://gofile.io/d/TBwbhe", "https://datanodes.to/eeydzbjft414/Grand-Theft-Auto-V.rar", "https://1fichier.com/?vjtwz2wmuheorp0i0r54","https://1fichier.com/?3uma89t6e3ec7ac4ruo0", "https://koyso.to/download/98"],
      image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1751657170/gtav_fnwq4x.jpg",
      platform: "PC",
    },
        {
      title: "NFS Most Wanted",
      size: "7 GB",
      price: "Price",
      coins: 50,
      download_link: ["https://1fichier.com/?jqcarswzwebdl2m53vo6", "https://datanodes.to/2av7gk2bg7q3/Needfor-Speed-Most-Wanted.rar", "https://datanodes.to/gg90ums7r5cr"],
      image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1751657434/nfsmw_snouw0.jpg",
      platform: "PC",
    },
        {
      title: "God Of War",
      size: "37 GB",
      price: "Price",
      coins: 100,
      download_link: ["https://gofile.io/d/1hEOBZ","https://1fichier.com/?y5wqst42q5y2b46zt0t4", "https://datanodes.to/i5rt60chb1v3/God-of-War.rar", "https://datanodes.to/n6o7idzotbwj/God_of_War_-_SteamGG.net.zip"],
      image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1751657562/gow_lkvqp6.jpg",
      platform: "PC",
    },
        {
      title: "GTA V Enhanced",
      size: "100 GB",
      price: "Price",
      coins: 200,
      download_link: ["https://datanodes.to/v9r49fdj6d79/GTA-V-Enhanced-SteamRIP.com.rar", "https://koyso.to/download/1470"],
      image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1753906463/gtavenha_cavp1k.jpg",
      platform: "PC",
    },
    {
      title: "Far cry 3",
      size: "12 GB",
      price: "Price",
      coins: 100,
      download_link: ["https://1fichier.com/?tm29i5u619vnqsj4s2cq", "https://koyso.to/download/360"],
      image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1751657619/farcry3_hshcr5.jpg",
      platform: "PC",
    },    {
      title: "God Of War Ragnarok",
      size: "120 GB",
      price: "Price",
      coins: 200,
      download_link: ["https://gofile.io/d/4LbYNU", "https://datanodes.to/lqie5ze8yfqy/God-of-War-Ragnarok.rar", "https://datanodes.to/ai5pcyl73xt7/GOW-Ragnarok-SteamGG.NET.zip", "https://datanodes.to/mbjfdvumabls/God-of-War-R-SteamRIP.com.rar", "https://vikingfile.com/f/15UYFr8Cek", "https://koyso.to/download/1098"],
      image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1751657691/gowra_abt9a5.jpg",
      platform: "PC",
    },   
              {
      title: "COD Black Ops",
      size: "12 GB",
      price: "Price",
      coins: 100,
      download_link: ["https://gofile.io/d/iOh9Ve", "https://1fichier.com/?a92d4nyg5ee2myeslux2", "https://datanodes.to/qecdvd0thsur/Call.of.Duty.Black.Ops.rar", "https://akirabox.com/9QWmp6OrzEB6/file"],
      image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1754137340/blackops_jcai0r.jpg",
      platform: "PC",
    }, 
      {
      title: "COD Black Ops 2",
      size: "21 GB",
      price: "Price",
      coins: 100,
      download_link: ["https://gofile.io/d/mlXKJs", "https://1fichier.com/?r7zq0shu9f301ylvj50w", "https://datanodes.to/7nhc4bicdq8t/Call-of-Duty-Black-Ops-2.rar", "https://akirabox.com/Y2xm0LV9mRO1/file", "https://koyso.to/download/1334"],
      image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1751657781/codbo2_u6u97a.jpg",
      platform: "PC",
    },   
                  {
      title: "COD Black Ops 3",
      size: "130 GB",
      price: "Price",
      coins: 200,
      download_link: ["https://gofile.io/d/VeXgaB", "https://1fichier.com/?prosbg2gmsu74xmjt1vi", "https://datanodes.to/svg421rgixnw/C0D-Black-O3-SteamRIP.com.rar", "https://datanodes.to/e2ibufmhwrfx/COD_.Blackops3.STeamGG.NET.rar", "https://koyso.to/download/364"],
      image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1754137562/blackops3_licvre.jpg",
      platform: "PC",
    }, 
            {
      title: "COD Black Ops 6",
      size: "60 GB",
      price: "Price",
      coins: 100,
      download_link: ["https://gofile.io/d/W6wY7g", "https://datanodes.to/14msmciddx7f", "https://datavaults.co/lzvhiz1p74mu/Black_Ops_6-SteamGG.NET.zip", "https://datanodes.to/azwb29a4tzln"],
      image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1756366043/bo6_xkdjl3.jpg",
      platform: "PC",
    }, 
                {
      title: "COD Black Ops Cold War",
      size: "230 GB",
      price: "Price",
      coins: 250,
      download_link: ["https://gofile.io/d/9w80c0", "https://datanodes.to/dkegjna244tc/COD_-_BO_CW_-SteamGG.NET.rar", "https://koyso.to/download/588"],
      image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1756366801/cw_vkxi8l.jpg",
      platform: "PC",
    },

        {
      title: "GTA V Compressed",
      size: "40 GB",
      price: "Price",
      coins: 200,
      download_link: ["https://gofile.io/d/grbQk2"],
      image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1751657170/gtav_fnwq4x.jpg",
      platform: "PC",
    },

                    {
      title: "COD Vanguard",
      size: "80 GB",
      price: "Price",
      coins: 200,
      download_link: ["https://datanodes.to/7utniuf37q4w/COD-Vanguard-SteamRIP.com.rar", "https://datanodes.to/v922fps60ee5/Call-of-Duty-Vanguard-Campaign.rar"],
      image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1756366140/covangaurd_q6yllr.jpg",
      platform: "PC",
    },
      {
      title: "It Takes Two",
      size: "44 GB",
      price: "Price",
      coins: 100,
      download_link: ["https://gofile.io/d/Z3cOsC", "https://1fichier.com/?w03is6ep4f523aoxbj62", "https://datanodes.to/hau5y4vuizjd/It-Takes-Two.rar", "https://pixeldrain.com/u/nWdGuKXH", "https://akirabox.com/Y2xm0qw03RO1/file", "https://koyso.to/download/16"],
      image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1751657846/ittakes2_ppaguj.jpg",
      platform: "PC",
    },    {
      title: "Spiderman Miles Morales",
      size: "50 GB",
      price: "Price",
      coins: 100,
      download_link: ["https://gofile.io/d/CON0uI", "https://1fichier.com/?8odokoodkd929sgashby", "https://datanodes.to/fyejwaattoiw/Marvel-Spider-Man-Miles-Morales.rar", "https://datanodes.to/zsctl1wp8wqv/Man_Miles_Morales.SteamGG.net.rar", "https://koyso.to/download/361"],
      image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1751657912/spidymiles_utbhh8.jpg",
      platform: "PC",
    },    {
      title: "Ghost Of Tshushima",
      size: "60 GB",
      price: "Price",
      coins: 100,
      download_link: ["https://gofile.io/d/xC2eSo", "https://download.akirabox.com/uploads/users/v1RgzRVvzbpB/co3OBJoppmJMF0Iybde-Ghost%20of%20Tsushima%20-SteamGG.NET.zip?access=ANhhDZysWdyNTYzRWMzdWMkFHdhpXYl5GOhBXb", "https://datanodes.to/f0i13knvsycp/Ghost-of-Tsushima-Directors-Cut.rar", "https://datanodes.to/v962lxkgz04g/Ghost_of_Tsushima_-SteamGG.NET.zip", "https://koyso.to/download/842"],
      image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1751657977/ghostoftshushima_z1nfqv.jpg",
      platform: "PC",
    },    {
      title: "Spiderman 2",
      size: "120 GB",
      price: "Price",
      coins: 200,
      download_link: ["https://gofile.io/d/aL31Y8", "https://store3.gofile.io/download/web/efa3741f-19d1-4b3f-bddd-08f3aab045a9/Marvels-Spider-Man-2-SteamRIP.com.rar", "https://datanodes.to/tnapz0kt5cvd/Marvels-Spider-Man-2.rar", "https://datanodes.to/4onl2bvlhiau/Marvels_Spider-Man_2.SteamGG.NET.zip", "https://vikingfile.com/f/ZqTMFzMUG3", "https://datavaults.co/6iubw7391nfv/Marvels_Spider-Man_2.SteamGG.NET.zip", "https://datanodes.to/90zsm0hrjklm/Marvels-Spider-Man-2-SteamRIP.com.rar", "https://koyso.to/download/1403"],
      image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1751658033/spidy2_llaayr.jpg",
      platform: "PC",
    },  
    {
      title: "Spiderman Remastered",
      size: "60 GB",
      price: "Price",
      coins: 100,
      download_link: ["https://gofile.io/d/78ooEM", "https://datanodes.to/zhl6v62x1y31/Marvels-Spider-Man-Remastered.rar", "https://koyso.to/download/36"],
      image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1753907509/spidermanrema_anj7pd.jpg",
      platform: "PC",
    },
      {
      title: "Red Dead Redemption 2",
      size: "115 GB",
      price: "Price",
      coins: 200,
      download_link: ["https://gofile.io/d/OYh1ER", "https://gofile.io/d/o4iRPC", "https://1fichier.com/?ljo5eq6zgvs8p4wgbtk2", "https://datanodes.to/m0u2kouj1vt2/Red-Dead-Redemption-2.rar", "https://1fichier.com/?qn08gnhmpnqt9r7ylg81&af=62851", "https://datanodes.to/kyhjjoqklw31/Red_Dead_Redemption_2_%E2%80%93_BUILD_1491.50_+_UE_UNLOCKER_-_SteamGG.net.zip", "https://koyso.to/download/11"],
      image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1751658099/rdr2_rgmqmn.jpg",
      platform: "PC",
    },    {
      title: "Elden Ring",    
      size: "75 GB",
      price: "Price",
      coins: 200,
      download_link:["https://gofile.io/d/5kGJN3", "https://gofile.io/d/vCgwhJ", "https://datanodes.to/ybq15k840ory/ELDEN-RING.rar", "https://datanodes.to/0x9y8g6ze0tt/Elden_Ring-SteamGG.NET.zip", "https://datanodes.to/i3u3v9agqla1", "https://koyso.to/download/12"],
      image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1751657256/eldenring_z6exsg.jpg",
      platform: "PC",
    },  
    {
      title: "Elden Ring Nightreign",
      size: "22 GB",
      price: "Price",
      coins: 100,
      download_link: ["https://gofile.io/d/gs0qzV", "https://gofile.io/d/wYvwdO", "https://datanodes.to/m76em61b7yr2", "https://akirabox.com/wgWGqqWxwG4o/file", "https://koyso.to/download/1756"],
      image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1753907019/eldenringnight_m0eq5y.jpg",
      platform: "PC",
    },
    {
      title: "Dragon Ball Sparking Zero",
      size: "30 GB",
      price: "Price",
      coins: 100,
      download_link: ["https://gofile.io/d/HDR1Aj", "https://gofile.io/d/ADfTAO", "https://datanodes.to/gfqv0chfwj8l", "https://akirabox.com/QN9mEYy0Rm6d/file", "https://datanodes.to/4gp6w2ycz207" ],
      image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1753907963/dbzsz_oudmkd.jpg",
      platform: "PC",
    },
                   {
      title: "COD 4",
      size: "6 GB",
      price: "Price",
      coins: 50,
      download_link: ["https://1fichier.com/?psvzyyub7af450ec5y02"],
      image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1752129427/cod4_dpninl.jpg",
      platform: "PC",
    },
        {
      title: "COD MW 2",
      size: "14  GB",
      price: "Price",
      coins: 100,
      download_link: ["https://1fichier.com/?lwjwzfcwoazn9l9rpp3k", "https://datanodes.to/glwszltyj4w9/Call-of-Duty-Modern-Warfare-2.rar"],
      image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1754138868/mw2_itepsa.jpg",
      platform: "PC",
    },
            {
      title: "COD MW 3",
      size: "20  GB",
      price: "Price",
      coins: 100,
      download_link: ["https://gofile.io/d/4bNHGk", "https://1fichier.com/?3lkvjnpga0rd7nw1ux6o", "https://datanodes.to/lrg7891xa6l6/Call_of_Duty-Modern-Warfare-3.rar", "https://datanodes.to/mnxia946nrfj/Call_of_Duty_-_Modern_Warfare_3_-_SteamGG.net.zip", "https://koyso.to/download/1022"],
      image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1754138518/mwIII_naqsla.jpg",
      platform: "PC",
    },
            {
      title: "COD MW 2 Remastered",
      size: "35  GB",
      price: "Price",
      coins: 100,
      download_link: ["https://gofile.io/d/T6753p"],
      image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1753908146/codmw2re_ozyxfi.jpg",
      platform: "PC",
    },
                {
      title: "COD Modern Warfare",
      size: "190  GB",
      price: "Price",
      coins: 200,
      download_link: ["https://gofile.io/d/KuPsVO", "https://datanodes.to/xacbmqbnl5nq/Call-of-Duty-Modern-Warfare_-2019.rar"],
      image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1756365229/mw_qitbfb.jpg",
      platform: "PC",
    },
                    {
      title: "COD Modern Warfare III",
      size: "160  GB",
      price: "Price",
      coins: 200,
      download_link: ["https://datanodes.to/sk03sxv58jcn"],
      image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1756365262/mw3_iwfubw.jpg",
      platform: "PC",
    },
                {
      title: "Assassin's Creed IV",
      size: "14  GB",
      price: "Price",
      coins: 100,
      download_link: ["https://gofile.io/d/Bh42OA", "https://akirabox.com/Pbe3P1kLzlX6/file", "https://1fichier.com/?z9sp78vcxpgbbheeoztj", "https://datanodes.to/gwdv9vfov0hy/Assassins-Creed-IV-Black-Flag.rar", "https://koyso.to/download/329"],
      image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1754137984/blackflag_gnpypm.jpg",
      platform: "PC",
    },
        {
      title: "Resident Evil 4 Remastered",
      size: "65 GB",
      price: "Price",
      coins: 200,
      download_link: ["https://gofile.io/d/vLe5ze", "https://datanodes.to/uhfve7u3lq1w/Resident-Evil-4-Remake.rar", "https://datanodes.to/tal2do3yfccd", "https://akirabox.com/qw1zep0yj3Xy/file", "https://koyso.to/download/214", "https://1fichier.com/?9b6ap2qzktrpfk6vmi72"],
      image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1753908278/residentevl4_jpvmrs.jpg",
      platform: "PC",
    },
      {
      title: "Ratchet and Clank",
      size: "50 GB",
      price: "Price",
      coins: 100,
      download_link: ["https://gofile.io/d/xA4LuX", "https://1fichier.com/?0n1yh4d676g5juf8unqn", "https://datanodes.to/fiv08hnvycq8/Ratchet-Clank-Rift-Apart.rar", "https://akirabox.com/l76mZgRj3anY/file", "https://pixeldrain.com/u/42o9A7Nv", "https://koyso.to/download/469"],
      image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1751658159/ratchet_g0bumh.jpg",
      platform: "PC",
    },    {
      title: "Batman Arkham Knight",
      size: "55 GB",
      price: "Price",
      coins: 100,
      download_link: ["https://gofile.io/d/u3DJUW", "https://1fichier.com/?dpvhcbffsi1x0j92v8gj", "https://datanodes.to/5zoxo8wy096f/Batman-Arkham-Knight.rar", "https://datanodes.to/sk95847jlytm/Batman_Arkham_Knight.SteamGG.net.rar", "https://akirabox.com/RMKGJ56wz1oP/file", "https://koyso.to/download/349"],
      image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1751658260/batmanak_ql2j0e.jpg",
      platform: "PC",
    },    {
      title: "Days Gone",
      size: "50 GB",
      price: "Price",
      coins: 100,
      download_link: ["https://gofile.io/d/FdT2mL", "https://gofile.io/d/37brJ0", "https://1fichier.com/?0iy561ulmhs2a1dd9c2e", "https://datanodes.to/zqkxgmvs683v/Days-Gone.rar", "https://akirabox.com/rk9zKrZLR30l/file", "https://vikingfile.com/f/3mQIK3T0Qg#Days%20Gone-SteamGG.NET.zip","https://datanodes.to/et5gog1a852i", "https://koyso.to/download/300"],
      image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1754140916/daysgone_eqjkez.jpg",
      platform: "PC",
    },    {
      title: "A Way Out",
      size: "25 GB",
      price: "Price",
      coins: 100,
      download_link: ["https://gofile.io/d/FdT2mL", "https://1fichier.com/?e5ftvgs1bhjgkgz9n0vq", "https://datanodes.to/ubf366tfpvxv/A-Way-Out.rar", "https://datanodes.to/c2a6ofcb9zhi/A-Way-Out-SteamRIP.com.rar", "https://datanodes.to/zcmnn5jsqpum/A_Way_Out-SteamGG.NET.zip", "https://akirabox.com/M2BGwkLjpGj4/file", "https://vikingfile.com/f/pwj0pWfX7M", "https://pixeldrain.com/u/s6oDSGUV", "https://koyso.to/download/241"],
      image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1751658413/wayout_ce1dfq.jpg",
      platform: "PC",
    },    {
      title: "Detroit",
      size: "60 GB",
      price: "Price",
      coins: 100,
      download_link: ["https://gofile.io/d/6Ix9sO", "https://1fichier.com/?edn0b6iwl70ej7uh04ly","https://datanodes.to/4oarkswez8ha/Detroit-Become-Human.rar", "https://akirabox.com/0JgG7jrk1zoY/file", "https://vikingfile.com/f/A8AQLW9XhQ", "https://pixeldrain.com/u/F9wCdfh4", "https://koyso.to/download/13"],
      image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1751658493/detroit_sqenxc.jpg",
      platform: "PC",
    },    {
      title: "The Witcher 3",
      size: "55 GB",
      price: "Price",
      coins: 100,
      download_link: ["https://gofile.io/d/qqi3VL", "https://1fichier.com/?axbt4kd0kcfu2wxx2v3s", "https://datanodes.to/zjl0ykorgxcu/The-Witcher-3-Wild-Hunt.zip", "https://akirabox.com/9AqGQBKJmMn6/file", "https://vikingfile.com/f/PxP9ky2wLT", "https://koyso.to/download/101"],
      image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1754140907/witcher_3_jjhnvh.jpg",
      platform: "PC",
    },    {
      title: "Stray",
      size: "7 GB",
      price: "Price",
      coins: 50,
      download_link: ["https://1fichier.com/?rr3mhrab8of90kw3qoh4", "https://datanodes.to/qbldrjll4oiu/Stray.rar", "https://datanodes.to/dl17ckitosc5/Stray_-_SteamGG.net.zip", "https://pixeldrain.com/u/96oKzffH", "https://akirabox.com/Y2xm0ep93RO1/file", "https://koyso.to/download/235"],
      image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1751658662/stray_ajzpu3.jpg",
      platform: "PC",
    },    {
      title: "Sekiro",
      size: "16 GB",
      price: "Price",
      coins: 100,
      download_link: ["https://gofile.io/d/jROpqs","https://gofile.io/d/S6Y5pZ","https://datanodes.to/48q16il1k6g9/Sekiro_Shadows_Die_Twice-SteamGG.net.rar", "https://1fichier.com/?0jagji1icdd009wn9h39", "https://datanodes.to/rnt6cz95np6u/Sekiro-Shadows-Die-Twice-GOTY-Edition.rar", "https://koyso.to/download/15"],
      image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1751658654/sekiro_h1otuk.jpg",
      platform: "PC",
    }, 
       {
      title: "Cyberpunk 2077",
      size: "100 GB",
      price: "Price",
      coins: 200,
      download_link: ["https://gofile.io/d/PgSVdw","https://datanodes.to/r8jyycizai2i/Cyberpunk-2077.zip", "https://datanodes.to/nl80fkepq6u8", "https://akirabox.com/qw1zeJV8eGXy/file", "https://vikingfile.com/f/y9D8HSPRT4#Cyberpunk%202077-SteamGG.NET.zip%20-%2082.62%20GB", "https://datanodes.to/98pb9hb7g2y5", "https://gofile.io/d/5Pfu7Y", "https://koyso.to/download/20"],
      image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1754141159/download_tzb1ma.jpg",
      platform: "PC",
    },

           {
      title: "Split Fiction",
      size: "80 GB",
      price: "Price",
      coins: 200,
      download_link: ["https://gofile.io/d/cwhxvp", "https://node14.datanodes.to:8443/d/tkmkcpnbkae5w4x3x7zgkiwq6otqyzulemm2db5vtgrvmfund7qz55jhznasztzzh4yffwsx/Split-Fiction.rar", "https://datanodes.to/r4u024l7bi59/Split-Fiction.rar", "https://datanodes.to/sz7nicd0pzqv/Split-Fiction-SteamRIP.com.rar", "https://koyso.to/download/1474"],
      image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1752129080/split_fiction_u8qo8c.jpg",
      platform: "PC",
    },

               {
      title: "Forza Horizon Motorsport 7",
      size: "103 GB",
      price: "Price",
      coins: 200,
      download_link: ["https://1fichier.com/?zgpm6k2ky5wh2vlkjpvq", "https://datanodes.to/n6an3o4r2uti/Forza_Motorsport-SteamGG.NET.zip", "https://datavaults.co/g51way76rkjy/Forza_Motorsport-SteamGG.NET.zip", "https://akirabox.com/EL73gRr08m9B/file","https://vikingfile.com/f/Qk5TdeHLqD#Forza%20Motorsport-SteamGG.NET.zip"],
      image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1752129327/forza_motorsport_7_ureejg.jpg",
      platform: "PC",
    },
                   {
      title: "Mortal Kombat 11",  
      size: "140 GB",
      price: "Price",
      coins: 200,
      download_link: ["https://datavaults.co/2eljqhdi0r5m/Mortal_Kombat_11_%5BCONOR%5D.rar", "https://datanodes.to/ketkzqzcm7z7/Mortal-Kombat-11.rar", "https://akirabox.com/jJD3VPoLGa5Q/file", "https://koyso.to/download/198"],
      image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1752129767/mortalkobat11_iupbby.jpg",
      platform: "PC",
    },

                       {
      title: "WWE 2K25",
      size: "100 GB",
      price: "Price",
      coins: 200,
      download_link: ["https://gofile.io/d/2WIxh0", "https://gofile.io/d/sYe9XG", "https://1fichier.com/?su6nq5uwa0ubqpx0sx6s", "https://datanodes.to/skwus4tuu33r/WWE-2K25.rar", "https://datanodes.to/p37x42ani663","https://akirabox.com/qLQ361xREm19/file", "https://vikingfile.com/f/rm6Fv15H9r#WWE%202K25-SteamGG.NET.zip%20-%20100.80%20GB", "https://koyso.to/download/1476"],
      image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1752132027/wwe2k25_xa2hmq.jpg",
      platform: "PC",
    },

                   {
      title: "FIFA 23",
      size: "50 GB",
      price: "Price",
      coins: 100,
      download_link: [ "https://datanodes.to/cy4ebbl24qs8/FIFA-23-Ultimate-Edition.rar", "https://pixeldrain.com/u/M2dTo9JA", "https://1fichier.com/?oyn9nhvatfu1vi8abpws"],
      image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1752131096/fifa_23_f8kj6t.jpg",
      platform: "PC",
    },{
      title: "The Last Of Us Part 1 ",
      size: "85 GB",
      price: "Price",
      coins: 100,
      download_link: ["https://gofile.io/d/ydrhpd", "https://1fichier.com/?5a5j40fo4h3rgdhyxot6", "https://datanodes.to/l91tbfggg2i0", "https://datanodes.to/tpf62lz9iync", "https://akirabox.com/dZxG511WBGVj/file", "https://vikingfile.com/f/13W8KKLwcB#The%20Last%20of%20Us%20-%20SteamGG.NET.zip", "https://koyso.to/download/164"],
      image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1753631289/lastofus_cz3pvb.jpg",
      platform: "PC",
    }, 
    {
      title: "The Last Of Us Part 2 ",
      size: "110 GB",
      price: "Price",
      coins: 200,
      download_link: ["https://gofile.io/d/gotpPY", "https://datanodes.to/9dsn2dxpcc7z/The_Last_Of_Us_Part_II-SteamGG.NET.zip", "https://akirabox.com/BnkmWqrMYzR0/file", "https://datanodes.to/tufbmy2isa3i/The-Last-of-Us-P2R-SteamRIP.com.rar", "https://koyso.to/download/1542"],
      image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1756364000/last2_acufzd.jpg",
      platform: "PC",
    }, 
                   {
      title: "Forza Horizon 5",
      size: "200 GB",
      price: "Price",
      coins: 200,
      download_link: ["https://gofile.io/d/rdW8od", "https://gofile.io/d/k7FQEE", "https://gofile.io/d/CR87ei", "https://1fichier.com/?u9jh184sm0owh7zvhika", "https://datanodes.to/qpu91wwntngy/Forza-Horizon-5.rar", "https://datanodes.to/v9twbkg2uz6z/FH5-SteamGG.NET.zip", "https://akirabox.com/APVma1v0mXo8/file"],
      image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1753631485/forza5_ctebxw.jpg",
      platform: "PC",
    },

                       {
      title: "GTA IV",
      size: "22 GB",
      price: "Price",
      coins: 100, 
      download_link: ["https://gofile.io/d/28H7Ic", "https://datanodes.to/cihu6blj23bd/GTA-IV.rar"],
      image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1753903846/gta_4_olzsv3.jpg",
      platform: "PC",
    },

                           {
      title: "GTA The Trilogy",
      size: "34 GB",
      price: "Price",
      coins: 100, 
      download_link: ["https://gofile.io/d/e68EJi", "https://datanodes.to/99h50ihih95n/Grand-Theft-Auto-The-Trilogy-The-Definitive-Edition.rar"],
      image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1753904097/gtatrilogy_iopakk.jpg",
      platform: "PC",
    },
            {
      title: "COD Ghosts",
      size: "32 GB",
      price: "Price",
      coins: 100,
      download_link: ["https://gofile.io/d/ZCqsWR", "https://datanodes.to/qdv26cujzrc5/Call-of-Duty-Ghosts-.rar", "https://akirabox.com/E1x3A8Jdmyk6/file", "https://koyso.to/download/1597"],
      image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1756367761/ghosts_yjmgyc.jpg",
      platform: "PC",
    },
                {
      title: "COD wwII",
      size: "160 GB",
      price: "Price",
      coins: 200,
      download_link: ["https://1fichier.com/?dtlld170rlipprct272x", "https://datanodes.to/x471ek60oi7b/Call-of-Duty-WWII-Multiplayer-_-Zombies-_-Bots.rar"],
      image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1756367869/wwii_xhw2tn.jpg",
      platform: "PC",
    },

                               {
      title: "Red Dead Redemption",
      size: "10 GB",
      price: "Price",
      coins: 100, 
      download_link: ["https://gofile.io/d/TTVnFR", "https://datanodes.to/1lpw0ts8uk3x/RDR1-SteamRIP.com.rar", "https://datanodes.to/sx34am1su535/Red-Dead-Redemption-PC.rar", "https://1fichier.com/?7s64zpcjddwf8u3he34d", "https://datanodes.to/ybkwqgrdlde6/RDR-SteamGG.NET.zip", "https://akirabox.com/5pVzNvJbz7wv/file", "https://koyso.to/download/1172"],
      image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1753905989/readdead_ulja0s.jpg",
      platform: "PC",
    },
                                   {
      title: "Tomb Raider",
      size: "30 GB",
      price: "Price",
      coins: 100, 
      download_link: ["https://gofile.io/d/Wx3vLq", "https://datanodes.to/zos9v2m5q74a/Rise-of-the-Tomb-Raider-SteamRIP.com.rar", "https://koyso.to/download/354"],
      image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1763201686/tombraider_nbbvwi.jpg",
      platform: "PC",
    },
                                       {
      title: "Assassin's Creed IV",
      size: "15 GB",
      price: "Price",
      coins: 100, 
      download_link: ["https://gofile.io/d/Bh42OA", "https://akirabox.com/Pbe3P1kLzlX6/file"],
      image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1763201979/assassincreed4_wxvgp1.jpg",
      platform: "PC",
    },
                                           {
      title: "Asseto Corsa Competizone",
      size: "50 GB",
      price: "Price",
      coins: 100, 
      download_link: ["https://gofile.io/d/oiocNk", "https://datanodes.to/wudl5kf29kz7/Assetto-Corsa-Competizione.rar","https://1fichier.com/?bplqrpd5r94lo8isyaij"],
      image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1763202243/assetocompet_nd2yeb.jpg",
      platform: "PC",
    },
                                               {
      title: "Asseto Corsa EVO",
      size: "50 GB",
      price: "Price",
      coins: 100, 
      download_link: ["https://gofile.io/d/HMMTus", "https://datanodes.to/c8kwe8qz1d6d/Assetto-Corsa-EVO.rar", "https://datanodes.to/mu98eb0rmqqa/Assetto-Corsa-EVO-SteamRIP.com.rar"],
      image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1763202350/assetoevo_njmpor.jpg",
      platform: "PC",
    },
      {
      title: "MotoGP 25",
      size: "50 GB",
      price: "Price",
      coins: 100, 
      download_link: ["https://gofile.io/d/QvTMuH","https://datanodes.to/8q4uxygqss07/MotoGP_25.SteamGG.NET.rar","https://koyso.to/download/1621"],
      image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1763202564/motogp_ewvibv.jpg",
      platform: "PC",
    },
    {
      title: "Ride 5",
      size: "50 GB",
      price: "Price",
      coins: 100, 
      download_link: ["https://datanodes.to/ca0q77rr51ma/RIDE-5.rar", "https://1fichier.com/?2c131p5aq5s9huth1x3n","https://1fichier.com/?vutpayild8i3z06spfso","https://oceanofgames.com/ride-5-rune-free-download/"],
      image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1763202887/ride_dznokv.jpg",
      platform: "PC",
    },
        {
      title: "NFS Heat",
      size: "40 GB",
      price: "Price",
      coins: 100, 
      download_link: ["https://gofile.io/d/LtkE39", "https://gofile.io/d/rhcpTA", "https://datanodes.to/anfhcmt6gdi0/Need-for-Speed-Heat.rar","https://datanodes.to/bhkt5pgv15us", "https://1fichier.com/?qclnfjw0oxe3knte8jwb", "https://koyso.to/download/302"],
      image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1763203008/nfsheat_cdd7iu.jpg",
      platform: "PC",
    },
            {
      title: "Dragon Ball SparkingZero",
      size: "40 GB",
      price: "Price",
      coins: 100, 
      download_link: ["https://gofile.io/d/HDR1Aj","https://datanodes.to/4gp6w2ycz207", "https://datanodes.to/gfqv0chfwj8l","https://koyso.to/download/1133"],
      image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1763203274/sparkingzero_ls6ech.jpg",
      platform: "PC",
    },
                {
      title: "Battlefield 3",
      size: "30 GB",
      price: "Price",
      coins: 100, 
      download_link: ["https://gofile.io/d/jG8KBL", "https://datanodes.to/d9wjtlmz94b0/Just-Cause-3.rar"],
      image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1763203612/battlefield3_jxzc1t.jpg",
      platform: "PC",
    },

                  {
      title: "Battlefield 4",
      size: "60 GB",
      price: "Price",
      coins: 150, 
      download_link: ["https://gofile.io/d/ZC91ks", "https://datanodes.to/ah2d14wsvihz/Battlefield_4.SteamGG.NET.rar"],
      image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1763203720/battlefield4_siymgk.jpg",
      platform: "PC",
    },
                      {
      title: "Crysis",
      size: "20 GB",
      price: "Price",
      coins: 100, 
      download_link: ["https://pixeldrain.com/u/3op6CVaR", "https://koyso.to/download/2088"],
      image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1763204649/crysis1_mxvkbt.jpg",
      platform: "PC",
    },
                          {
      title: "Crysis 2",
      size: "20 GB",
      price: "Price",
      coins: 100, 
      download_link: ["https://gofile.io/d/AAiu4r", "https://pixeldrain.com/u/39WoruDi", "https://koyso.to/download/2089"],
      image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1763204714/crysis2_je7oz9.jpg",
      platform: "PC",
    },
                              {
      title: "Crysis 3",
      size: "30 GB",
      price: "Price",
      coins: 100, 
      download_link: ["https://pixeldrain.com/u/ZMJ9gLpX", "https://datanodes.to/6ggudz6kprmp", "https://akirabox.com/N2p3DZNZpGMa/file", "https://vikingfile.com/f/SoFes7VI1L#Crysis%203%20Remastered-SteamGG.NET.zip%20-%2016.68%20GB", "https://pixeldrain.com/u/p48uSWUr", "https://koyso.to/download/1710"],
      image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1763204811/crysis3_fqbbq6.jpg",
      platform: "PC",
    },

           {
      title: "X-Men",
      size: "3 GB",
      price: "Price",
      coins: 50,
      download_link: ["https://www.mediafire.com/file/16zcgvx6q4av839/X-Men.zip/file", "https://datanodes.to/v0ncr8vrvxuv/X-Men-Origins-Wolverine-.rar"],
      image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1751686298/xmenwolv_l9kojj.jpg",
      platform: "PC",
    },
               {
      title: "NFS Classic",
      size: "600 MB",
      price: "Price",
      coins: 50,
      download_link: ["https://www.mediafire.com/file/qqx37fcjrwvtjqz/NFS_Most_Wanted_2005.zip/file", "https://datanodes.to/vs4n3199ys9u/NFS-Most-Wanted-2005.rar"],
       image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1751685683/nfs2005_td3vtq.jpg",
      platform: "PC",
    },
                   {
      title: "MotoGP 3",
      size: "200 MB",
      price: "Price",
      coins: 50,
      download_link: ["https://www.mediafire.com/file/pawk6g3nx6zc6ol/motogp_urt_3_demo.zip/file"],
       image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1751686623/motogp3_buzlxt.jpg",
      platform: "PC",
    },               {
      title: "Retro Games",
      size: "100 MB",
      price: "Price",
      coins: 50,
      download_link: ["https://www.mediafire.com/file/su0n3hnmt0uac8o/Mesen_%2528Windows_-_net8.0_-_AoT%2529.zip/file"],
        image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1751686815/retro_ssxnka.jpg",
      platform: "PC",
    },               {
      title: "GTA SA",
      size: "600 MB",
      price: "Price",
      coins: 50,
      download_link: ["https://www.mediafire.com/file/q6lltylvlig7m9u/GTA_SA_setup.zip/file"],
        image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1751669834/gtasa_z7hdgt.png",
      platform: "PC",
    },               {
      title: "GTA VC",
      size: "1.5 GB",
      price: "Price",
      coins: 50,
      download_link: ["https://www.mediafire.com/file/rntigjvd2u67lm3/GTA_VC.zip/file"],
        image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1751839528/gta_vc_p3mhje.jpg",
      platform: "PC",
    },
    {
      title: "GTA 3",
      size: "200 MB",
      price: "Price",
      coins: 50,
      download_link: ["https://www.mediafire.com/file/g7ucp1wm15oax2o/GTA3_Setup.zip/file"],
        image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1751688127/gta3_hltstf.jpg",
      platform: "PC",
    },
        {
      title: "Prototype",
      size: "8 GB",
      price: "Price",
      coins: 50,
      download_link: ["https://gofile.io/d/qtnLC8", "https://datanodes.to/3acevyjw1y6h/Prototype.rar"],
        image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1753906753/prototype_vitkjv.jpg",
      platform: "PC",
    },     
            {
      title: "Prototype 2",
      size: "10 GB",
      price: "Price",
      coins: 100,
      download_link: ["https://gofile.io/d/bvHmHB"],
        image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1753906780/prototype2_i444yq.jpg",
      platform: "PC",
    },  
                {
      title: "God Of War 1",
      size: "7 GB",
      price: "Price",
      coins: 50,
      download_link: ["https://romsfun.com/download/god-of-war-169969-70788/5"],
         image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1751687548/gow1_n2m3qx.jpg",
      platform: "PS2",
    },
    {
      title: "God Of War II",
      size: "7 GB",
      price: "Price",
      coins: 50,
      download_link: ["https://romsfun.com/download/god-of-war-ii-12928/5"],
        image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1751687715/gow2_s4q05w.jpg",
      platform: "PS2",
    },

        {
      title: "God Of War III",
      size: "30 GB",
      price: "Price",
      coins: 100,
      download_link: ["https://downloads.romspedia.com/roms/God%20of%20War%20III%20%28USA%29%20%28v02.00%29.7z"],
        image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1753904572/gow3_oep5he.jpg",
      platform: "PS3",
    },

            {
      title: "God Of War Ascension",
      size: "35 GB",
      price: "Price",
      coins: 100,
      download_link: ["https://romsfun.com/download/god-of-war-ascension-41046/3"],
        image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1753904832/gowasc_gnfwgl.jpg",
      platform: "PS3",
    },

                {
      title: "God Of War Ghost of Sparta",
      size: "2 GB",
      price: "Price",
      coins: 50,
      download_link: ["https://romsfun.com/download/god-of-war-ghost-of-sparta-id2-11101/9"],
        image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1753905221/gowghost_wpg4nq.jpg",
      platform: "PSP",
    },

                    {
      title: "God Of War Chains of Olympus",
      size: "2 GB",
      price: "Price",
      coins: 50,
      download_link: ["https://romsfun.com/download/god-of-war-chains-of-olympus-11095/6"],
        image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1753905497/gowchain_efc6oc.jpg",
      platform: "PSP",
    },
            {
      title: "Ps3 Emulator",
      size: "300 MB",
      price: "Free",
      coins: 0,
      download_link: "https://www.mediafire.com/file/be0sx8qa8o64vey/rpcs3.zip/file",
      image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1753632505/ps3_r4afca.jpg",
      platform: "PC",
    },
                {
      title: "Ps2 Emulator",
      size: "100 MB",
      price: "Free",
      coins: 0,
      download_link: "https://www.mediafire.com/file/sxh6o473my4z8vs/ps2.zip/file",
      image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1753632644/ps2_nfpr16.jpg",
      platform: "PC",
    },
                    {
      title: "PSP Emulator",
      size: "50 MB",
      price: "Free",
      coins: 0,
      download_link: "https://www.mediafire.com/file/7k1a45qwnzjvhpr/ppsspp_win.zip/file",
      image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1753633941/ppsspp_pdjvc4.jpg",
      platform: "PC",
    },
    
  ]
)
  const navigate = useNavigate();





  const [searchTerm, setSearchTerm] = useState<string>("");

      const [animations, setAnimations] = useState<Animations>({});

        const [jsonfiles] = useState([
          {
            title: "windowsicon",
            link:"https://res.cloudinary.com/dababspdo/raw/upload/v1763219262/windows_x9olxp.json",
          },
                    {
            title: "androidicon",
            link:"https://res.cloudinary.com/dababspdo/raw/upload/v1763214100/android-anime_ta912x.json",
          },
                    {
            title: "playstationicon",
            link:"https://res.cloudinary.com/dababspdo/raw/upload/v1763218998/playstation_dqqid1.json",
          },
                              {
            title: "coinsicon",
            link:"https://res.cloudinary.com/dababspdo/raw/upload/v1763219996/coin_zhrla1.json",
          },

        ]);


  const filteredGames = gameSpecs.filter((game) =>
    game.title.toLowerCase().includes(searchTerm.toLowerCase())
  );  

  const handleDownload = (data : GameSpecs): void => {
        if (data.price === "Free") {
  window.open(data.download_link, "_blank", "noopener,noreferrer");
            return;
        }
        navigate("/download", { state: { data: data } });
};
                useEffect(() => {
              // Fetch all JSONs in parallel
              const fetchAnimations = async () => {
                const anims  :any ={};
                await Promise.all(
                  jsonfiles.map(async (jsonfile) => {
                    try {
                      const res = await fetch(jsonfile.link); // each course has its JSON URL
                      const data = await res.json();
                      anims[jsonfile.title] = data; // store by course id
                    } catch (err) {
                      console.error("Failed to load animation:", err);
                    }
                  })
                );
                setAnimations(anims);
              };
    fetchAnimations();
  }, [jsonfiles]);

    return (
            <div>
<Header/>

<Coins isVisible={true} />
             <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",  
        marginBottom:"20px",            
             }}>
              {/* <IoSearch />
                      <input
          type="text"
          placeholder="Search by title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        /> */}
         <div style={{ position: "relative" }}>
    <IoSearch
      style={{
        position: "absolute",
        left: "10px",
        top: "50%",
        transform: "translateY(-50%)",
        color: "#999",
      }}
    />
    <input
      type="text"
      placeholder="Search by title"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      style={{
        width: "100%",
        padding: "10px 10px 10px 35px", // extra left padding for icon
        border: "1px solid #ccc",
        borderRadius: "8px",
        outline: "none",
      }}
    />
  </div>
             </div>

             

      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "20px",
      }}>
    
        
                   <div style={{
                    display:"flex",
                    flexDirection:"row",
                                  justifyContent:"center",
                                  width:"160px",
                                  borderRadius:"10px",
                                  cursor:"pointer",
                                                      background:"#f1f1f1",

    
                  }}
    
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
                  {animations["windowsicon"] &&
      <Lottie style={{
        height:"50px",
        width:"30px",
        marginLeft:"10px"
    }} animationData={animations["windowsicon"]} loop autoplay />}
                </div>
                
                  </div>
    
    
    
                    <div className='platform-button'
    
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
                  {animations["androidicon"] &&
      <Lottie style={{
        height:"50px",
        width:"50px",
        marginLeft:"10px"
    }} animationData={animations["androidicon"]} loop autoplay />}
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
                            PlayStation
                            

            </div>
                            <div>
                  {animations["playstationicon"] &&
      <Lottie style={{
        height:"45px",
        width:"45px",
        marginLeft:"10px"
    }} animationData={animations["playstationicon"]} loop autoplay />}
                </div>
                
              </div>

    
                                </div>
<div className='main-content'>



<div style={{
        display:"flex",
        // flexDirection:"column",
        flexWrap:"wrap",
justifyContent:"space-around",
gap:"20px",
// margin:"50px",
      }}>
        {filteredGames.map((data, index) => (
  <div key={index} className='pc_box'>
    
    <div style={{
        display:"flex",
        justifyContent:"center",
        borderRadius:"10px",
    }}>
      <img
        style={{ borderRadius: "10px",
          width: "260px",
                    height: "150px",

         }}
        src={data.image_link}
        alt=""
        sizes="5px"
      />
    </div>

    <div style={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      textAlign: "center",
    }}>
      <h4>{data.title}</h4>
    <div style={
      {
        fontSize:"30px"
      }
    }>
      {animations["windowsicon"] &&
    <Lottie style={{
    height:"25px",
    width:"25px",
    marginLeft:"10px",
    marginRight: "10px",
}} animationData={animations["windowsicon"]} loop autoplay />
}

    </div>
      <p>size {data.size}</p>
    </div>

    <button
      className='course_box'
      onClick={() => handleDownload(data)}
    >
      <div className='game-button'>
        <h3>{data.price}</h3>
        <div style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          textAlign: "center",
        }}>
          {animations["coinsicon"] &&
          <Lottie
  className='button-coin'
            animationData={animations["coinsicon"]}
            loop
            autoplay
          />
        }
          {data.coins}
        </div>
      </div>
    </button>


  </div>
))}



    </div>
</div>
            </div>

    );
};

export default Game;
