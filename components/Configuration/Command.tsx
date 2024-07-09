'use client';

import React, { useEffect, useState, DragEvent } from 'react';
import { Button, Input, Select, Checkbox } from 'antd';
import type { CheckboxProps } from 'antd';
import { deleteCommand, getCommand, saveCommands } from '@/utils/storage';
import { FullscreenOutlined } from '@ant-design/icons';

const { Option } = Select;
const { TextArea } = Input;

const Ideas = ['Brother', 'Parent'];
const defaultIdeasCheckedList = ['Brother', 'Parent'];
const Context = ['Brother', 'Parent'];
const defaultContextCheckedList = ['Brother', 'Parent'];
const Content = ['Brother', 'Parent'];
const defaultContentCheckedList = ['Brother', 'Parent'];

interface CommandProps {
    id: number;
    onDelete: (id: number) => void;
}

export default function Command({ id, onDelete }: CommandProps) {
    const [showModal, setShowModal] = useState(false);
    const [selectedValue, setSelectedValue] = useState('');

    const [isClient, setIsClient] = useState(false);

    const [checkedIdeasList, setCheckedIdeasList] = useState<string[]>(defaultIdeasCheckedList);
    const [checkedContextList, setCheckedContextList] = useState<string[]>(defaultContextCheckedList);
    const [checkedContentList, setCheckedContentList] = useState<string[]>(defaultContentCheckedList);

    const [CommandName, setCommandName] = useState('');
    const [CommandShortcut, setCommandShortcut] = useState('');
    const [AssistantId, setAssistantId] = useState('');
    const [ThreadId, setThreadId] = useState('');
    const [CommandsContent, setCommandsContent] = useState('');

    const checkIdeasAll = Ideas.length === checkedIdeasList.length;
    const indeterminateIdeas = checkedIdeasList.length > 0 && checkedIdeasList.length < Ideas.length;
    const checkContextAll = Context.length === checkedContextList.length;
    const indeterminateContext = checkedContextList.length > 0 && checkedContextList.length < Context.length;
    const checkContentAll = Content.length === checkedContentList.length;
    const indeterminateContent = checkedContentList.length > 0 && checkedContentList.length < Content.length;

    const onCheckIdeasAllChange: CheckboxProps['onChange'] = (e) => {
        setCheckedIdeasList(e.target.checked ? Ideas : []);
    };

    const onCheckContextAllChange: CheckboxProps['onChange'] = (e) => {
        setCheckedContextList(e.target.checked ? Context : []);
    };

    const onCheckContentAllChange: CheckboxProps['onChange'] = (e) => {
        setCheckedContentList(e.target.checked ? Content : []);
    };

    const handleChange = (value: string) => {
        setSelectedValue(value);
        setIsClient(true);
    };

    useEffect(() => {
        const storedRequest = getCommand(id);
        if (storedRequest) {
            setCheckedIdeasList(storedRequest.ideas || defaultIdeasCheckedList);
            setCheckedContextList(storedRequest.context || defaultContextCheckedList);
            setCheckedContentList(storedRequest.content || defaultContentCheckedList);
            setCommandName(storedRequest.CommandName || '');
            setCommandShortcut(storedRequest.CommandShortcut || '');
            setAssistantId(storedRequest.AssistantId || '');
            setThreadId(storedRequest.ThreadId || '');
            setCommandsContent(storedRequest.CommandsContent || '');
        }
    }, [id]);

    const onDragStart = (event: DragEvent, nodeType: string, CommandName: string) => {
        const data = JSON.stringify({
            type: nodeType,
            CommandName: CommandName
        });
        event.dataTransfer.setData('application/reactflow', data);
        event.dataTransfer.effectAllowed = 'move';
    };

    useEffect(() => {
        if (isClient) {
            saveCommands(CommandName, CommandShortcut, AssistantId, ThreadId, selectedValue, checkedIdeasList, checkedContextList, checkedContentList, CommandsContent, id);
        }
    }, [CommandName, CommandShortcut, AssistantId, ThreadId, CommandsContent, selectedValue, checkedIdeasList, checkedContextList, checkedContentList, id, isClient]);

    return (
        <div
            className='w-full border-[1px] border-solid border-black px-[70px] py-[25px] flex flex-col gap-[30px] bg-[#f5f5f5] relative'
            onDragStart={(event) => onDragStart(event, 'topicNode', CommandName)}
            draggable
        >
            <div className='absolute right-[10px] top-[10px]'>
                <FullscreenOutlined className='text-[20px]' />
            </div>
            <div className='w-full flex justify-between gap-[80px]'>
                <div className='w-[500px] flex justify-between'>
                    <div className='flex flex-col justify-between h-[250px] w-full'>
                        <div className="w-[full] flex justify-between items-center">
                            <h1>Command Name</h1>
                            <Input placeholder="Input" className='w-[300px]' value={CommandName} onChange={(e) => { setCommandName(e.target.value); setIsClient(true); }} />
                        </div>
                        <div className="w-[full] flex justify-between items-center">
                            <h1>Command Shortcut</h1>
                            <Input placeholder="Input" className='w-[300px]' value={CommandShortcut} onChange={(e) => { setCommandShortcut(e.target.value); setIsClient(true); }} />
                        </div>
                        <div className="w-[full] flex justify-between items-center">
                            <h1>Assistant Id</h1>
                            <Input placeholder="Input" className='w-[300px]' value={AssistantId} onChange={(e) => { setAssistantId(e.target.value); setIsClient(true); }} />
                        </div>
                        <div className="w-[full] flex justify-between items-center">
                            <h1>Thread Id</h1>
                            <Input placeholder="Input" className='w-[300px]' value={ThreadId} onChange={(e) => { setThreadId(e.target.value); setIsClient(true); }} />
                        </div>
                    </div>
                </div>
                <div className='grow h-[250px] flex flex-col gap-[20px]'>
                    <Select
                        className='w-[650px]'
                        onChange={(value) => { handleChange(value); setIsClient(true); }}
                        value={selectedValue}
                        defaultValue={selectedValue}
                    >
                        <Option value="Node type">Node type</Option>
                        <Option value="Create Idea">Create Idea</Option>
                        <Option value="Create Context">Create Context</Option>
                        <Option value="Create Content">Create Content</Option>
                        <Option value="Edit Node">Edit Node</Option>
                    </Select>
                    <div className='w-[650px] grow border-[#d9d9d9] border-black border-[1px] rounded-[5px] flex flex-col justify-between p-[30px]'>
                        <div className='w-full flex'>
                            <div className='w-[31%] flex items-center justify-center'></div>
                            <div className='w-[23%] flex items-center justify-center'><h1>Brother</h1></div>
                            <div className='w-[23%] flex items-center justify-center'><h1>Parent</h1></div>
                            <div className='w-[23%] flex items-center justify-center'><h1>All</h1></div>
                        </div>
                        <div className='w-full flex'>
                            <div className='w-[31%] flex items-center justify-center'><h1>Ideas</h1></div>
                            {Ideas.map(option => (
                                <Checkbox
                                    key={option}
                                    value={option}
                                    checked={checkedIdeasList.includes(option)}
                                    onChange={() => {
                                        const newList = checkedIdeasList.includes(option)
                                            ? checkedIdeasList.filter(item => item !== option)
                                            : [...checkedIdeasList, option];
                                        setCheckedIdeasList(newList);
                                        setIsClient(true);
                                    }}
                                    className="w-[23%] flex justify-center items-center"
                                />
                            ))}
                            <Checkbox indeterminate={indeterminateIdeas} onChange={onCheckIdeasAllChange} checked={checkIdeasAll} className="w-[23%] flex justify-center items-center" />
                        </div>
                        <div className='w-full flex'>
                            <div className='w-[31%] flex items-center justify-center'><h1>Context</h1></div>
                            {Context.map(option => (
                                <Checkbox
                                    key={option}
                                    value={option}
                                    checked={checkedContextList.includes(option)}
                                    onChange={() => {
                                        const newList = checkedContextList.includes(option)
                                            ? checkedContextList.filter(item => item !== option)
                                            : [...checkedContextList, option];
                                        setCheckedContextList(newList);
                                        setIsClient(true);
                                    }}
                                    className="w-[23%] flex justify-center items-center"
                                />
                            ))}
                            <Checkbox indeterminate={indeterminateContext} onChange={onCheckContextAllChange} checked={checkContextAll} className="w-[23%] flex justify-center items-center" />
                        </div>
                        <div className='w-full flex'>
                            <div className='w-[31%] flex items-center justify-center'><h1>Content</h1></div>
                            {Content.map(option => (
                                <Checkbox
                                    key={option}
                                    value={option}
                                    checked={checkedContentList.includes(option)}
                                    onChange={() => {
                                        const newList = checkedContentList.includes(option)
                                            ? checkedContentList.filter(item => item !== option)
                                            : [...checkedContentList, option];
                                        setCheckedContentList(newList);
                                        setIsClient(true);
                                    }}
                                    className="w-[23%] flex justify-center items-center"
                                />
                            ))}
                            <Checkbox indeterminate={indeterminateContent} onChange={onCheckContentAllChange} checked={checkContentAll} className="w-[23%] flex justify-center items-center" />
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full flex flex-col gap-[20px]'>
                <h1>Commands</h1>
                <TextArea
                    autoSize={{ minRows: 6, maxRows: 10 }}
                    className="w-full text-[15px] whitespace-pre-line"
                    onChange={(e) => { setCommandsContent(e.target.value); setIsClient(true); }}
                    value={CommandsContent}
                />
            </div>
            <div className='w-full flex justify-end relative'>
                {showModal && (
                    <div className='absolute w-[220px] h-[150px] bg-[#ffffff] bottom-[20px] right-[50px] z-10 border-[1px] border-black border-solid rounded-[3px] px-[20px] py-[22px] flex flex-col justify-between'>
                        <h1 className='text-[18px]'>You are going to<br />Delete a Command</h1>
                        <div className='flex justify-between items-center'>
                            <Button style={{ backgroundColor: "white", color: 'black', border: "1px solid #000000", width: "74px" }} onClick={() => { onDelete(id); deleteCommand(id) }}>OK</Button>
                            <Button style={{ backgroundColor: "#212121", color: "#ffffff", width: "74px" }} onClick={() => setShowModal(false)}>Cancel</Button>
                        </div>
                    </div>
                )}
                <Button style={{ backgroundColor: "#212121", color: "#ffffff" }} onClick={() => { setShowModal(true) }}>Delete</Button>
            </div>
        </div>
    );
}
