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
            overflow: 'hidden' // Ensure the image doesn't overflow the container
        }}>
            <img style={{
                width: '100%',
                height: 'auto', // Maintain aspect ratio
                flexGrow: 1,
                objectFit: 'cover' // Ensure the image covers the container
            }} src={image} alt={alt} />
            <h2 style={{ margin: '10px 0 0 0' }}>{name}</h2>
        </div>
    );
}

export default function Country({ Countryname }) {
    const [detail, setDetail] = useState([]);
    const url = 'https://restcountries.com/v3.1/all';

    const fetchData = async () => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (Countryname !== '') {
                const filteredData = data.filter((e) =>
                    e.name.common.toLowerCase().includes(Countryname.toLowerCase())
                );
                setDetail(filteredData);
            } else {
                setDetail(data);
            }
        } catch (e) {
            console.log('Error: ', e);
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
                <CardDetail key={data.name.common} name={data.name.common} image={data.flags.png} alt={data.flags.alt} />
            ))}
        </div>
    );
}
