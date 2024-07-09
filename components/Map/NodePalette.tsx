// components/NodePalette.tsx

import { getRequest } from '@/utils/storage';
import React, { useEffect, useState, DragEvent } from 'react';

type Command = {
    CommandName: string;
    CommandShortcut: string;
};

const NodePalette: React.FC = () => {
    const [StoredData, setStoredData] = useState<Command[]>([]);

    const onDragStart = (event: DragEvent<HTMLDivElement>, nodeType: string, CommandName: string) => {
        const data = JSON.stringify({
            type: nodeType,
            CommandName: CommandName
        });
        event.dataTransfer.setData('application/reactflow', data);
        event.dataTransfer.effectAllowed = 'move';
    };

    useEffect(() => {
        const storeData = getRequest();

        if (storeData && storeData[0].configuration) {
            const commands = storeData[0].configuration.Commands || [];
            setStoredData(commands);
        } else {
            setStoredData([]);
        }
    }, [StoredData]);

    return (
        <div className="p-[15px] border-[1px] border-solid border-black bg-white">
            {StoredData.map((item, index) => (
                <div
                    key={index}
                    className="w-full h-[50px] border-[1px] border-solid border-black flex items-center justify-between px-[10px]"
                    onDragStart={(event) => onDragStart(event, 'topicNode', item.CommandName)}
                    draggable
                >
                    <h1>{item.CommandName}</h1>
                    <h1>{item.CommandShortcut}</h1>
                </div>
            ))}
        </div>
    );
};

export default NodePalette;
