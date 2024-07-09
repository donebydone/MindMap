import Top from './Top';

interface AppLayoutProps {
	children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
	return (
		<div>
			<div className='w-[100%] h-[40px] border-b-[1px] border-b-current border-b-solid relative flex justify-center items-center'>
				<div className='absolute h-[100%] w-[90px] flex justify-between items-center left-0 top-0 pl-[15px]'>
					<div className='h-[15px] w-[15px] rounded-[10px] border-[0.75px] border-current border-solid'>
					</div>
					<div className='h-[15px] w-[15px] rounded-[10px] border-[0.75px] border-current border-solid'>
					</div>
					<div className='h-[15px] w-[15px] rounded-[10px] border-[0.75px] border-current border-solid'>
					</div>
				</div>
				<h1>MindMap Tool</h1>
			</div>
			<Top />
			{/* <div>{children}</div> */}
		</div>
	);
}
