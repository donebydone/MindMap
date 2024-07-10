// components/NodePalette.tsx

import { getRequest } from '@/utils/storage';
import { message } from 'antd';
import React, { useEffect, useState, DragEvent } from 'react';

type Command = {
    commandName: string;
    commandShortcut: string;
    select: string;
};

const NodePalette: React.FC = () => {
    const [storedData, setStoredData] = useState<Command[]>([]);
    const [inputValue, setInputValue] = useState<string>('');

    const onDragStart = (event: DragEvent<HTMLDivElement>, nodeType: string, commandName: string, CommandType: string) => {
        console.log(CommandType);

        if (CommandType === "Node type") {
            message.error({
                content: "Select Command Type"
            });
            event.preventDefault(); // Prevent the drag event if CommandType is invalid
            return;
        }

        if (CommandType === "Edit Node") {
            message.error({
                content: "Select Command Type"
            });
            event.preventDefault(); // Prevent the drag event if CommandType is invalid
            return;
        }

        if (CommandType === "") {
            message.error({
                content: "Select Command Type"
            });
            event.preventDefault(); // Prevent the drag event if CommandType is invalid
            return;
        }

        const data = JSON.stringify({
            type: nodeType,
            commandName: commandName,
            CommandType: CommandType
        });
        event.dataTransfer.setData('application/reactflow', data);
        event.dataTransfer.effectAllowed = 'move';
    };

    useEffect(() => {
        const storeData = getRequest();

        if (storeData && storeData[0]?.configuration) {
            const commands = storeData[0].configuration.commands || [];
            setStoredData(commands);
        } else {
            setStoredData([]);
        }
    }, [storedData]);

    return (
        <div className="p-[15px] border-[1px] border-solid border-black bg-white flex flex-col gap-[15px] overflow-scroll max-h-[180px]">
            {storedData.map((item, index) => (
                <div
                    key={index}
                    className="w-full h-[50px] border-[1px] border-solid border-black flex items-center justify-between px-[10px]"
                    onDragStart={(event) => onDragStart(event, 'topicNode', item.commandName, item.select)}
                    draggable
                >
                    <h1>{item.commandName}</h1>
                    <h1>{item.commandShortcut}</h1>
                </div>
            ))}
        </div>
    );
};

export default NodePalette;
