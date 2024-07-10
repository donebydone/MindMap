import React, { useEffect, useState } from 'react';
import './ContextMenu.css';
import { getRequest } from '@/utils/storage';

interface ContextMenuProps {
    position: { x: number; y: number };
    onClose: () => void;
    onAddIdea: () => void;
    onAddContext: () => void;
    onAddContent: () => void;
    onDelete: () => void;
    onAddCommand: (type: string, Name: string) => void;
}

interface Command {
    select: string;
    commandName: string;
}

const ContextMenu: React.FC<ContextMenuProps> = ({
    position,
    onClose,
    onAddIdea,
    onAddContext,
    onAddContent,
    onDelete,
    onAddCommand
}) => {
    const [commands, setCommands] = useState<Command[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const datas = await getRequest();

            if (datas[0].configuration.commands) {
                setCommands(datas[0].configuration.commands);
            }
        };

        fetchData();

        const handleStorageUpdate = () => {
            fetchData();
        };

        window.addEventListener('localStorageUpdate', handleStorageUpdate);

        return () => {
            window.removeEventListener('localStorageUpdate', handleStorageUpdate);
        };
    }, []);

    return (
        <ul
            className="context-menu"
            style={{ top: position.y - 170, left: position.x - 45 }}
            onClick={onClose}
        >
            <li onClick={onAddIdea}>Add empty Idea</li>
            <li onClick={onAddContext}>Add empty Context</li>
            <li onClick={onAddContent}>Add empty Content</li>
            <li onClick={onDelete}>Delete</li>
            {
                commands.map((command, index) => (
                    <li key={index} onClick={() => onAddCommand(command.select, command.commandName)}>Add {command.commandName}</li>
                ))
            }
        </ul>
    );
};

export default ContextMenu;
