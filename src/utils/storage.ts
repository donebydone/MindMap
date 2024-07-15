'use client';
import { ReactFlowJsonObject } from 'reactflow';
import { initialNodes } from '@/data/defaultNodes';
import { initialEdges } from '@/data/defaultEdges';
import { checkState, Commands, Config, DataState, ImportedDataState, MapState, ReturnCommand, NodeElement, EdgeElement } from './types';
import { palettes } from '@/data/defaultPalettes';
import { defaultReturnCommand } from '@/stores/mapStore';

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
	window.dispatchEvent(new Event('projectChanged'));
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
		requestContent: "",
		configuration: data?.configuration || {
			openAIContent: '',
			defaultAssistantContent: '',
			defaultThreadIDContent: '',
			commands: [],
		},
	};
};

const formatMap = (obj: ReactFlowJsonObject): MapState => {
	console.log(obj);

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
	window.dispatchEvent(new Event('projectChanged'));
};

export const getConfigKey = (key: keyof Config): any => {
	const data = readFullContentArray();

	return data[0]?.config ? data[0].config[key] : null;
};

export const restoreProject = (dataState: ImportedDataState): void => {
	const data = readFullContentArray();
	data.unshift(dataState); // Pushing the loaded project to the first item
	localStorage.setItem(KEY, JSON.stringify(data));
	window.dispatchEvent(new Event('projectChanged'));
};

const obj = {
	openAI: 'mentalist-openai-key',
	model: 'mentalist-model',
	mode: 'mentalist-mode',
};

export const saveLocalConfigKey = (key: keyof typeof obj, value: string): void => {
	const keyToUse: string = obj[key];
	localStorage.setItem(keyToUse, value);
	window.dispatchEvent(new Event('projectChanged'));
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
		window.dispatchEvent(new Event('projectChanged'));
	}
};

export const saveRequest = (requestContent: string): void => {
	const data = readFullContentArray();
	if (data.length > 0) {
		data[0].requestContent = requestContent;
		localStorage.setItem(KEY, JSON.stringify(data));
		window.dispatchEvent(new Event('projectChanged'));
	}
};

export const saveOpenAI = (openAIContent: string): void => {
	const data = readFullContentArray();
	if (data.length > 0) {
		data[0].configuration.openAIContent = openAIContent;

		localStorage.setItem(KEY, JSON.stringify(data));
		window.dispatchEvent(new Event('projectChanged'));
	}
};

export const saveDefaultAssistant = (defaultAssistantContent: string): void => {
	const data = readFullContentArray();
	if (data.length > 0) {
		data[0].configuration.defaultAssistantContent = defaultAssistantContent;
		localStorage.setItem(KEY, JSON.stringify(data));
		window.dispatchEvent(new Event('projectChanged'));
	}
};

export const saveDefaultThreadID = (defaultThreadIDContent: string): void => {
	const data = readFullContentArray();
	if (data.length > 0) {
		data[0].configuration.defaultThreadIDContent = defaultThreadIDContent;
		localStorage.setItem(KEY, JSON.stringify(data));
		window.dispatchEvent(new Event('projectChanged'));
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
		let brother: checkState = {
			idea: false,
			context: false,
			content: false
		};

		let parent: checkState = {
			idea: false,
			context: false,
			content: false
		};

		let all: checkState = {
			idea: false,
			context: false,
			content: false
		};

		if (ideas.includes("Brother")) {
			brother.idea = true;
		}

		if (ideas.includes("Parent")) {
			parent.idea = true
			if (ideas.includes("Brother")) {
				all.idea = true
			}
		}




		if (context.includes("Brother")) {
			brother.context = true;
		}

		if (context.includes("Parent")) {
			parent.context = true
			if (context.includes("Brother")) {
				all.context = true
			}
		}




		if (content.includes("Brother")) {
			brother.content = true;
		}

		if (content.includes("Parent")) {
			parent.content = true
			if (content.includes("Brother")) {
				all.content = true
			}
		}


		const command: Commands = {
			commandName,
			commandShortcut,
			assistantId,
			threadId,
			select,
			parent: parent,
			brothers: brother,
			all: all,
			commands,
			commandKey: new Date().toString()
		};


		data[0].configuration.commands[id] = command;
		localStorage.setItem(KEY, JSON.stringify(data));
		window.dispatchEvent(new Event('projectChanged'));
	}
};

export const saveCommandReorder = (commands: Commands[]) => {
	const data = readFullContentArray();

	if (data) {
		data[0].configuration.commands = commands;

		localStorage.setItem(KEY, JSON.stringify(data));

		window.dispatchEvent(new Event('projectChanged'));
	}
}

export const getCommand = (id: number): any => {
	const mindMapData = localStorage.getItem(KEY);

	if (mindMapData) {
		const data = JSON.parse(mindMapData);

		let commandData: Commands;

		commandData = data[0].configuration.commands[id];

		let idea: string[] = ['Brother', 'Parent']
		let context: string[] = ['Brother', 'Parent']
		let content: string[] = ['Brother', 'Parent']

		if (commandData.brothers.idea === false) {
			idea.shift()
		}

		if (commandData.brothers.context === false) {
			context.shift()
		}

		if (commandData.brothers.content == false) {
			content.shift()
		}



		if (commandData.parent.idea === false) {
			idea.pop()
		}

		if (commandData.parent.context === false) {
			context.pop()
		}

		if (commandData.parent.content == false) {
			content.pop()
		}

		const command: ReturnCommand = {
			commandName: commandData.commandName,
			commandShortcut: commandData.commandShortcut,
			assistantId: commandData.assistantId,
			threadId: commandData.threadId,
			select: commandData.select,
			commands: commandData.commands,
			ideas: idea,
			context: context,
			content: content
		}


		return command;
	}
	return defaultReturnCommand
};

export const createNewCommand = (): void => {
	let brother = {
		idea: false,
		context: false,
		content: false
	};

	let parent = {
		idea: false,
		context: false,
		content: false
	};

	let all = {
		idea: false,
		context: false,
		content: false
	};

	const command: Commands = {
		commandName: '',
		commandShortcut: '',
		assistantId: '',
		threadId: '',
		select: '',
		parent: parent,
		brothers: brother,
		all: all,
		commands: '',
		commandKey: new Date().toString()
	};

	const data = readFullContentArray();
	if (data.length > 0) {
		if (!data[0].configuration.commands) {
			data[0].configuration.commands = [];
		}

		data[0].configuration.commands.push(command);
		localStorage.setItem(KEY, JSON.stringify(data));
		window.dispatchEvent(new Event('projectChanged'));
	}
};

export const deleteCommand = (id: number): void => {
	const data = readFullContentArray();
	if (data.length > 0) {
		data[0].configuration.commands.splice(id, 1);
		localStorage.setItem(KEY, JSON.stringify(data));
		window.dispatchEvent(new Event('projectChanged'));
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
		requestContent: "",
		configuration: {
			openAIContent: '',
			defaultAssistantContent: '',
			defaultThreadIDContent: '',
			commands: [],
		},
	};

	const data = readFullContentArray();
	data.unshift(newProject);
	localStorage.setItem(KEY, JSON.stringify(data));
	window.dispatchEvent(new Event('projectChanged'));
	return newProject;
};
