// 'use client';
// import { ReactFlowJsonObject } from 'reactflow';
// import { initialNodes } from '@/data/defaultNodes';
// import { initialEdges } from '@/data/defaultEdges';
// import { Config, DataState, ImportedDataState, MapState } from './types';
// import { palettes } from '@/data/defaultPalettes';

// const KEY = 'mentalist-data';
// const TYPE = 'mentalist';
// const VERSION = 1;

// export const saveMap = (obj: ReactFlowJsonObject) => {
// 	saveProjectKey('map', formatMap(obj) as MapState);
// };

// export const saveProjectKey = (key: keyof DataState, value: any) => {
// 	const data = readFullContentObj();

// 	data[key] = value;

// 	localStorage.setItem(KEY, JSON.stringify(data));
// };

// export const loadMapData = (): ReactFlowJsonObject => {
// 	const data = typeof window !== 'undefined' && localStorage.getItem(KEY);

// 	if (!data) {
// 		return {
// 			nodes: initialNodes,
// 			edges: initialEdges,
// 			viewport: {
// 				x: 0,
// 				y: 0,
// 				zoom: 1,
// 			},
// 		};
// 	}

// 	const jsonObj = JSON.parse(data);

// 	if (Array.isArray(jsonObj) || !Object.hasOwn(jsonObj, 'type')) {
// 		// old version
// 		return jsonObj[0] as ReactFlowJsonObject;
// 	}

// 	return jsonObj.map as ReactFlowJsonObject;
// };

// export const readFullContentObj = (): DataState => {
// 	const data = typeof window !== 'undefined' && localStorage.getItem(KEY);

// 	const jsonData = JSON.parse(data as any);

// 	return formatObject(jsonData);
// };

// const formatObject = (data: any) => {
// 	return {
// 		type: data?.type || TYPE,
// 		version: data?.version || VERSION,
// 		map: data?.map || {
// 			nodes: [],
// 			edges: [],
// 			viewport: {
// 				x: 0,
// 				y: 0,
// 				zoom: 1,
// 			},
// 		},
// 		config: data?.config
// 			? data?.config
// 			: {
// 				palette: palettes[0].id,
// 			},
// 	};
// };

// const formatMap = (obj: ReactFlowJsonObject) => {
// 	return {
// 		nodes: obj.nodes,
// 		edges: obj.edges,
// 		viewport: obj.viewport,
// 	};
// };

// export const updateConfig = (key: string, value: any) => {
// 	const data = readFullContentObj();

// 	data.config = {
// 		...data.config,
// 		[key]: value,
// 	};

// 	saveProjectKey('config', data.config);
// };

// export const getConfigKey = (key: keyof Config): any => {
// 	const data = readFullContentObj();

// 	return data.config ? data.config[key] : null;
// };

// export const restoreProject = (dataState: ImportedDataState) => {
// 	localStorage.setItem(KEY, JSON.stringify(dataState));
// };

// const obj = {
// 	openAI: 'mentalist-openai-key',
// 	model: 'mentalist-model',
// 	mode: 'mentalist-mode',
// };

// export const saveLocalConfigKey = (key: keyof typeof obj, value: string): void => {
// 	const keyToUse: string = obj[key];

// 	localStorage.setItem(keyToUse, value);
// };

// export const getLocalConfigKey = (key: keyof typeof obj) => {
// 	const keyToUse: string = obj[key];

// 	return localStorage.getItem(keyToUse);
// };


// 'use client';
// import { ReactFlowJsonObject } from 'reactflow';
// import { initialNodes } from '@/data/defaultNodes';
// import { initialEdges } from '@/data/defaultEdges';
// import { Config, DataState, ImportedDataState, MapState } from './types';
// import { palettes } from '@/data/defaultPalettes';

// const KEY = 'mentalist-data';
// const TYPE = 'mentalist';
// const VERSION = 1;

// export const saveMap = (obj: ReactFlowJsonObject) => {
// 	saveProjectKey('map', formatMap(obj) as MapState);
// };

// export const saveProjectKey = (key: keyof DataState, value: any) => {
// 	const data = readFullContentObj();

// 	data[key] = value;

// 	localStorage.setItem(KEY, JSON.stringify(data));
// };

// export const loadMapData = (): ReactFlowJsonObject => {
// 	const data = typeof window !== 'undefined' && localStorage.getItem(KEY);

// 	if (!data) {
// 		return {
// 			nodes: initialNodes,
// 			edges: initialEdges,
// 			viewport: {
// 				x: 0,
// 				y: 0,
// 				zoom: 1,
// 			},
// 		};
// 	}

// 	const jsonObj = JSON.parse(data);

// 	if (Array.isArray(jsonObj) || !Object.hasOwn(jsonObj, 'type')) {
// 		// old version
// 		return jsonObj[0] as ReactFlowJsonObject;
// 	}

// 	return jsonObj.map as ReactFlowJsonObject;
// };

// export const readFullContentObj = (): DataState => {
// 	const data = typeof window !== 'undefined' && localStorage.getItem(KEY);

// 	const jsonData = JSON.parse(data as any);

// 	return formatObject(jsonData);
// };

// const formatObject = (data: any) => {
// 	return {
// 		type: data?.type || TYPE,
// 		version: data?.version || VERSION,
// 		map: data?.map || {
// 			nodes: [],
// 			edges: [],
// 			viewport: {
// 				x: 0,
// 				y: 0,
// 				zoom: 1,
// 			},
// 		},
// 		config: data?.config
// 			? data?.config
// 			: {
// 				palette: palettes[0].id,
// 			},
// 		projectName: data?.projectName || '', // Add projectName to the data structure
// 	};
// };

// const formatMap = (obj: ReactFlowJsonObject) => {
// 	return {
// 		nodes: obj.nodes,
// 		edges: obj.edges,
// 		viewport: obj.viewport,
// 	};
// };

// export const updateConfig = (key: string, value: any) => {
// 	const data = readFullContentObj();

// 	data.config = {
// 		...data.config,
// 		[key]: value,
// 	};

// 	saveProjectKey('config', data.config);
// };

// export const getConfigKey = (key: keyof Config): any => {
// 	const data = readFullContentObj();

// 	return data.config ? data.config[key] : null;
// };

// export const restoreProject = (dataState: ImportedDataState) => {
// 	localStorage.setItem(KEY, JSON.stringify(dataState));
// };

// const obj = {
// 	openAI: 'mentalist-openai-key',
// 	model: 'mentalist-model',
// 	mode: 'mentalist-mode',
// };

// export const saveLocalConfigKey = (key: keyof typeof obj, value: string): void => {
// 	const keyToUse: string = obj[key];

// 	localStorage.setItem(keyToUse, value);
// };

// export const getLocalConfigKey = (key: keyof typeof obj) => {
// 	const keyToUse: string = obj[key];

// 	return localStorage.getItem(keyToUse);
// };

// // New function to save the project name
// export const saveProjectName = (name: string) => {
// 	const data = readFullContentObj();
// 	data.projectName = name;
// 	localStorage.setItem(KEY, JSON.stringify(data));
// };


// 'use client';
// import { ReactFlowJsonObject } from 'reactflow';
// import { initialNodes, nodeTypes } from '@/data/defaultNodes';
// import { initialEdges } from '@/data/defaultEdges';
// import { Config, DataState, ImportedDataState, MapState } from './types';
// import { palettes } from '@/data/defaultPalettes';

// const KEY = 'mentalist-data';
// const TYPE = 'mentalist';
// const VERSION = 1;

// export const saveMap = (obj: ReactFlowJsonObject) => {
// 	saveProjectKey('map', formatMap(obj) as MapState);
// };

// export const saveProjectKey = (key: keyof DataState, value: any) => {
// 	const data = readFullContentArray();

// 	if (data.length === 0) {
// 		// Initialize with a default project if no projects exist
// 		data.push(createNewProject('Default Project'));
// 	}

// 	data[0][key] = value; // Assume the first project is the current one

// 	localStorage.setItem(KEY, JSON.stringify(data));
// };

// export const loadMapData = (): ReactFlowJsonObject => {
// 	const data = typeof window !== 'undefined' && localStorage.getItem(KEY);

// 	if (!data) {
// 		return {
// 			nodes: initialNodes,
// 			edges: initialEdges,
// 			viewport: {
// 				x: 0,
// 				y: 0,
// 				zoom: 1,
// 			},
// 		};
// 	}

// 	let jsonArray;
// 	try {
// 		jsonArray = JSON.parse(data);
// 	} catch (error) {
// 		// Fallback to initial values if parsing fails
// 		return {
// 			nodes: initialNodes,
// 			edges: initialEdges,
// 			viewport: {
// 				x: 0,
// 				y: 0,
// 				zoom: 1,
// 			},
// 		} as ReactFlowJsonObject;
// 	}

// 	if (!Array.isArray(jsonArray) || jsonArray.length === 0 || !jsonArray[0].map) {
// 		// Fallback to initial values if the data is not an array, empty, or does not have the expected structure
// 		return {
// 			nodes: initialNodes,
// 			edges: initialEdges,
// 			viewport: {
// 				x: 0,
// 				y: 0,
// 				zoom: 1,
// 			},
// 		} as ReactFlowJsonObject;
// 	}

// 	const jsonObj = jsonArray[0]; // Assume the first project is the current one

// 	return {
// 		nodes: jsonObj.map.nodes,
// 		edges: jsonObj.map.edges,
// 		viewport: jsonObj.map.viewport,
// 	} as ReactFlowJsonObject;
// };

// export const readFullContentArray = (): DataState[] => {
// 	const data = typeof window !== 'undefined' && localStorage.getItem(KEY);

// 	if (!data) {
// 		return []; // Return an empty array if there's no data
// 	}

// 	let jsonArray;
// 	try {
// 		jsonArray = JSON.parse(data);
// 	} catch (error) {
// 		return []; // Return an empty array if parsing fails
// 	}

// 	if (!Array.isArray(jsonArray)) {
// 		return []; // Return an empty array if the parsed data is not an array
// 	}

// 	return jsonArray.map(formatObject);
// };

// const formatObject = (data: any) => {
// 	return {
// 		type: data?.type || TYPE,
// 		version: data?.version || VERSION,
// 		map: data?.map || {
// 			nodes: [],
// 			edges: [],
// 			viewport: {
// 				x: 0,
// 				y: 0,
// 				zoom: 1,
// 			},
// 		},
// 		config: data?.config
// 			? data?.config
// 			: {
// 				palette: palettes[0].id,
// 			},
// 		projectName: data?.projectName || '', // Add projectName to the data structure
// 	};
// };

// const formatMap = (obj: ReactFlowJsonObject) => {
// 	return {
// 		nodes: obj.nodes,
// 		edges: obj.edges,
// 		viewport: obj.viewport,
// 	};
// };

// export const updateConfig = (key: string, value: any) => {
// 	const data = readFullContentArray();

// 	if (data.length === 0) {
// 		// Initialize with a default project if no projects exist
// 		data.push(createNewProject('Default Project'));
// 	}

// 	data.forEach((project) => {
// 		project.config = {
// 			...project.config,
// 			[key]: value,
// 		};
// 	});

// 	localStorage.setItem(KEY, JSON.stringify(data));
// };

// export const getConfigKey = (key: keyof Config): any => {
// 	const data = readFullContentArray();

// 	return data[0]?.config ? data[0].config[key] : null; // Assume the first project is the current one
// };

// export const restoreProject = (dataState: ImportedDataState) => {
// 	const data = readFullContentArray();
// 	data.push(dataState);
// 	localStorage.setItem(KEY, JSON.stringify(data));
// };

// const obj = {
// 	openAI: 'mentalist-openai-key',
// 	model: 'mentalist-model',
// 	mode: 'mentalist-mode',
// };

// export const saveLocalConfigKey = (key: keyof typeof obj, value: string): void => {
// 	const keyToUse: string = obj[key];

// 	localStorage.setItem(keyToUse, value);
// };

// export const getLocalConfigKey = (key: keyof typeof obj) => {
// 	const keyToUse: string = obj[key];

// 	return localStorage.getItem(keyToUse);
// };

// // New function to save the project name
// export const saveProjectName = (name: string) => {
// 	const data = readFullContentArray();
// 	if (data.length > 0) {
// 		data[0].projectName = name; // Assume the first project is the current one
// 		localStorage.setItem(KEY, JSON.stringify(data));
// 	}
// };

// // New function to create a new project

// export const createNewProject = (projectname): ReactFlowJsonObject => {

// 	return {
// 		nodes: nodeTypes.rootNode,
// 		edges: initialEdges,
// 		viewport: {
// 			x: 0,
// 			y: 0,
// 			zoom: 1,
// 		},
// 		id: "root",
// 		projectName: projectname,
// 	};

// };

// // export const addNewProject = (name: string) => {
// // 	const newProject = createNewProject(name);
// // 	const data = readFullContentArray();
// // 	data.push(newProject);
// // 	localStorage.setItem(KEY, JSON.stringify(data));
// // };


// 'use client';
// import { ReactFlowJsonObject } from 'reactflow';
// import { initialNodes, nodeTypes } from '@/data/defaultNodes';
// import { initialEdges } from '@/data/defaultEdges';
// import { Config, DataState, ImportedDataState, MapState } from './types';
// import { palettes } from '@/data/defaultPalettes';

// const KEY = 'mentalist-data';
// const TYPE = 'mentalist';
// const VERSION = 1;

// export const saveMap = (obj: ReactFlowJsonObject) => {
// 	saveProjectKey('map', formatMap(obj) as MapState);
// };

// export const saveProjectKey = (key: keyof DataState, value: any) => {
// 	const data = readFullContentArray();

// 	if (data.length === 0) {
// 		data.push(createNewProject('Default Project'));
// 	}

// 	data[0][key] = value;

// 	localStorage.setItem(KEY, JSON.stringify(data));
// };

// export const loadMapData = (): ReactFlowJsonObject => {
// 	const data = typeof window !== 'undefined' && localStorage.getItem(KEY);

// 	if (!data) {
// 		return {
// 			nodes: initialNodes,
// 			edges: initialEdges,
// 			viewport: {
// 				x: 0,
// 				y: 0,
// 				zoom: 1,
// 			},
// 		};
// 	}

// 	let jsonArray;
// 	try {
// 		jsonArray = JSON.parse(data);
// 	} catch (error) {
// 		return {
// 			nodes: initialNodes,
// 			edges: initialEdges,
// 			viewport: {
// 				x: 0,
// 				y: 0,
// 				zoom: 1,
// 			},
// 		} as ReactFlowJsonObject;
// 	}

// 	if (!Array.isArray(jsonArray) || jsonArray.length === 0 || !jsonArray[0].map) {
// 		return {
// 			nodes: initialNodes,
// 			edges: initialEdges,
// 			viewport: {
// 				x: 0,
// 				y: 0,
// 				zoom: 1,
// 			},
// 		} as ReactFlowJsonObject;
// 	}

// 	const jsonObj = jsonArray[0];

// 	return {
// 		nodes: jsonObj.map.nodes,
// 		edges: jsonObj.map.edges,
// 		viewport: jsonObj.map.viewport,
// 	} as ReactFlowJsonObject;
// };

// export const readFullContentArray = (): DataState[] => {
// 	const data = typeof window !== 'undefined' && localStorage.getItem(KEY);

// 	if (!data) {
// 		return [];
// 	}

// 	let jsonArray;
// 	try {
// 		jsonArray = JSON.parse(data);
// 	} catch (error) {
// 		return [];
// 	}

// 	if (!Array.isArray(jsonArray)) {
// 		return [];
// 	}

// 	return jsonArray.map(formatObject);
// };

// const formatObject = (data: any) => {
// 	return {
// 		type: data?.type || TYPE,
// 		version: data?.version || VERSION,
// 		map: data?.map || {
// 			nodes: [],
// 			edges: [],
// 			viewport: {
// 				x: 0,
// 				y: 0,
// 				zoom: 1,
// 			},
// 		},
// 		config: data?.config
// 			? data?.config
// 			: {
// 				palette: palettes[0].id,
// 			},
// 		projectName: data?.projectName || '',
// 	};
// };

// const formatMap = (obj: ReactFlowJsonObject) => {
// 	return {
// 		nodes: obj.nodes,
// 		edges: obj.edges,
// 		viewport: obj.viewport,
// 	};
// };

// export const updateConfig = (key: string, value: any) => {
// 	const data = readFullContentArray();

// 	if (data.length === 0) {
// 		data.push(createNewProject('Default Project'));
// 	}

// 	data.forEach((project) => {
// 		project.config = {
// 			...project.config,
// 			[key]: value,
// 		};
// 	});

// 	localStorage.setItem(KEY, JSON.stringify(data));
// };

// export const getConfigKey = (key: keyof Config): any => {
// 	const data = readFullContentArray();

// 	return data[0]?.config ? data[0].config[key] : null;
// };

// export const restoreProject = (dataState: ImportedDataState) => {
// 	const data = readFullContentArray();
// 	data.push(dataState);
// 	localStorage.setItem(KEY, JSON.stringify(data));
// };

// const obj = {
// 	openAI: 'mentalist-openai-key',
// 	model: 'mentalist-model',
// 	mode: 'mentalist-mode',
// };

// export const saveLocalConfigKey = (key: keyof typeof obj, value: string): void => {
// 	const keyToUse: string = obj[key];

// 	localStorage.setItem(keyToUse, value);
// };

// export const getLocalConfigKey = (key: keyof typeof obj) => {
// 	const keyToUse: string = obj[key];

// 	return localStorage.getItem(keyToUse);
// };

// export const saveProjectName = (name: string) => {
// 	const data = readFullContentArray();
// 	if (data.length > 0) {
// 		data[0].projectName = name;
// 		localStorage.setItem(KEY, JSON.stringify(data));
// 	}
// };

// export const createNewProject = (type: string, projectName: string): DataState => {
// 	const newProject = {
// 		type: TYPE,
// 		version: VERSION,
// 		map: {
// 			nodes: [{
// 				id: 'root',
// 				type: type,
// 				position: { x: 0, y: 0 },
// 				data: { text: 'jsMind', type: "2" },
// 				style: {
// 					backgroundColor: "#fff",
// 					borderColor: "#0b132b",
// 					borderRadius: "10px",
// 					borderStyle: "solid",
// 					borderWidth: 1,
// 					color: "#1E293B"
// 				}
// 			}],
// 			edges: [],
// 			viewport: {
// 				x: 0,
// 				y: 0,
// 				zoom: 1,
// 			},
// 		},
// 		config: {
// 			palette: palettes[0].id,
// 		},
// 		projectName: projectName,
// 	};

// 	const data = readFullContentArray();
// 	data.unshift(newProject);
// 	localStorage.setItem(KEY, JSON.stringify(data));
// 	return newProject;
// };


// 'use client';
// import { ReactFlowJsonObject } from 'reactflow';
// import { initialNodes, nodeTypes } from '@/data/defaultNodes';
// import { initialEdges } from '@/data/defaultEdges';
// import { Config, DataState, ImportedDataState, MapState } from './types';
// import { palettes } from '@/data/defaultPalettes';

// const KEY = 'mentalist-data';
// const TYPE = 'mentalist';
// const VERSION = 1;

// export const saveMap = (obj: ReactFlowJsonObject) => {
// 	saveProjectKey('map', formatMap(obj) as MapState);
// };

// export const saveProjectKey = (key: keyof DataState, value: any) => {
// 	const data = readFullContentArray();

// 	if (data.length === 0) {
// 		data.push(createNewProject('Default Project'));
// 	}

// 	data[0][key] = value;

// 	localStorage.setItem(KEY, JSON.stringify(data));
// };

// export const loadMapData = (): ReactFlowJsonObject => {
// 	const data = typeof window !== 'undefined' && localStorage.getItem(KEY);

// 	if (!data) {
// 		return {
// 			nodes: initialNodes,
// 			edges: initialEdges,
// 			viewport: {
// 				x: 0,
// 				y: 0,
// 				zoom: 1,
// 			},
// 		};
// 	}

// 	let jsonArray;
// 	try {
// 		jsonArray = JSON.parse(data);
// 	} catch (error) {
// 		return {
// 			nodes: initialNodes,
// 			edges: initialEdges,
// 			viewport: {
// 				x: 0,
// 				y: 0,
// 				zoom: 1,
// 			},
// 		} as ReactFlowJsonObject;
// 	}

// 	if (!Array.isArray(jsonArray) || jsonArray.length === 0 || !jsonArray[0].map) {
// 		return {
// 			nodes: initialNodes,
// 			edges: initialEdges,
// 			viewport: {
// 				x: 0,
// 				y: 0,
// 				zoom: 1,
// 			},
// 		} as ReactFlowJsonObject;
// 	}

// 	const jsonObj = jsonArray[0];

// 	return {
// 		nodes: jsonObj.map.nodes,
// 		edges: jsonObj.map.edges,
// 		viewport: jsonObj.map.viewport,
// 	} as ReactFlowJsonObject;
// };

// export const readFullContentArray = (): DataState[] => {
// 	const data = typeof window !== 'undefined' && localStorage.getItem(KEY);

// 	if (!data) {
// 		return [];
// 	}

// 	let jsonArray;
// 	try {
// 		jsonArray = JSON.parse(data);
// 	} catch (error) {
// 		return [];
// 	}

// 	if (!Array.isArray(jsonArray)) {
// 		return [];
// 	}

// 	return jsonArray.map(formatObject);
// };

// const formatObject = (data: any) => {
// 	return {
// 		type: data?.type || TYPE,
// 		version: data?.version || VERSION,
// 		map: data?.map || {
// 			nodes: [],
// 			edges: [],
// 			viewport: {
// 				x: 0,
// 				y: 0,
// 				zoom: 1,
// 			},
// 		},
// 		config: data?.config
// 			? data?.config
// 			: {
// 				palette: palettes[0].id,
// 			},
// 		projectName: data?.projectName || '',
// 	};
// };

// const formatMap = (obj: ReactFlowJsonObject) => {
// 	return {
// 		nodes: obj.nodes,
// 		edges: obj.edges,
// 		viewport: obj.viewport,
// 	};
// };

// export const updateConfig = (key: string, value: any) => {
// 	const data = readFullContentArray();

// 	if (data.length === 0) {
// 		data.push(createNewProject('Default Project'));
// 	}

// 	data.forEach((project) => {
// 		project.config = {
// 			...project.config,
// 			[key]: value,
// 		};
// 	});

// 	localStorage.setItem(KEY, JSON.stringify(data));
// };

// export const getConfigKey = (key: keyof Config): any => {
// 	const data = readFullContentArray();

// 	return data[0]?.config ? data[0].config[key] : null;
// };

// export const restoreProject = (dataState: ImportedDataState) => {
// 	const data = readFullContentArray();
// 	data.unshift(dataState); // Pushing the loaded project to the first item
// 	localStorage.setItem(KEY, JSON.stringify(data));
// };

// const obj = {
// 	openAI: 'mentalist-openai-key',
// 	model: 'mentalist-model',
// 	mode: 'mentalist-mode',
// };

// export const saveLocalConfigKey = (key: keyof typeof obj, value: string): void => {
// 	const keyToUse: string = obj[key];

// 	localStorage.setItem(keyToUse, value);
// };

// export const getLocalConfigKey = (key: keyof typeof obj) => {
// 	const keyToUse: string = obj[key];

// 	return localStorage.getItem(keyToUse);
// };

// export const saveProjectName = (name: string) => {
// 	const data = readFullContentArray();
// 	if (data.length > 0) {
// 		data[0].projectName = name;
// 		localStorage.setItem(KEY, JSON.stringify(data));
// 	}
// };

// export const createNewProject = (projectName: string, type: string): DataState => {
// 	const newProject = {
// 		type: TYPE,
// 		version: VERSION,
// 		map: {
// 			nodes: [{
// 				id: 'root',
// 				data: { text: 'Root Node', type: "1" },
// 				position: { x: 0, y: 0 },
// 				type: type,
// 				style: {
// 					backgroundColor: "#fff",
// 					borderColor: "#0b132b",
// 					borderRadius: "10px",
// 					borderStyle: "solid",
// 					borderWidth: 1,
// 					color: "#1E293B",
// 				}
// 			}],
// 			edges: [],
// 			viewport: {
// 				x: 0,
// 				y: 0,
// 				zoom: 1,
// 			},
// 		},
// 		config: {
// 			palette: palettes[0].id,
// 		},
// 		projectName,
// 	};

// 	const data = readFullContentArray();
// 	data.unshift(newProject);
// 	localStorage.setItem(KEY, JSON.stringify(data));
// 	return newProject;
// };

'use client';
import { ReactFlowJsonObject } from 'reactflow';
import { initialNodes, nodeTypes } from '@/data/defaultNodes';
import { initialEdges } from '@/data/defaultEdges';
import { Config, DataState, ImportedDataState, MapState } from './types';
import { palettes } from '@/data/defaultPalettes';

const KEY = 'mentalist-data';
const TYPE = 'mentalist';
const VERSION = 1;

export const saveMap = (obj: ReactFlowJsonObject) => {
	saveProjectKey('map', formatMap(obj) as MapState);
};

export const saveProjectKey = (key: keyof DataState, value: any) => {
	const data = readFullContentArray();

	if (data.length === 0) {
		data.push(createNewProject('Default Project'));
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

const formatObject = (data: any) => {
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
		config: data?.config
			? data?.config
			: {
				palette: palettes[0].id,
			},
		projectName: data?.projectName || '',
		configuration: data?.configuration || {
			OpenAIContent: "",
			DefaultAssistantContent: "",
			DefaultThreadIDContent: ""
		}
	};
};

const formatMap = (obj: ReactFlowJsonObject) => {
	return {
		nodes: obj.nodes,
		edges: obj.edges,
		viewport: obj.viewport,
	};
};

export const updateConfig = (key: string, value: any) => {
	const data = readFullContentArray();

	if (data.length === 0) {
		data.push(createNewProject('Default Project'));
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

export const restoreProject = (dataState: ImportedDataState) => {
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

export const getLocalConfigKey = (key: keyof typeof obj) => {
	const keyToUse: string = obj[key];

	return localStorage.getItem(keyToUse);
};

export const saveProjectName = (name: string) => {
	const data = readFullContentArray();
	if (data.length > 0) {
		data[0].projectName = name;
		localStorage.setItem(KEY, JSON.stringify(data));
	}
};

export const saveRequest = (requestContent: string) => {
	const data = readFullContentArray();
	if (data.length > 0) {
		if (!data[0].configuration) {
			data[0].configuration = {};
		}
		data[0].configuration.RequestContent = requestContent;
		localStorage.setItem(KEY, JSON.stringify(data));
	}
}

export const saveOpenAI = async (OpenAIContent: string) => {
	const data = readFullContentArray();

	if (data.length > 0) {
		if (!data[0].configuration) {
			data[0].configuration = {};
		}
		data[0].configuration.OpenAIContent = OpenAIContent;
		localStorage.setItem(KEY, JSON.stringify(data));
	}
}

export const saveDefaultAssistant = (DefaultAssistantContent: string) => {
	const data = readFullContentArray();
	if (data.length > 0) {
		if (!data[0].configuration) {
			data[0].configuration = {};
		}
		data[0].configuration.DefaultAssistantContent = DefaultAssistantContent;
		localStorage.setItem(KEY, JSON.stringify(data));
	}
}

export const saveDefaultThreadID = (DefaultThreadIDContent: string) => {
	const data = readFullContentArray();
	if (data.length > 0) {
		if (!data[0].configuration) {
			data[0].configuration = {};
		}
		data[0].configuration.DefaultThreadIDContent = DefaultThreadIDContent;
		localStorage.setItem(KEY, JSON.stringify(data));
	}
}

export const saveCommands = (CommandName: string, CommandShortcut: string, AssistantId: string, ThreadId: string, Select: string, Ideas: Array<any>, Context: Array<any>, Content: Array<any>, Commands: string, id: Number) => {
	const data = readFullContentArray();
	if (data.length > 0) {
		if (!data[0].configuration) {
			data[0].configuration = {};
		}

		const command = {
			CommandName,
			CommandShortcut,
			AssistantId,
			ThreadId,
			Select,
			ideas: Ideas,
			context: Context,
			content: Content,
			Commands,
		};

		data[0].configuration.Commands[id] = command;
		localStorage.setItem(KEY, JSON.stringify(data));
	}
}

export const getCommand = (id: number) => {
	const data = localStorage.getItem('mentalist-data');
	let resultData
	if (data) {
		resultData = JSON.parse(data)
	}
	console.log(resultData);
	return resultData ? resultData[0].configuration.Commands[id] : null
}

export const createNewCommand = () => {
	const command = {
		CommandName: "",
		CommandShortcut: "",
		AssistantId: "",
		ThreadId: "",
		Select: "",
		Ideas: ['Parent', 'Brother'],
		Context: ['Parent', 'Brother'],
		Content: ['Parent', 'Brother'],
		Commands: ""
	};

	const data = readFullContentArray();
	if (data.length > 0) {
		if (!data[0].configuration) {
			data[0].configuration = {};
		}

		if (!data[0].configuration.Commands) {
			data[0].configuration.Commands = []
		}

		data[0].configuration.Commands.push(command);
		localStorage.setItem(KEY, JSON.stringify(data));
	}
}

export const deleteCommand = (id) => {
	const data = readFullContentArray();
	if (data.length > 0) {
		data[0].configuration.Commands.splice(id, 1);;
		localStorage.setItem(KEY, JSON.stringify(data));
	}
}

export const getRequest = () => {
	const data = localStorage.getItem('mentalist-data');
	return data ? JSON.parse(data) : null;
}

export const createNewProject = (projectName: string, type: string): DataState => {
	const newProject = {
		type: TYPE,
		version: VERSION,
		map: {
			nodes: [{
				id: 'root',
				data: { text: 'Root Node', type: "1" },
				position: { x: 0, y: 0 },
				type: type,
				style: {
					backgroundColor: "#fff",
					borderColor: "#0b132b",
					borderRadius: "10px",
					borderStyle: "solid",
					borderWidth: 1,
					color: "#1E293B",
				}
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
			RequestContent: "",
			OpenAIContent: "",
			DefaultAssistantContent: "",
			DefaultThreadIDContent: "",
			Commands: [

			]
		}
	};

	const data = readFullContentArray();
	data.unshift(newProject);
	localStorage.setItem(KEY, JSON.stringify(data));
	return newProject;
};
