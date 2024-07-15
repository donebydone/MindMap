'use client'
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import OpenAIInput from './OpenAiInput';

export default function Configuration() {
    return (
        <div className="w-full px-[15px] pt-[15px] pb-[100px]">
            <div className="w-full h-full border-[1px] border-solid border-black flex flex-col">
                <div className="w-full h-[40px] border-b-[1px] border-solid border-black flex justify-between items-center px-[10px]">
                    <div>
                        <h1>Configuration</h1>
                    </div>
                    <div className='flex w-[50px] justify-between items-center'>
                        <div>
                            <PlusCircleOutlined className='text-[20px]' />
                        </div>
                        <div>
                            <MinusCircleOutlined className='text-[20px]' />
                        </div>
                    </div>
                </div>
                <div className='w-[full] p-[30px]'>
                    <OpenAIInput />
                </div>
            </div>
        </div>
    )
}
