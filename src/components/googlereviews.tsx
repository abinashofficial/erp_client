



// import { useMemo } from "react";
// import { FcGoogle } from "react-icons/fc";


// interface Review {
//   id: number;
//   name: string;
//   rating: number; 
//   comment: string;
//   datetime: string;
//   avatar: string;
// }

// export default function GoogleReviews(): JSX.Element {
//   const reviews: Review[] = [
//     {
//       id: 1,
//       name: "Aisha Khan",
//       rating: 5,
//       comment: "Excellent service — highly recommended!",
//       datetime: "2025-10-29T14:32:00",
//       avatar: "https://i.pravatar.cc/80?img=12",
//     },
//     {
//       id: 2,
//       name: "Rajat Sharma",
//       rating: 4,
//       comment: "Very good, a couple of small issues but overall satisfied.",
//       datetime: "2025-10-21T09:12:00",
//       avatar: "https://i.pravatar.cc/80?img=5",
//     },
//     {
//       id: 3,
//       name: "Nina Gupta",
//       rating: 5,
//       comment: "Loved it — the team went above and beyond.",
//       datetime: "2025-09-30T18:45:00",
//       avatar: "https://i.pravatar.cc/80?img=47",
//     },
//     {
//       id: 4,
//       name: "Suresh Iyer",
//       rating: 3,
//       comment: "It was okay, expected slightly better UX.",
//       datetime: "2025-09-12T11:05:00",
//       avatar: "https://i.pravatar.cc/80?img=32",
//     },
//     {
//       id: 5,
//       name: "Meera Patel",
//       rating: 2,
//       comment: "Not what I expected — needs improvement.",
//       datetime: "2025-08-02T20:00:00",
//       avatar: "https://i.pravatar.cc/80?img=20",
//     },
//     {
//       id: 6,
//       name: "Anand Rao",
//       rating: 4,
//       comment: "Good value for money.",
//       datetime: "2025-07-18T07:22:00",
//       avatar: "https://i.pravatar.cc/80?img=7",
//     },
//   ];

//   const stats = useMemo(() => {
//     const total = reviews.length;
//     const byRating = [0, 0, 0, 0, 0];
//     let sum = 0;
//     reviews.forEach((r) => {
//       byRating[r.rating - 1] += 1;
//       sum += r.rating;
//     });
//     const average = total ? +(sum / total).toFixed(2) : 0;
//     return { total, byRating, average };
//   }, [reviews]);

//   return (
//     <div className="review-main" >
//       <div className="review-header" >

//         <div className="review-title-box">
//           <div style={{
//             display:"flex",
//             flexDirection:"row",
//             alignItems:"center",
//             gap:"10px",
//           }}>

//           <FcGoogle size={30}/>

//           <h2 className="review-title">Reviews</h2>
//                     </div>

//           <div >
//             <div style={{
//             display:"flex",
//             flexDirection:"row",
//             alignItems:"center",
//             justifyContent:"center",
//             gap:"10px",
//           }}>
//             <h3>
// {stats.average}
//             </h3>
//               {/* <div >{stats.average}</div> */}
//               <div>
//                 <StarDisplay rating={Math.round(stats.average)} size={20} />
//               </div>
//                               <div >({stats.total})</div>

//             </div>
//             {/* <div className="mt-6 space-y-3">
//               {[5, 4, 3, 2, 1].map((star) => (
//                 <RatingBar
//                   key={star}
//                   star={star}
//                   count={stats.byRating[star - 1]}
//                   total={stats.total}
//                 />
//               ))}
//             </div> */}


//           </div>

//         </div>
//                                       <div className="write-review-button">
//                       <h4 >Write review</h4>

//             </div>
//       </div>



//         <div style={{
//           display:"flex",
//           justifyContent:"center",
//           flexDirection:"column",
//           alignItems:"center",
//         }}>
//               <div className='link' >
// All reviews
//     </div>
//           {/* <h3 >All reviews</h3> */}
//           <div className="space-y-4">
//             {reviews
//               .slice()
//               .sort((a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime())
//               .map((r) => (
//                 <ReviewCard key={r.id} review={r} />
//               ))}
//           </div>

          
//         </div>



        
//     </div>
//   );
// }

// interface StarProps {
//   filled: boolean;
//   size?: number;
// }

// function Star({ filled, size = 18 }: StarProps): JSX.Element {
//   return (
//     <svg
//       width={size}
//       height={size}
//       viewBox="0 0 24 24"
//       fill={filled ? "#FBBF24" : "none"}
//       stroke="#F59E0B"
//       strokeWidth="1"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       className="inline-block mr-0.5"
//     >
//       <path d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.787 1.401 8.168L12 18.896l-7.335 3.87 1.401-8.168L.132 9.211l8.2-1.193z" />
//     </svg>
//   );
// }

// interface StarDisplayProps {
//   rating: number;
//   size?: number;
// }

// function StarDisplay({ rating = 0, size = 18 }: StarDisplayProps): JSX.Element {
//   return (
//     <div className="flex items-center">
//       {Array.from({ length: 5 }).map((_, i) => (
//         <Star key={i} filled={i < rating} size={size} />
//       ))}
//     </div>
//   );
// }

// interface RatingBarProps {
//   star: number;
//   count: number;
//   total: number;
// }

// function RatingBar({ star, count, total }: RatingBarProps): JSX.Element {
//   const pct = total ? Math.round((count / total) * 100) : 0;
//   return (
//     <div className="flex items-center gap-3">
//       <div className="w-8 text-sm">{star}★</div>
//       <div className="flex-1 bg-gray-100 rounded-full h-3 overflow-hidden">
//         <div
//           className="h-3 rounded-full"
//           style={{ width: `${pct}%`, background: "linear-gradient(90deg,#FDE68A,#F59E0B)" }}
//         />
//       </div>
//       <div className="w-12 text-sm text-right">{count}</div>
//     </div>
//   );
// }

// interface ReviewCardProps {
//   review: Review;
// }

// function ReviewCard({ review }: ReviewCardProps): JSX.Element {
//   const date = new Date(review.datetime);
//   const formatted = date.toLocaleString(undefined, {
//     year: "numeric",
//     month: "short",
//     day: "2-digit",
//     hour: "2-digit",
//     minute: "2-digit",
//   });

//   return (
//     <div className="review-box">
//       <div>

//       <img
//         src={review.avatar}
//         alt={review.name}
//         // className="w-14 h-14 rounded-full object-cover flex-shrink-0"
//         style={{
//           borderRadius:"50px",
//         }}
//       />
//       <div className="flex-1">
//         <div className="flex items-center justify-between">
//           <div>
//             <div className="font-medium">{review.name}</div>
//             <div className="text-xs text-gray-500">{formatted}</div>
//           </div>
//           <div className="flex items-center">
//             <StarDisplay rating={review.rating} size={16} />
//           </div>
//         </div>
//       </div>
//             </div>
//             <div style={{
//               display:"flex",
//               justifyContent:"center",
//               alignItems:"center",
//               margin:"10px",
//             }}>

//         <p className="mt-3 text-gray-700">{review.comment}</p>
//                     </div>


//     </div>
//   );
// }





















  import  { useMemo, useState, ChangeEvent, FormEvent, useEffect } from "react";
  import { FcGoogle } from "react-icons/fc";
  import { useAuth } from '../context/authContext';

  interface SubmitReview {
    id: number;
    name: string;
    rating: number;
    comment: string;
    datetime: string;
    avatar: string;
    email:string;
  }

  interface GetReview {
    id: number;
    name: string;
    rating: number;
    comment: string;
    datetime: Date | null;
    avatar: string;
    email:string;
  }

  const sheetUrl =
    "https://docs.google.com/spreadsheets/d/1FoAnlVItcC-RB2QqveQlL_KE97xwnUi3LdODvakb2Fw/gviz/tq?sheet=Review Form&headers=1&tq=select%20*%20";

  export default function GoogleReviews(): JSX.Element {
                const [isModalOpen, setIsModalOpen] = useState(false);
                              const [openReview, setOpenReview] = useState(false);
                                      const { empDetail } = useAuth();
                              

    
    // const dummyReviews: Review[] = Array.from({ length: 50 }).map((_, i) => ({
    //   id: i + 1,
    //   name: `User ${i + 1}`,
    //   rating: Math.floor(Math.random() * 5) + 1,
    //   comment: `This is a sample review #${i + 1}. I really liked using this platform!`,
    //   datetime: new Date(Date.now() - i * 86400000).toISOString(),
    //   avatar: `https://i.pravatar.cc/80?u=${i + 1}`,
    //   email:"",
    // }));

    // const [reviews] = useState<SubmitReview[]>([]);
      const [getReviews, setGetReviews] = useState<GetReview[]>([]);

    const [newReview, setNewReview] = useState({ name: "", rating: 0, comment: "" });
    const [currentPage, setCurrentPage] = useState(1);
    const reviewsPerPage = 10;

    const totalPages = Math.ceil(getReviews.length / reviewsPerPage);
    const paginatedReviews = getReviews.slice((currentPage - 1) * reviewsPerPage, currentPage * reviewsPerPage);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setNewReview((prev) => ({ ...prev, [name]: value }));
    };

    const handleRatingChange = (rating: number) => {
      setNewReview((prev) => ({ ...prev, rating }));
    };

    const handleSubmit = (e: FormEvent) => {
      e.preventDefault();
      if ( newReview.rating === 0) return;

      const submitEntry: SubmitReview = {
        id: Date.now(),
        name: empDetail.full_name,
        rating: newReview.rating,
        comment: newReview.comment,
        datetime: new Date().toISOString(),
        avatar: empDetail.photo_url,
        email: empDetail.email,
      };
      submitGoogleForm(submitEntry)
            const newEntry: GetReview = {
        id: Date.now(),
        name: empDetail.full_name,
        rating: newReview.rating,
        comment: newReview.comment,
        datetime: new Date(),
        avatar: empDetail.photo_url,
        email: empDetail.email,
      };

      setGetReviews((prev) => [newEntry, ...prev]);
      setNewReview({ name: "", rating: 0, comment: "" });
      setCurrentPage(1);
      setIsModalOpen(!isModalOpen)
    };

    const stats = useMemo(() => {
      const total = getReviews.length;
      const byRating = [0, 0, 0, 0, 0];
      let sum = 0;
      getReviews.forEach((r) => {
        byRating[r.rating - 1] += 1;
        sum += r.rating;
      });
      const average = total ? +(sum / total).toFixed(2) : 0;
      return { total, byRating, average };
    }, [getReviews]);


    const submitGoogleForm = async (newEntry: SubmitReview ) => {
      console.log(newEntry, "newEntry")
    const formUrl =
      "https://docs.google.com/forms/d/e/1FAIpQLSeUSRAnuLOX2xX-Lc2Exl4X_1ErjSyKYzryiUtr7kQ1KSDuYg/formResponse";

    // Replace entry.X with your form field IDs
    const formData = new URLSearchParams();
    formData.append("entry.311112584", newEntry.comment); // example
    formData.append("entry.472346236", newEntry.datetime);
    formData.append("entry.680224303", newEntry.id.toString());
      formData.append("entry.1614613816", newEntry.email);

    formData.append(
      "entry.1391847240",
      newEntry.avatar
    );
    formData.append("entry.1540291600", newEntry.name);
    formData.append("entry.27055568", newEntry.rating.toString());

    try {
      const response = await fetch(formUrl, {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      if (response.ok) {
        console.log("Form submitted successfully!");
      } else {
        console.error("Failed to submit form", response.status);
      }
    } catch (err) {
      console.error("Error submitting form", err);
    }
  };





    useEffect(() => {
      const fetchReviews = async () => {
        try {
          const res = await fetch(sheetUrl);
          const text = await res.text();
          const jsonStr = text.match(/setResponse\((.*)\);/)?.[1];
          if (!jsonStr) throw new Error("Invalid Google Sheets response");
          const json = JSON.parse(jsonStr);

          const parsed = json.table.rows.map((row: any) => {
            const c = row.c;
            return {
              // Timestamp: c[0]?.f || "",
              name: c[1]?.v || "",
              comment: c[2]?.v || "",
              rating: c[3]?.v || 0,
              avatar: c[5]?.v || "",
              email: c[8]?.v || "",
              id: c[7]?.v || Date.now(),
              datetime: c[6]?.v ? new Date(c[6].v) : null,
            };
          });

          setGetReviews(parsed);
        } catch (err) {
          console.error(err);
        } finally {
          // setLoading(false);
        }
      };

      fetchReviews();
    }, []);

    return (
      <div className="review-main">
              <div className="review-header" >

          <div className="review-title-box">
            <div style={{
              display:"flex",
              flexDirection:"row",
              alignItems:"center",
              gap:"10px",
            }}>

            <FcGoogle size={30}/>

            <h2 className="review-title">Reviews</h2>
                      </div>

            <div >
              <div style={{
              display:"flex",
              flexDirection:"row",
              alignItems:"center",
              justifyContent:"center",
              gap:"10px",
            }}>
              <h3>
  {stats.average}
              </h3>
                {/* <div >{stats.average}</div> */}
                <div>
                  <StarDisplay rating={Math.round(stats.average)} size={20} />
                </div>
                                <div >({stats.total})</div>

              </div>
              {/* <div className="mt-6 space-y-3">
                {[5, 4, 3, 2, 1].map((star) => (
                  <RatingBar
                    key={star}
                    star={star}
                    count={stats.byRating[star - 1]}
                    total={stats.total}
                  />
                ))}
              </div> */}


            </div>

          </div>
                                        <div className="write-review-button" onClick={()=> setIsModalOpen(!isModalOpen)}>
                        <h4 >Write review</h4>

              </div>



              
        </div>


    
                <div className='link' style={{
                  margin:"10px",
                }} onClick={()=>setOpenReview(!openReview)} >
  All reviews
      </div> 

    {openReview &&

          <div style={{
            display:"flex",
            justifyContent:"center",
            flexDirection:"column",
            alignItems:"center",
          }}>
          <div className="space-y-4">
              {paginatedReviews.map((r) => (
                <ReviewCard key={r.id} review={r} />
              ))}
            </div>

            {/* Pagination Controls */}
            <div style={{
              display:"flex",
              justifyContent:"center",
              alignItems:"center",
              gap:"10px",
            }}>
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                First
              </button>
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Prev
              </button>
              <span className="px-3 py-1 text-sm">Page {currentPage} of {totalPages}</span>
              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Next
              </button>
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Last
              </button>
            </div>
          </div>

          }
  {isModalOpen&& 
                      <div className="modal-backdrop">
    <div className="modal-content">
      <div style={{
                            display:"flex",
                            justifyContent:"flex-end",

                          }}>
                          <button  onClick={()=>setIsModalOpen(!isModalOpen)}>
            ×
          </button>
      </div>

            <form onSubmit={handleSubmit} style={{
              display:"flex",
              justifyContent:"center",
              alignItems:"center",
              gap:"10px",
            }}>

              {/* <h3 className="text-lg font-medium">Write a Review</h3> */}
  {/* 
              <input
                type="text"
                name="name"
                placeholder="Your name"
                value={empDetail.name || ""}
                onChange={handleInputChange}
                className="w-full border rounded-md p-2 text-sm"
              /> */}

              <div>
                <label className="block text-sm mb-1">Your rating:</label>
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <button
                      type="button"
                      key={i}
                      onClick={() => handleRatingChange(i + 1)}
                      className="focus:outline-none"
                      style={{
                        background:"none"
                      }}
                    >
                      <Star filled={i < newReview.rating} size={22} />
                    </button>
                  ))}
                </div>
              </div>

              <textarea
                name="comment"
                placeholder="Write your review here..."
                value={newReview.comment}
                onChange={handleInputChange}
                className="w-full border rounded-md p-2 text-sm min-h-[80px]"
                style={{
                  width:"50%",
                  height:"60px",
                }}
              />

              <button
                type="submit"
                className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
              >
                Submit Review
              </button>
            </form>
    </div>
      </div>
      }


      </div>
    );
  }

  interface StarProps {
    filled: boolean;
    size?: number;
  }

  function Star({ filled, size = 18 }: StarProps): JSX.Element {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={filled ? "#FBBF24" : "none"}
        stroke="#F59E0B"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="inline-block mr-0.5 cursor-pointer"
      >
        <path d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.787 1.401 8.168L12 18.896l-7.335 3.87 1.401-8.168L.132 9.211l8.2-1.193z" />
      </svg>
    );
  }

  interface StarDisplayProps {
    rating: number;
    size?: number;
  }

  function StarDisplay({ rating = 0, size = 18 }: StarDisplayProps): JSX.Element {
    return (
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} filled={i < rating} size={size} />
        ))}
      </div>
    );
  }

  // interface RatingBarProps {
  //   star: number;
  //   count: number;
  //   total: number;
  // }

  // function RatingBar({ star, count, total }: RatingBarProps): JSX.Element {
  //   const pct = total ? Math.round((count / total) * 100) : 0;
  //   return (
  //     <div className="flex items-center gap-3">
  //       <div className="w-8 text-sm">{star}★</div>
  //       <div className="flex-1 bg-gray-100 rounded-full h-3 overflow-hidden">
  //         <div
  //           className="h-3 rounded-full"
  //           style={{ width: `${pct}%`, background: "linear-gradient(90deg,#FDE68A,#F59E0B)" }}
  //         />
  //       </div>
  //       <div className="w-12 text-sm text-right">{count}</div>
  //     </div>
  //   );
  // }

  interface ReviewCardProps {
    review: GetReview;
  }

  function ReviewCard({ review }: ReviewCardProps): JSX.Element {
  let formatted = "";
  if (review.datetime) {
    formatted = new Date(review.datetime).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

    return (
      <div className="review-box">
        <div>

        <img
          src={review.avatar}
          alt={review.name}
          // className="w-14 h-14 rounded-full object-cover flex-shrink-0"
          style={{
            borderRadius:"50px",
            height:"60px",
            width:"60px",
          }}
        />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <div style={{
                                fontWeight:"bold"

              }}>{review.name}</div>
              <div className="text-xs text-gray-500">{formatted}</div>
            </div>
            <div className="flex items-center">
              <StarDisplay rating={review.rating} size={16} />
            </div>
          </div>
        </div>
              </div>
              <div style={{
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
                margin:"10px",
              }}>

          <p className="mt-3 text-gray-700">{review.comment}</p>
                      </div>


      </div>
    );
  }