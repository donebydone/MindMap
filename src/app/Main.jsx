import AppLayout from '@/components/Layout/AppLayout/AppLayout';
import MapPage from './(app)/map/page';
import RequestInstruction from '@/components/Request/RequestInstruction';
import Configuration from '@/components/Configuration/Configuration';

export default function Main() {
    return (
        <div className='w-[100%] px-[60px] py-[20px]'>
            <div className='border-[1px] border-current border-solid w-[100%]'>
                <AppLayout />
                <MapPage />
                <RequestInstruction />
                <Configuration />
            </div>
        </div>
    );
}
