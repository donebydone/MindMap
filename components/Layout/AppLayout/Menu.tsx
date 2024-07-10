// components/Layout/AppLayout/Menu.tsx

'use client';

import { actionLoadFileFromDisk, actionSaveFileToDisk, actionSaveProjectFileToDisk, actionLoadProjectFileFromDisk } from '@/actions/export';
import { useToast } from '@/hooks/use-toast';
import useMapStore from '@/stores/mapStore';
import { getRequest, saveProjectName } from '@/utils/storage';
import { useState, useEffect, ChangeEvent } from 'react';
import { Input, Select, Button } from 'antd';

const { Option } = Select;

interface ProjectOption {
	projectName: string;
}

export function Menu() {
	const { toast } = useToast();
	const loadFromStorage = useMapStore((s) => s.loadFromStorage);
	const loadFreemind = useMapStore((s) => s.loadFreemind);
	const createInitialNode = useMapStore((s) => s.createInitialNode);

	const [projectName, setProjectName] = useState<string>('');
	const [options, setOptions] = useState<ProjectOption[]>([]);

	const fetchStoredOptions = () => {
		const storedOptions = getRequest();
		if (storedOptions) {
			setOptions(storedOptions);
		}
	};

	useEffect(() => {
		fetchStoredOptions();
	}, [projectName, options]);

	const onExport = async () => {
		try {
			await actionSaveFileToDisk();
		} catch (error: any) {
			if (error.name === 'AbortError') {
				console.log('Export aborted');
			} else {
				console.error('Export error:', error);
			}
		}
	};

	const onLoad = async () => {
		try {
			const loaded = await actionLoadFileFromDisk();
			if (!loaded) {
				return;
			}

			loadFreemind();

			window.dispatchEvent(new Event('projectChanged'));
		} catch (error: any) {
			if (error.name === 'AbortError') {
				console.log('Load aborted');
			} else {
				console.error('Load error:', error);
			}
		}
	};

	const projectExport = async () => {
		try {
			await actionSaveProjectFileToDisk();
		} catch (error: any) {
			if (error.name === 'AbortError') {
				console.log('Export aborted');
			} else {
				console.error('Export error:', error);
			}
		}
	};

	const projectLoad = async () => {
		try {
			const loaded = await actionLoadProjectFileFromDisk();
			if (!loaded) {
				return;
			}

			loadFromStorage();
			window.dispatchEvent(new Event('projectChanged'));
		} catch (error: any) {
			if (error.name === 'AbortError') {
				console.log('Load aborted');
			} else {
				console.error('Load error:', error);
			}
		}

	};

	const onSaveProjectName = () => {
		saveProjectName(projectName);
		toast({
			title: 'Project Saved',
			description: 'Your project name has been saved.',
		});
	};

	const onCreateNewProject = () => {
		createInitialNode(projectName, "rootNode");
		toast({
			title: 'New Project Created',
			description: `Project ${projectName} has been created and saved.`,
		});
		setProjectName('');
		window.dispatchEvent(new Event('projectChanged'));
	};

	const handleChange = (value: string) => {
		let storedOptions = localStorage.getItem('mentalist-data');
		if (storedOptions) {
			const parsedOptions = JSON.parse(storedOptions) as ProjectOption[];
			const index = parsedOptions.findIndex(item => item.projectName === value);

			if (index !== -1) {
				const newArray = [...parsedOptions];
				const [item] = newArray.splice(index, 1);
				newArray.unshift(item);
				localStorage.setItem('mentalist-data', JSON.stringify(newArray));
			}
		}
		loadFromStorage();

		// Dispatch a custom event
		window.dispatchEvent(new Event('projectChanged'));
	};

	const handleDelete = () => {
		let storedOptions = localStorage.getItem('mentalist-data');
		if (storedOptions) {
			const temp = JSON.parse(storedOptions) as ProjectOption[];
			temp.shift();
			localStorage.setItem('mentalist-data', JSON.stringify(temp));
			setProjectName('');
			window.dispatchEvent(new Event('projectChanged'));
		}
	};

	return (
		<div className='flex justify-between items-center w-full'>
			<div className='flex flex-col gap-2.5'>
				<div className='flex gap-3.75 items-center'>
					<Select
						defaultValue="Select MindMap"
						style={{ width: 300, height: 35 }}
						onChange={handleChange}
					>
						{options.map((value, index) => (
							<Option key={index} value={value.projectName}>
								{value.projectName}
							</Option>
						))}
					</Select>
					<Button style={{ backgroundColor: "#03a9f4", color: "#fff" }} onClick={onCreateNewProject}>
						Create New
					</Button>
				</div>
				<div>
					<Input
						placeholder="MindMap name"
						value={projectName}
						onChange={(e: ChangeEvent<HTMLInputElement>) => setProjectName(e.target.value)}
					/>
				</div>
			</div>
			<div className='flex gap-[10px] items-center'>
				<Button style={{ backgroundColor: "#4096ff", color: "#fff", width: 120 }} onClick={onSaveProjectName}>
					Save
				</Button>
				<Button style={{ backgroundColor: "grey", color: "#fff", width: 120 }} onClick={handleDelete}>
					Delete
				</Button>
			</div>
			<div className='flex flex-col gap-[10px]'>
				<div className='flex gap-5'>
					<Button type='primary' style={{ width: 200, backgroundColor: "#1677ff" }} onClick={onLoad}>
						Load Freemind
					</Button>
					<Button type='primary' style={{ width: 200, backgroundColor: "#1677ff" }} onClick={onExport}>
						Download Freemind
					</Button>
				</div>
				<div className='flex gap-5'>
					<Button type='primary' style={{ width: 200, backgroundColor: "#1677ff" }} onClick={projectLoad}>
						Load Project
					</Button>
					<Button type='primary' style={{ width: 200, backgroundColor: "#1677ff" }} onClick={projectExport}>
						Download Project
					</Button>
				</div>
			</div>
		</div>
	);
}
