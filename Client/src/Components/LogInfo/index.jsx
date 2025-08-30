// LogInfo.jsx
import styles from "./index.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import axios from "axios";
import "swiper/css";
import "swiper/css/pagination";
import { useEffect, useState } from "react";
import BASE_URL from "../../Constants/baseUrl";

function LogInfo() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/tricks`)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={styles.info}>
      {data.length > 0 ? (
        <Swiper
          modules={[Autoplay, Pagination]}
          className={styles.cardList}
          spaceBetween={50}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false, // autoplay devam eder
          }}
          pagination={{ clickable: true }}
        >
          {data.map((item, i) => (
            <SwiperSlide key={i} className={styles.card}>
              <div className={styles.image}>
                <img src={item.photo} alt={item.title} />
              </div>
              <h1>{item.title}</h1>
              <p>{item.description}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default LogInfo;
