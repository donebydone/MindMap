import IconComponent from '@/components/ui/Icon';
import Link from 'next/link';
import { Menu } from './Menu';

export default function Top() {
	return (
		<div className='w-[100%] px-[40px] py-[20px]'>
			<Menu />
		</div>
	);
}
