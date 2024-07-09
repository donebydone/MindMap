// ContextMenu.tsx
import React from 'react';
import './ContextMenu.css'

interface ContextMenuProps {
    position: { x: number; y: number };
    onClose: () => void;
    onAddIdea: () => void;
    onAddContext: () => void;
    onAddContent: () => void;
    onDelete: () => void;
    onCommand1: () => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({
    position,
    onClose,
    onAddIdea,
    onAddContext,
    onAddContent,
    onDelete,
    onCommand1,
}) => {
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
            <li onClick={onCommand1}>Command1</li>
        </ul>
    );
};

export default ContextMenu;
