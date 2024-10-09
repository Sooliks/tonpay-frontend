import React from 'react';
import {useDrag, useDrop} from "react-dnd";
import {Simulate} from "react-dom/test-utils";
import drag = Simulate.drag;
import {Button} from "@/components/ui/button";
import {DeleteIcon, Trash2} from "lucide-react";

interface FormData {
    title: string;
    description: string;
    price: number;
    images: FileList;
}

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
}> = ({ file, index, moveImage, removeImage }) => {
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
        <div ref={ref} className="relative m-2">
            <img src={file.preview} alt="preview" className="w-32 h-32 object-cover" />
            <Button
                onClick={() => removeImage(index)}
                variant={'secondary'}
                className={'absolute top-0 right-0'}
            >
                <Trash2 />
            </Button>
        </div>
    );
};
export default ImagePreview;