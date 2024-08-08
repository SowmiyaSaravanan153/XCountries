import React, { useState, useEffect } from 'react';

function CardDetail({ name, image, alt }) {
    return (
        <div className='countryCard' style={{
            width: '190px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid black',
            padding: '10px',
            margin: '10px',
            height: '200px',
            borderRadius: '8px',
            overflow: 'hidden'
        }}>
            <img 
            style={{
                width: '100%',
                height: 'auto',
                flexGrow: 1,
                objectFit: 'cover'
            }} 
             src={image || 'https://via.placeholder.com/190x200?text=No+Image'} // Default placeholder
                alt={alt || 'Country flag'} // Default alt text
             />
            <h2 style={{ margin: '10px 0 0 0' }}>{name}</h2>
        </div>
    );
}

export default function Country({ Countryname }) {
    const [detail, setDetail] = useState([]);
    const url = 'https://xcountries-backend.azurewebsites.net/all';

    const fetchData = async () => {
        try {
            console.log("Fetching data from:", url);
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            console.log("Fetched data:", data);
            if (Countryname !== '') {
                const filteredData = data.filter((e) =>
                    e.name.toLowerCase().includes(Countryname.toLowerCase())
                );
                setDetail(filteredData);
            } else {
                setDetail(data);
            }
        } catch (e) {
            console.error("Error fetching data:", e.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, [Countryname]);

    return (
        <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            height: '100vh',
            paddingTop: '15px',
            justifyContent: 'center'
        }}>
            {detail.map((data) => (
                <CardDetail
                    key={data.abbr}
                    name={data.name}
                    image={data.flag}
                    alt={data.name}
                />
            ))}
        </div>
    );
}
