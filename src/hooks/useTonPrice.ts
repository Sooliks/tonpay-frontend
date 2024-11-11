import {useEffect, useState} from "react";
import axios from "axios";


const useTonPrice = (salePrice?: number) => {
    const [priceTon, setPrice] = useState<number>(0);
    useEffect(() => {
        const fetchCurrentPrice = async () => {
            try {
                const res = await axios.get('https://api.binance.com/api/v3/ticker/price', {
                    params: {
                        symbol: 'TONUSDT'
                    }
                });
                const p: string = res.data.price as string;
                const pr = Number(p)
                setPrice(Number(pr.toFixed(2)));
            }catch (error) {
                console.error(error);
            }
        }
        fetchCurrentPrice()
        setInterval(()=>{
            fetchCurrentPrice()
        }, 6000)
    }, []);
    return { priceTon };
};

export default useTonPrice;
