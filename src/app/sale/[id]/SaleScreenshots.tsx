import React, {useState} from 'react';
import {Button} from "@/components/ui/button";
import {ChevronLeftIcon} from "lucide-react";
import Image from "next/image";
import {ChevronRightIcon} from "@radix-ui/react-icons";
import Link from "next/link";

const SaleScreenshots = ({publicIds}:{publicIds: string[]}) => {
    const [currentScreenIndex,setCurrentScreenIndex] = useState<number>(0)
    const handleClickLeft = () => {
        if(currentScreenIndex!==0){
            setCurrentScreenIndex(prev=>prev-1)
        }
    }
    const handleClickRight = () => {
        if(currentScreenIndex!==publicIds.length-1){
            setCurrentScreenIndex(prev=>prev+1)
        }
    }
    return (
        <div className={'flex w-full justify-between items-center'}>
            <Button
                onClick={handleClickLeft}
                disabled={currentScreenIndex===0}
                variant="outline"
                size="icon"
            >
                <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <Link
                className={'mx-4'}
                target={'_blank'}
                href={`https://res.cloudinary.com/dqggb6cgz/image/upload/${publicIds[currentScreenIndex]}`}
            >
                <Image
                    src={`https://res.cloudinary.com/dqggb6cgz/image/upload/${publicIds[currentScreenIndex]}`}
                    alt={`screen ${currentScreenIndex}`}
                    width={200}
                    height={170}
                />
            </Link>
            <Button
                onClick={handleClickRight}
                disabled={currentScreenIndex===publicIds.length-1}
                variant="outline"
                size="icon"
            >
                <ChevronRightIcon className="h-4 w-4" />
            </Button>
        </div>
    );
};

export default SaleScreenshots;