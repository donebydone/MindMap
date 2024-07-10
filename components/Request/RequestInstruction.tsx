"use client";

import { Input } from "antd";
import { useEffect, useState } from "react";
import { getRequest, saveRequest } from "@/utils/storage";

const { TextArea } = Input;



export default function RequestInstruction() {
    const [request, setRequest] = useState('')
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        const storedRequest = getRequest();
        if (storedRequest) {
            if (storedRequest[0].configuration) {
                setRequest(storedRequest[0].configuration.requestContent);
            }
            else {
                setRequest('');
            }
        }
    }, []);

    useEffect(() => {
        console.log(isClient);
        if (isClient) {
            saveRequest(request); // Save the request to localStorage whenever it changes
        }
    }, [request, isClient])
    return (
        <div className="w-[100%] p-[20px]">
            <h1 className="pb-[10px] text-[24px]">
                Request Instruction
            </h1>
            <TextArea
                autoSize={{ minRows: 4, maxRows: 8 }}
                className="text-[18px]"
                value={request}
                onChange={(e) => {
                    setRequest(e.target.value);
                    setIsClient(true)
                }} />
        </div>
    );
}
