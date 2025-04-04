import React, { useEffect, useState } from 'react';

const UseMenu = () => {
    const [menu,setMenu]=useState([]);
    const [loading,setLoading]=useState(true);
    useEffect(()=>{
        fetch('https://bistro-boss-server-ruby-nu.vercel.app/menu')
        .then(res=>res.json())
        .then(data=>{
            setMenu(data);
            setLoading(false);
        })
    },[])
    return [menu,loading]
};

export default UseMenu;