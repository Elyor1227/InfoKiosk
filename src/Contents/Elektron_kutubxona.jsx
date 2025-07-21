import { faDownload, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

function Elektron_kutubxona() {
    const [kutubxona, setKutubxona] = useState(null);
    const [book, setBook] = useState(null);
    const library = [
        { name: "TOP-adabiyotlar", image: "/images/elibrary.png"},
        { name: "Iqtisodiy adabiyotlar", image: "/images/elibrary2.png" },
        { name: "Badiiy adabiyotlar", image: "/images/elibrary3.png"},       
        { name: "Huquqiy adabiyotlar", image: "/images/elibrary4.png"},
        { name: "Iqtisodiy adabiyotlar", image: "/images/elibrary4.png"},
        { name: "Iqtisodiy adabiyotlar", image: "/images/elibrary4.png"},
        { name: "Iqtisodiy adabiyotlar", image: "/images/elibrary4.png"},
        { name: "Iqtisodiy adabiyotlar", image: "/images/elibrary4.png"},
        { name: "Xorijiy adabiyotlar", image: "/images/elibrary5.png"},
      ];
      const books = [
        { name: "Tara Vestor: Talaba", image: "/images/book.png", rating: "5 stars", icon: {faStar}, download: "", description: "Talaba – Tara Vestoverning avtobiografik kitobi bo‘lib, u qattiq diniy oilada ulg‘ayishi, rasmiy ta’limsiz o‘sishi va keyinchalik Kembrij hamda Garvardda o‘qishi haqida hikoya qiladi."},
        { name: "Tara Vestor: Talaba", image: "/images/book2.png", rating: "5 stars", download: "", description: "Talaba – Tara Vestoverning avtobiografik kitobi bo‘lib, u qattiq diniy oilada ulg‘ayishi, rasmiy ta’limsiz o‘sishi va keyinchalik Kembrij hamda Garvardda o‘qishi haqida hikoya qiladi."},
        { name: "Tara Vestor: Talaba", image: "/images/book3.png", rating: "5 stars", download: "", description: "Talaba – Tara Vestoverning avtobiografik kitobi bo‘lib, u qattiq diniy oilada ulg‘ayishi, rasmiy ta’limsiz o‘sishi va keyinchalik Kembrij hamda Garvardda o‘qishi haqida hikoya qiladi."},
        { name: "Tara Vestor: Talaba", image: "/images/book3.png", rating: "5 stars", download: "", description: "Talaba – Tara Vestoverning avtobiografik kitobi bo‘lib, u qattiq diniy oilada ulg‘ayishi, rasmiy ta’limsiz o‘sishi va keyinchalik Kembrij hamda Garvardda o‘qishi haqida hikoya qiladi."},
      ]

    return(
        <div className="Elektron_kutubxona">
            <h1>Elektron Kutuboxona</h1>
            {(!kutubxona)&&(
                <div className="library">
                    {library.map((item, index) => (
                    <div key={index} className="library_card" onClick={() => setKutubxona(item)}>
                        <img src={item.image} alt={item.name} />
                    </div>
                ))}
                </div>
            )
            }
            {
                kutubxona && (book ? (
                    <div className="Top-adabiyotlar">
                    <div className="book">
                    <img src={book.image} alt={book.name} />
                    <div className="book-info">
                    <h2>{book.name}</h2>
                    <p>{book.description}</p>
                    <p><FontAwesomeIcon icon={faStar} /></p>
                    </div>
                    </div>
                    <img className="bookimg" src="/images/qr.png" alt="qr" />
                    <button>Elektron versiyasini yuklab olish <FontAwesomeIcon icon ={faDownload} /></button>
                </div>
                ) : (
                <div className="Top-adabiyotlar">
                    <h1>Top-adabiyotlar</h1>
                    <div className="books">
                        {
                            books.map((item) => (
                                <div className="book" onClick={() => setBook(item)}>
                                    <img src={item.image} alt={item.name} />
                                    <div className="book-info">
                                    <h2>{item.name}</h2>
                                    <p>{item.description}</p>
                                    <p>{item.rating}</p>
                                    <button>Elektron versiyasini yuklab olish <FontAwesomeIcon icon ={faDownload} /></button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>)
                )
            }
        </div>
    )
}

export default Elektron_kutubxona;