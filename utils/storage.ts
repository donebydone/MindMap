'use client';
import { ReactFlowJsonObject } from 'reactflow';
import { initialNodes } from '@/data/defaultNodes';
import { initialEdges } from '@/data/defaultEdges';
import { Config, DataState, ImportedDataState, MapState } from './types';
import { palettes } from '@/data/defaultPalettes';

const KEY = 'mentalist-data';
const TYPE = 'mentalist';
const VERSION = 1;

export const saveMap = (obj: ReactFlowJsonObject): void => {
	saveProjectKey('map', formatMap(obj) as MapState);
};

export const saveProjectKey = (key: keyof DataState, value: any): void => {
	const data = readFullContentArray();

	if (data.length === 0) {
		data.push(createNewProject('Default Project', 'defaultType'));
	}

	data[0][key] = value;

	localStorage.setItem(KEY, JSON.stringify(data));
};

export const loadMapData = (): ReactFlowJsonObject => {
	const data = typeof window !== 'undefined' && localStorage.getItem(KEY);

	if (!data) {
		return {
			nodes: initialNodes,
			edges: initialEdges,
			viewport: {
				x: 0,
				y: 0,
				zoom: 1,
			},
		};
	}

	let jsonArray;
	try {
		jsonArray = JSON.parse(data);
	} catch (error) {
		return {
			nodes: initialNodes,
			edges: initialEdges,
			viewport: {
				x: 0,
				y: 0,
				zoom: 1,
			},
		} as ReactFlowJsonObject;
	}

	if (!Array.isArray(jsonArray) || jsonArray.length === 0 || !jsonArray[0].map) {
		return {
			nodes: initialNodes,
			edges: initialEdges,
			viewport: {
				x: 0,
				y: 0,
				zoom: 1,
			},
		} as ReactFlowJsonObject;
	}

	const jsonObj = jsonArray[0];

	return {
		nodes: jsonObj.map.nodes,
		edges: jsonObj.map.edges,
		viewport: jsonObj.map.viewport,
	} as ReactFlowJsonObject;
};

export const readFullContentArray = (): DataState[] => {
	const data = typeof window !== 'undefined' && localStorage.getItem(KEY);

	if (!data) {
		return [];
	}

	let jsonArray;
	try {
		jsonArray = JSON.parse(data);
	} catch (error) {
		return [];
	}

	if (!Array.isArray(jsonArray)) {
		return [];
	}

	return jsonArray.map(formatObject);
};

const formatObject = (data: any): DataState => {
	return {
		type: data?.type || TYPE,
		version: data?.version || VERSION,
		map: data?.map || {
			nodes: [],
			edges: [],
			viewport: {
				x: 0,
				y: 0,
				zoom: 1,
			},
		},
		config: data?.config || {
			palette: palettes[0].id,
		},
		projectName: data?.projectName || '',
		configuration: data?.configuration || {
			openAIContent: '',
			defaultAssistantContent: '',
			defaultThreadIDContent: '',
			commands: [],
		},
	};
};

const formatMap = (obj: ReactFlowJsonObject): MapState => {
	return {
		nodes: obj.nodes,
		edges: obj.edges,
		viewport: obj.viewport,
	};
};

export const updateConfig = (key: string, value: any): void => {
	const data = readFullContentArray();

	if (data.length === 0) {
		data.push(createNewProject('Default Project', 'defaultType'));
	}

	data.forEach((project) => {
		project.config = {
			...project.config,
			[key]: value,
		};
	});

	localStorage.setItem(KEY, JSON.stringify(data));
};

export const getConfigKey = (key: keyof Config): any => {
	const data = readFullContentArray();

	return data[0]?.config ? data[0].config[key] : null;
};

export const restoreProject = (dataState: ImportedDataState): void => {
	const data = readFullContentArray();
	data.unshift(dataState); // Pushing the loaded project to the first item
	localStorage.setItem(KEY, JSON.stringify(data));
};

const obj = {
	openAI: 'mentalist-openai-key',
	model: 'mentalist-model',
	mode: 'mentalist-mode',
};

export const saveLocalConfigKey = (key: keyof typeof obj, value: string): void => {
	const keyToUse: string = obj[key];
	localStorage.setItem(keyToUse, value);
};

export const getLocalConfigKey = (key: keyof typeof obj): string | null => {
	const keyToUse: string = obj[key];
	return localStorage.getItem(keyToUse);
};

export const saveProjectName = (name: string): void => {
	const data = readFullContentArray();
	if (data.length > 0) {
		data[0].projectName = name;
		localStorage.setItem(KEY, JSON.stringify(data));
	}
};

export const saveRequest = (requestContent: string): void => {
	const data = readFullContentArray();
	if (data.length > 0) {
		if (!data[0].configuration) {
			data[0].configuration = {};
		}
		data[0].configuration.requestContent = requestContent;
		localStorage.setItem(KEY, JSON.stringify(data));
	}
};

export const saveOpenAI = (openAIContent: string): void => {
	const data = readFullContentArray();
	if (data.length > 0) {
		if (!data[0].configuration) {
			data[0].configuration = {};
		}
		data[0].configuration.openAIContent = openAIContent;
		localStorage.setItem(KEY, JSON.stringify(data));
	}
};

export const saveDefaultAssistant = (defaultAssistantContent: string): void => {
	const data = readFullContentArray();
	if (data.length > 0) {
		if (!data[0].configuration) {
			data[0].configuration = {};
		}
		data[0].configuration.defaultAssistantContent = defaultAssistantContent;
		localStorage.setItem(KEY, JSON.stringify(data));
	}
};

export const saveDefaultThreadID = (defaultThreadIDContent: string): void => {
	const data = readFullContentArray();
	if (data.length > 0) {
		if (!data[0].configuration) {
			data[0].configuration = {};
		}
		data[0].configuration.defaultThreadIDContent = defaultThreadIDContent;
		localStorage.setItem(KEY, JSON.stringify(data));
	}
};

export const saveCommands = (
	commandName: string,
	commandShortcut: string,
	assistantId: string,
	threadId: string,
	select: string,
	ideas: Array<any>,
	context: Array<any>,
	content: Array<any>,
	commands: string,
	id: number
): void => {
	const data = readFullContentArray();
	if (data.length > 0) {
		if (!data[0].configuration) {
			data[0].configuration = {};
		}

		const command = {
			commandName,
			commandShortcut,
			assistantId,
			threadId,
			select,
			ideas: ideas,
			context: context,
			content: content,
			commands,
		};

		data[0].configuration.commands[id] = command;
		localStorage.setItem(KEY, JSON.stringify(data));
	}
};

export const getCommand = (id: number): any => {
	const data = localStorage.getItem('mentalist-data');
	let resultData;
	if (data) {
		resultData = JSON.parse(data);
	}
	return resultData ? resultData[0].configuration.commands[id] : null;
};

export const createNewCommand = (): void => {
	const command = {
		commandName: '',
		commandShortcut: '',
		assistantId: '',
		threadId: '',
		select: '',
		ideas: ['Parent', 'Brother'],
		context: ['Parent', 'Brother'],
		content: ['Parent', 'Brother'],
		commands: '',
	};

	const data = readFullContentArray();
	if (data.length > 0) {
		if (!data[0].configuration) {
			data[0].configuration = {};
		}

		if (!data[0].configuration.commands) {
			data[0].configuration.commands = [];
		}

		data[0].configuration.commands.push(command);
		localStorage.setItem(KEY, JSON.stringify(data));
	}
};

export const deleteCommand = (id: number): void => {
	const data = readFullContentArray();
	if (data.length > 0) {
		data[0].configuration.commands.splice(id, 1);
		localStorage.setItem(KEY, JSON.stringify(data));
	}
};

export const getRequest = (): any => {
	const data = localStorage.getItem('mentalist-data');
	return data ? JSON.parse(data) : null;
};

export const createNewProject = (projectName: string, type: string): DataState => {
	const newProject = {
		type: TYPE,
		version: VERSION,
		map: {
			nodes: [{
				id: 'root',
				data: { text: 'Root Node', type: '1' },
				position: { x: 0, y: 0 },
				type: type,
				style: {
					backgroundColor: '#fff',
					borderColor: '#0b132b',
					borderRadius: '10px',
					borderStyle: 'solid',
					borderWidth: 1,
					color: '#1E293B',
				},
			}],
			edges: [],
			viewport: {
				x: 0,
				y: 0,
				zoom: 1,
			},
		},
		config: {
			palette: palettes[0].id,
		},
		projectName,
		configuration: {
			requestContent: '',
			openAIContent: '',
			defaultAssistantContent: '',
			defaultThreadIDContent: '',
			commands: [],
		},
	};

	const data = readFullContentArray();
	data.unshift(newProject);
	localStorage.setItem(KEY, JSON.stringify(data));
	return newProject;
};
