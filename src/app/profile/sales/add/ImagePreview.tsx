import React from 'react';
import {useDrag, useDrop} from "react-dnd";
import {Button} from "@/components/ui/button";
import {Trash2} from "lucide-react";
import {cn} from "@/lib/utils";

// Интерфейс для файла с превью
export interface PreviewFile {
    file: File;
    preview: string;
}

// Интерфейс для перетаскивания файлов
interface DragItem {
    index: number;
    type: string;
}

const ImagePreview: React.FC<{
    file: PreviewFile;
    index: number;
    moveImage: (dragIndex: number, hoverIndex: number) => void;
    removeImage: (index: number) => void;
    small?: boolean;
}> = ({ file, index, moveImage, removeImage, small = false}) => {
    const ref = React.useRef<HTMLDivElement>(null);
    const [, drag] = useDrag({
        type: "image",
        item: { index },
    });
    const [, drop] = useDrop({
        accept: "image",
        hover: (draggedItem: DragItem) => {
            if (draggedItem.index !== index) {
                moveImage(draggedItem.index, index);
                draggedItem.index = index;
            }
        },
    });
    drag(drop(ref)); // Объединяем drag и drop через ref
    return (
        <div ref={ref} className={cn('relative', small ? 'mr-1' : 'm-2')}>
            <img src={file.preview} alt="preview" className={`${small ? 'w-4 h-4' : 'w-32 h-32'} object-cover`} />
            <Button
                onClick={() => removeImage(index)}
                variant={'secondary'}
                className={'absolute top-0 right-0' + small && 'h-2 w-2'}
                size={'icon'}
            >
                <Trash2 className={small ? 'h-2 w-2' : undefined} />
            </Button>
        </div>
    );
};
export default ImagePreview;