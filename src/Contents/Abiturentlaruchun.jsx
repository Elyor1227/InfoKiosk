function Abiturentlaruchun() {
  return (
    <div className="Qayta_oqish">
      <div className="q-container">
        <h1>Qayta o'qish uchun ariza topshirish</h1>
        <img src="/images/Abiturentlar/img5.jpg" alt="img" />
        <div className="box">
          <div className="box_text"> 
            <h3>Qadam 1 : Formani to‘ldiring</h3>
            <p>Shaxsiy va o‘quv ma’lumotlaringizni kiriting, semestringizni tanlang va fanlaringizni belgilang.</p>
          </div>
          <img src="/images/Abiturentlar/7.png" alt="" />
        </div>
        <div className="box">
          <img src="/images/Abiturentlar/6.png" alt="" />
          <div className="box_text">
            <h3>Qadam 2 : Ariza shaklini ko‘rib chiqing</h3>
            <p>Yuborishdan oldin hamma ma’lumotlar to‘g‘ri ekanligiga ishonch hosil qilish uchun arizaning avtomatik shakllangan ko‘rinishini ko‘rib chiqing.</p>
          </div>
        </div>  
        <div className="box">
          <div className="box_text">
            <h3>Qadam 3 : Arizani yuboring va tasdiqlang</h3>
            <p>Arizani yuboring va darhol tasdiq xabarini oling.</p>
          </div>
          <img src="/images/Abiturentlar/3.png" alt="" />  
        </div>
        <div className="p_text">
          <h3>Bu qanday ishlaydi</h3>
          <p>Fakultet, ta’lim sohasi va semestrni tanlash kifoya. Ehtiyotkorlik bilan ma'lumotlaringizni kiriting, jumladan to'liq ismingiz (FISH), guruhingiz va aloqa ma'lumotlari. Ushbu davrni o'rganishni rejalashtirgan fanlarni sanab o'ting.</p>
          <p>Shaklni to'ldirganingizdan so'ng, arizangizni oldindan ko'rish paydo bo'ladi. Qayta ro'yxatdan o'tish jarayoni muammosiz o'tishini ta'minlash uchun uning to'g'riligini tekshiring.</p>
          <p>Tayyormisiz? Qayta ro'yxatdan o'tish uchun arizangizni yuboring. Siz tasdiqlashni olasiz va istalgan vaqtda arizangiz holatini ko'rishingiz mumkin.</p>
        </div>
        <div className="form">
          <h3>Ariza shaklini yuborish</h3>
          <form action="">
            <input type="text" placeholder="Ismingiz va familyangiz" />
            <input type='text'
            placeholder="fakultet"/>
            <input type='text'
            placeholder="ta'lim sohasi"/>
            <input type='text'
            placeholder="semestr"/>
            <input type='text'
            placeholder="fanlar"/>
            <button>Yuborish</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Abiturentlaruchun;
