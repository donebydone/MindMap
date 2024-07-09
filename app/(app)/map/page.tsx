import Map from '@/components/Map/Index';
import Link from 'next/link';

export default async function MapPage() {
	return (
		<div className='flex h-[700px]'>
			<div className='hidden md:block flex-1 min-h-[100%]'>
				<div className='w-full bg-white h-full'>
					<div className='border h-full'>
						<Map />
					</div>
				</div>
			</div>
		</div>
	);
}
