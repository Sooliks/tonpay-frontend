import {useEffect, useState} from "react";
import axios from "axios";


const useTonPrice = () => {
    const [priceTon, setPrice] = useState<number>(0);
    useEffect(() => {
        const fetchCurrentPrice = async () => {
            try {
                const res = await axios.get('https://api.binance.com/api/v3/ticker/price', {
                    params: {
                        symbol: 'TONUSDT'
                    }
                });
                setPrice(res.data.price);
            }catch (error) {
                console.error(error);
            }
        }
        setInterval(()=>{
            fetchCurrentPrice()
        },5000)
    }, []);

    return { priceTon };
};

export default useTonPrice;
