'use client';

import React, { useEffect, useState } from 'react';
import { Button, Input } from 'antd';
import Command from './Command';
import { createNewCommand, getRequest, saveDefaultAssistant, saveDefaultThreadID, saveOpenAI } from '@/utils/storage';

interface StoredRequest {
    configuration: {
        OpenAIContent: string;
        DefaultAssistantContent: string;
        DefaultThreadIDContent: string;
        Commands?: number[];
    };
}

export default function OpenAIInput() {
    const [components, setComponents] = useState<number[]>([]);
    const [openAI, setOpenAI] = useState<string>('');
    const [defaultAssistantID, setDefaultAssistantID] = useState<string>('');
    const [defaultThreadID, setDefaultThreadID] = useState<string>('');
    const [isClient, setIsClient] = useState<boolean>(false);

    const addComponent = () => {
        setComponents((prevComponents) => [...prevComponents, prevComponents.length]);
        createNewCommand();
    };

    const deleteComponent = (index: number) => {
        setComponents((prevComponents) => prevComponents.filter((_, i) => i !== index));
    };

    useEffect(() => {
        const storedRequest = getRequest() as StoredRequest[];

        console.log(storedRequest);

        if (storedRequest && storedRequest.length > 0) {
            const firstRequest = storedRequest[0];

            if (!firstRequest.configuration.Commands) {
                addComponent();
            }
            setOpenAI(firstRequest.configuration.OpenAIContent);
            setDefaultAssistantID(firstRequest.configuration.DefaultAssistantContent);
            setDefaultThreadID(firstRequest.configuration.DefaultThreadIDContent);
            setComponents(firstRequest.configuration.Commands || [0]);
        }
    }, []);

    useEffect(() => {
        if (isClient) {
            saveOpenAI(openAI);
            saveDefaultAssistant(defaultAssistantID);
            saveDefaultThreadID(defaultThreadID);
        }
    }, [openAI, defaultAssistantID, defaultThreadID, isClient]);

    return (
        <div className="w-full">
            <div className='flex flex-col gap-[20px]'>
                <div className="w-[400px] flex justify-between items-center">
                    <h1>OPENAI KEY</h1>
                    <Input
                        placeholder="Input"
                        className='w-[230px]'
                        value={openAI}
                        onChange={(e) => { setOpenAI(e.target.value); setIsClient(true); }}
                    />
                </div>
                <div className="w-[400px] flex justify-between items-center">
                    <h1>Default Assistant Id</h1>
                    <Input
                        placeholder="Input"
                        className='w-[230px]'
                        value={defaultAssistantID}
                        onChange={(e) => { setDefaultAssistantID(e.target.value); setIsClient(true); }}
                    />
                </div>
                <div className="w-[400px] flex justify-between items-center">
                    <h1>Default Thread Id</h1>
                    <Input
                        placeholder="Input"
                        className='w-[230px]'
                        value={defaultThreadID}
                        onChange={(e) => { setDefaultThreadID(e.target.value); setIsClient(true); }}
                    />
                </div>
                <div className='mt-[20px] flex flex-col gap-[20px]'>
                    {components.map((_, index) => (
                        <Command key={index} id={index} onDelete={deleteComponent} />
                    ))}
                </div>
                <div className='flex pt-[20px]'>
                    <Button onClick={addComponent} style={{ backgroundColor: "#ffffff", color: "#000000" }}>
                        Create a New Command
                    </Button>
                </div>
            </div>
        </div>
    );
}
