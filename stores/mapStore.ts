// // // import { create } from 'zustand';
// // // import {
// // // 	applyEdgeChanges,
// // // 	applyNodeChanges,
// // // 	Edge,
// // // 	EdgeChange,
// // // 	Node,
// // // 	NodeChange,
// // // 	OnNodesChange,
// // // 	OnEdgesChange,
// // // 	OnConnectStartParams,
// // // 	ReactFlowInstance,
// // // 	Viewport,
// // // } from 'reactflow';
// // // import Graph from 'graphology';

// // // import { findLeafNodes, generateEdges, generateNodes } from '@/utils/node';
// // // import { MouseEvent as ReactMouseEvent, RefObject, TouchEvent as ReactTouchEvent } from 'react';
// // // import { SUBTOPIC } from '@/utils/constants/headerTypes';
// // // import { nextId } from '@/utils/id';
// // // import { getConfigKey, loadMapData, updateConfig, saveProjectKey } from '@/utils/storage';
// // // import { PaletteElement } from '@/utils/types';
// // // import { palettes } from '@/data/defaultPalettes';

// // // type ColorMap = {
// // // 	[key: string]: string;
// // // };

// // // export type RFState = {
// // // 	instance: ReactFlowInstance | null;
// // // 	onInit: (instance: ReactFlowInstance) => void;
// // // 	nodes: Node[];
// // // 	edges: Edge[];
// // // 	loadFromStorage: () => void;
// // // 	viewport: Viewport;
// // // 	connectionNodeId: string | null;
// // // 	reactFlowWrapper: RefObject<HTMLDivElement | undefined> | null;
// // // 	setReactFlowWrapper: (ref: RefObject<HTMLDivElement | undefined>) => void;
// // // 	onNodesChange: OnNodesChange;
// // // 	onEdgesChange: OnEdgesChange;
// // // 	onConnectStart: (event: ReactMouseEvent | ReactTouchEvent, params: OnConnectStartParams) => void;
// // // 	onConnectEnd: (event: MouseEvent | TouchEvent) => void;
// // // 	updateText: (nodeId: string, text: string) => void;
// // // 	updateInnerType: (nodeId: string, text: string) => void;
// // // 	addChildrenNodes: (nodeId: string, type: string, data: Array<any>) => void;
// // // 	getNodeContext: (nodeId: string) => { main: string; context: Array<string> };
// // // 	removeElement: (nodeId: string) => void;
// // // 	applyPalette: (palette: PaletteElement) => void;
// // // 	createInitialNode: (projectName: string) => void; // Add this line
// // // };

// // // // const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
// // // //   data.nodes,
// // // //   data.edges
// // // // );

// // // const useMapStore = create<RFState>((set, get) => ({
// // // 	addNode: (type: string, position: { x: number, y: number }) => {
// // // 		const id = nextId();
// // // 		const newNode: Node = {
// // // 			id,
// // // 			type,
// // // 			position,
// // // 			data: { label: `${type} node` },
// // // 		};

// // // 		set({
// // // 			nodes: get().nodes.concat(newNode),
// // // 		});
// // // 	},
// // // 	instance: null,
// // // 	onInit: (instance: ReactFlowInstance) => {
// // // 		set({
// // // 			instance,
// // // 		});

// // // 		get().loadFromStorage();
// // // 	},
// // // 	viewport: {
// // // 		x: 0,
// // // 		y: 0,
// // // 		zoom: 1,
// // // 	},
// // // 	nodes: [],
// // // 	edges: [],
// // // 	reactFlowWrapper: null,
// // // 	connectionNodeId: null,
// // // 	loadFromStorage: () => {
// // // 		const data = loadMapData();

// // // 		const instance = get().instance;
// // // 		if (!instance) {
// // // 			return;
// // // 		}

// // // 		set({
// // // 			nodes: data.nodes,
// // // 			edges: data.edges,
// // // 			viewport: data.viewport,
// // // 		});

// // // 		const selectedPaletteId = getConfigKey('palette');
// // // 		let selectedPalette = palettes.find((palette) => palette.id === selectedPaletteId)!;

// // // 		get().applyPalette(selectedPalette);
// // // 	},
// // // 	getNodeContext: (nodeId: string) => {
// // // 		const nodes = findLeafNodes(get().nodes, nodeId).reverse();

// // // 		const rootNode = nodes.shift()!;
// // // 		const main = rootNode.data.text;
// // // 		const context = nodes.map((node) => node.data.text);

// // // 		return {
// // // 			main,
// // // 			context,
// // // 		};
// // // 	},
// // // 	setReactFlowWrapper: (ref: RefObject<HTMLDivElement | undefined>) => {
// // // 		set({
// // // 			reactFlowWrapper: ref,
// // // 		});
// // // 	},
// // // 	onNodesChange: (changes: Array<NodeChange>) => {
// // // 		const sureChanges = changes.filter((change) => !(change.type === 'remove' && change.id === 'root'));
// // // 		const newNodes = applyNodeChanges(sureChanges, get().nodes);

// // // 		set({
// // // 			nodes: newNodes,
// // // 		});
// // // 	},
// // // 	onEdgesChange: (changes: Array<EdgeChange>) => {
// // // 		const newEdges = applyEdgeChanges(changes, get().edges);
// // // 		set({
// // // 			edges: newEdges,
// // // 		});
// // // 	},
// // // 	onConnectStart: (event: ReactMouseEvent | ReactTouchEvent, params: OnConnectStartParams) => {
// // // 		if ((event.target as any).classList.contains('source')) {
// // // 			set({
// // // 				connectionNodeId: params.nodeId,
// // // 			});
// // // 		}
// // // 	},
// // // 	onConnectEnd: (event: any) => {
// // // 		const targetIsPane = event.target.classList.contains('react-flow__pane');
// // // 		const connectingNodeId = get().connectionNodeId!;
// // // 		const reactFlowWrapper = get().reactFlowWrapper;

// // // 		const selectedPaletteId = getConfigKey('palette');
// // // 		let selectedPalette = palettes.find((palette) => palette.id === selectedPaletteId)!;

// // // 		if (targetIsPane && connectingNodeId && reactFlowWrapper?.current) {
// // // 			// we need to remove the wrapper bounds, in order to get the correct position
// // // 			const { top, left } = reactFlowWrapper.current.getBoundingClientRect();

// // // 			const { project } = get().instance!;
// // // 			const id = nextId();

// // // 			const newNode: Node = {
// // // 				id,
// // // 				type: 'topicNode',
// // // 				// we are removing the half of the node width (75) to center the new node
// // // 				position: project({
// // // 					x: event.clientX - left - 100,
// // // 					y: event.clientY - top,
// // // 				}),
// // // 				data: {
// // // 					text: 'sub',
// // // 					type: SUBTOPIC,
// // // 					parentId: connectingNodeId,
// // // 				},
// // // 			};

// // // 			set({
// // // 				nodes: get().nodes.concat(newNode),
// // // 				edges: get().edges.concat({
// // // 					id: nextId(),
// // // 					source: connectingNodeId,
// // // 					target: id,
// // // 				}),
// // // 				connectionNodeId: null,
// // // 			});

// // // 			get().applyPalette(selectedPalette);
// // // 		}
// // // 	},
// // // 	updateInnerType: (nodeId: string, type: string) => {
// // // 		const newNodes = get().nodes.map((node) => {
// // // 			if (node.id === nodeId) {
// // // 				node.data = { ...node.data, type };
// // // 			}

// // // 			return node;
// // // 		});

// // // 		set({
// // // 			nodes: newNodes,
// // // 		});
// // // 	},
// // // 	updateText: (nodeId: string, text: string) => {
// // // 		const newNodes = get().nodes.map((node) => {
// // // 			if (node.id === nodeId) {
// // // 				node.data = { ...node.data, text };
// // // 			}

// // // 			return node;
// // // 		});

// // // 		set({
// // // 			nodes: newNodes,
// // // 		});
// // // 	},
// // // 	addChildrenNodes: (nodeId: string, type: string, data: Array<any>) => {
// // // 		const node = get().nodes.find((node) => node.id == nodeId)!;

// // // 		const selectedPaletteId = getConfigKey('palette');
// // // 		let selectedPalette = palettes.find((palette) => palette.id === selectedPaletteId)!;

// // // 		if (data.length === 0) {
// // // 			return;
// // // 		}

// // // 		const newNodes = generateNodes(type, node, data);

// // // 		const newEdges = generateEdges(node.id, newNodes);

// // // 		const allNodes = [...get().nodes, ...newNodes];
// // // 		const allEdges = [...get().edges, ...newEdges];

// // // 		set({ nodes: [...allNodes] });
// // // 		set({ edges: [...allEdges] });

// // // 		get().applyPalette(selectedPalette);
// // // 	},
// // // 	removeElement: (nodeId: string) => {
// // // 		const node = get().nodes.find((node) => node.id == nodeId)!;

// // // 		const instance = get().instance;
// // // 		if (!instance) {
// // // 			return;
// // // 		}

// // // 		instance.deleteElements({ nodes: [node] });
// // // 	},
// // // 	applyPalette: (palette: PaletteElement) => {
// // // 		const instance = get().instance;
// // // 		if (!instance) {
// // // 			return;
// // // 		}

// // // 		const graph = new Graph();

// // // 		const nodes = get().nodes;
// // // 		const edges = get().edges;

// // // 		nodes.forEach((node) => {
// // // 			graph.addNode(node.id, node);
// // // 		});

// // // 		edges.forEach((edge) => {
// // // 			graph.addEdge(edge.source, edge.target, {
// // // 				...edge,
// // // 			});
// // // 		});

// // // 		const colorMap: ColorMap = {};
// // // 		let colorIndex = 0;

// // // 		graph.forEachNode((nodeId, attributes) => {
// // // 			const parentNodeAttributes = attributes.data.parentId ? graph.getNodeAttributes(attributes.data.parentId) : null;

// // // 			const parentColor = parentNodeAttributes ? colorMap[parentNodeAttributes.id] : null;

// // // 			if (nodeId === 'root') {
// // // 				// Ensure palette.root and palette.root.buildStyles exist
// // // 				if (palette.root && typeof palette.root.buildStyles === 'function') {
// // // 					graph.setNodeAttribute(nodeId, 'style', {
// // // 						...attributes.style,
// // // 						...palette.root.buildStyles(),
// // // 					});
// // // 				}
// // // 				return;
// // // 			}

// // // 			if (!parentColor) {
// // // 				colorMap[nodeId] = palette.colors[colorIndex];
// // // 				colorIndex = (colorIndex + 1) % palette.colors.length;
// // // 			} else {
// // // 				colorMap[nodeId] = parentColor;
// // // 			}

// // // 			const color = colorMap[nodeId];

// // // 			graph.setNodeAttribute(nodeId, 'style', {
// // // 				...attributes.style,
// // // 				...palette.node.buildStyles(color),
// // // 			});
// // // 		});

// // // 		graph.forEachEdge((edgeId, attributes) => {
// // // 			const sourceColor = colorMap[attributes.source];
// // // 			const targetColor = colorMap[attributes.target];

// // // 			const color = sourceColor || targetColor;

// // // 			graph.mergeEdgeAttributes(attributes.source, attributes.target, {
// // // 				...attributes,
// // // 				type: 'customizable',
// // // 				animated: false,
// // // 				style: {
// // // 					...attributes.style,
// // // 					...palette.edge.buildStyles(color),
// // // 				},
// // // 			});
// // // 		});

// // // 		const exported = graph.export();

// // // 		const newNodes = exported.nodes.map((node) => node.attributes) as Node[];
// // // 		const newEdges = exported.edges.map((edge) => edge.attributes) as Edge[];

// // // 		set({ nodes: newNodes, edges: newEdges });
// // // 	},
// // // 	createInitialNode: (projectName: string) => {
// // // 		const id = nextId();
// // // 		const initialNode: Node = {
// // // 			id,
// // // 			type: 'initialNodeType', // Set your node type here
// // // 			position: { x: 0, y: 0 }, // Set the initial position
// // // 			data: { text: 'Initial Node' }, // Set the initial data
// // // 		};

// // // 		set({
// // // 			nodes: [initialNode],
// // // 			edges: [],
// // // 			viewport: { x: 0, y: 0, zoom: 1 },
// // // 		});

// // // 		// Save to local storage
// // // 		saveProjectKey('map', {
// // // 			nodes: [initialNode],
// // // 			edges: [],
// // // 			viewport: { x: 0, y: 0, zoom: 1 },
// // // 			projectName,
// // // 		});
// // // 	},
// // // }));

// // // export default useMapStore;


// // // stores/mapStore.ts

// // import { create } from 'zustand';
// // import {
// // 	applyEdgeChanges,
// // 	applyNodeChanges,
// // 	Edge,
// // 	EdgeChange,
// // 	Node,
// // 	NodeChange,
// // 	OnNodesChange,
// // 	OnEdgesChange,
// // 	OnConnectStartParams,
// // 	ReactFlowInstance,
// // 	Viewport,
// // } from 'reactflow';
// // import Graph from 'graphology';

// // import { findLeafNodes, generateEdges, generateNodes } from '@/utils/node';
// // import { MouseEvent as ReactMouseEvent, RefObject, TouchEvent as ReactTouchEvent } from 'react';
// // import { SUBTOPIC } from '@/utils/constants/headerTypes';
// // import { nextId } from '@/utils/id';
// // import { getConfigKey, loadMapData, updateConfig, saveProjectKey } from '@/utils/storage';
// // import { PaletteElement } from '@/utils/types';
// // import { palettes } from '@/data/defaultPalettes';

// // type ColorMap = {
// // 	[key: string]: string;
// // };

// // export type RFState = {
// // 	instance: ReactFlowInstance | null;
// // 	onInit: (instance: ReactFlowInstance) => void;
// // 	nodes: Node[];
// // 	edges: Edge[];
// // 	loadFromStorage: () => void;
// // 	viewport: Viewport;
// // 	connectionNodeId: string | null;
// // 	reactFlowWrapper: RefObject<HTMLDivElement | undefined> | null;
// // 	setReactFlowWrapper: (ref: RefObject<HTMLDivElement | undefined>) => void;
// // 	onNodesChange: OnNodesChange;
// // 	onEdgesChange: OnEdgesChange;
// // 	onConnectStart: (event: ReactMouseEvent | ReactTouchEvent, params: OnConnectStartParams) => void;
// // 	onConnectEnd: (event: MouseEvent | TouchEvent) => void;
// // 	updateText: (nodeId: string, text: string) => void;
// // 	updateInnerType: (nodeId: string, text: string) => void;
// // 	addChildrenNodes: (nodeId: string, type: string, data: Array<any>) => void;
// // 	getNodeContext: (nodeId: string) => { main: string; context: Array<string> };
// // 	removeElement: (nodeId: string) => void;
// // 	applyPalette: (palette: PaletteElement) => void;
// // 	createInitialNode: (projectName: string) => void;
// // 	addNode: (type: string, position: { x: number, y: number }) => void; // Add this line
// // };

// // const useMapStore = create<RFState>((set, get) => ({
// // 	instance: null,
// // 	onInit: (instance: ReactFlowInstance) => {
// // 		set({
// // 			instance,
// // 		});

// // 		get().loadFromStorage();
// // 	},
// // 	viewport: {
// // 		x: 0,
// // 		y: 0,
// // 		zoom: 1,
// // 	},
// // 	nodes: [],
// // 	edges: [],
// // 	reactFlowWrapper: null,
// // 	connectionNodeId: null,
// // 	loadFromStorage: () => {
// // 		const data = loadMapData();

// // 		const instance = get().instance;
// // 		if (!instance) {
// // 			return;
// // 		}

// // 		set({
// // 			nodes: data.nodes,
// // 			edges: data.edges,
// // 			viewport: data.viewport,
// // 		});

// // 		const selectedPaletteId = getConfigKey('palette');
// // 		let selectedPalette = palettes.find((palette) => palette.id === selectedPaletteId)!;

// // 		get().applyPalette(selectedPalette);
// // 	},
// // 	getNodeContext: (nodeId: string) => {
// // 		const nodes = findLeafNodes(get().nodes, nodeId).reverse();

// // 		const rootNode = nodes.shift()!;
// // 		const main = rootNode.data.text;
// // 		const context = nodes.map((node) => node.data.text);

// // 		return {
// // 			main,
// // 			context,
// // 		};
// // 	},
// // 	setReactFlowWrapper: (ref: RefObject<HTMLDivElement | undefined>) => {
// // 		set({
// // 			reactFlowWrapper: ref,
// // 		});
// // 	},
// // 	onNodesChange: (changes: Array<NodeChange>) => {
// // 		const sureChanges = changes.filter((change) => !(change.type === 'remove' && change.id === 'root'));
// // 		const newNodes = applyNodeChanges(sureChanges, get().nodes);

// // 		set({
// // 			nodes: newNodes,
// // 		});
// // 	},
// // 	onEdgesChange: (changes: Array<EdgeChange>) => {
// // 		const newEdges = applyEdgeChanges(changes, get().edges);
// // 		set({
// // 			edges: newEdges,
// // 		});
// // 	},
// // 	onConnectStart: (event: ReactMouseEvent | ReactTouchEvent, params: OnConnectStartParams) => {
// // 		if ((event.target as any).classList.contains('source')) {
// // 			set({
// // 				connectionNodeId: params.nodeId,
// // 			});
// // 		}
// // 	},
// // 	onConnectEnd: (event: any) => {
// // 		const targetIsPane = event.target.classList.contains('react-flow__pane');
// // 		const connectingNodeId = get().connectionNodeId!;
// // 		const reactFlowWrapper = get().reactFlowWrapper;

// // 		const selectedPaletteId = getConfigKey('palette');
// // 		let selectedPalette = palettes.find((palette) => palette.id === selectedPaletteId)!;

// // 		if (targetIsPane && connectingNodeId && reactFlowWrapper?.current) {
// // 			// we need to remove the wrapper bounds, in order to get the correct position
// // 			const { top, left } = reactFlowWrapper.current.getBoundingClientRect();

// // 			const { project } = get().instance!;
// // 			const id = nextId();

// // 			const newNode: Node = {
// // 				id,
// // 				type: 'topicNode',
// // 				// we are removing the half of the node width (75) to center the new node
// // 				position: project({
// // 					x: event.clientX - left - 100,
// // 					y: event.clientY - top,
// // 				}),
// // 				data: {
// // 					text: 'sub',
// // 					type: SUBTOPIC,
// // 					parentId: connectingNodeId,
// // 				},
// // 			};

// // 			set({
// // 				nodes: get().nodes.concat(newNode),
// // 				edges: get().edges.concat({
// // 					id: nextId(),
// // 					source: connectingNodeId,
// // 					target: id,
// // 				}),
// // 				connectionNodeId: null,
// // 			});

// // 			get().applyPalette(selectedPalette);
// // 		}
// // 	},
// // 	updateInnerType: (nodeId: string, type: string) => {
// // 		const newNodes = get().nodes.map((node) => {
// // 			if (node.id === nodeId) {
// // 				node.data = { ...node.data, type };
// // 			}

// // 			return node;
// // 		});

// // 		set({
// // 			nodes: newNodes,
// // 		});
// // 	},
// // 	updateText: (nodeId: string, text: string) => {
// // 		const newNodes = get().nodes.map((node) => {
// // 			if (node.id === nodeId) {
// // 				node.data = { ...node.data, text };
// // 			}

// // 			return node;
// // 		});

// // 		set({
// // 			nodes: newNodes,
// // 		});
// // 	},
// // 	addChildrenNodes: (nodeId: string, type: string, data: Array<any>) => {
// // 		const node = get().nodes.find((node) => node.id == nodeId)!;

// // 		const selectedPaletteId = getConfigKey('palette');
// // 		let selectedPalette = palettes.find((palette) => palette.id === selectedPaletteId)!;

// // 		if (data.length === 0) {
// // 			return;
// // 		}

// // 		const newNodes = generateNodes(type, node, data);

// // 		const newEdges = generateEdges(node.id, newNodes);

// // 		const allNodes = [...get().nodes, ...newNodes];
// // 		const allEdges = [...get().edges, ...newEdges];

// // 		set({ nodes: [...allNodes] });
// // 		set({ edges: [...allEdges] });

// // 		get().applyPalette(selectedPalette);
// // 	},
// // 	removeElement: (nodeId: string) => {
// // 		const node = get().nodes.find((node) => node.id == nodeId)!;

// // 		const instance = get().instance;
// // 		if (!instance) {
// // 			return;
// // 		}

// // 		instance.deleteElements({ nodes: [node] });
// // 	},
// // 	applyPalette: (palette: PaletteElement) => {
// // 		const instance = get().instance;
// // 		if (!instance) {
// // 			return;
// // 		}

// // 		const graph = new Graph();

// // 		const nodes = get().nodes;
// // 		const edges = get().edges;

// // 		nodes.forEach((node) => {
// // 			graph.addNode(node.id, node);
// // 		});

// // 		edges.forEach((edge) => {
// // 			graph.addEdge(edge.source, edge.target, {
// // 				...edge,
// // 			});
// // 		});

// // 		const colorMap: ColorMap = {};
// // 		let colorIndex = 0;

// // 		graph.forEachNode((nodeId, attributes) => {
// // 			const parentNodeAttributes = attributes.data.parentId ? graph.getNodeAttributes(attributes.data.parentId) : null;

// // 			const parentColor = parentNodeAttributes ? colorMap[parentNodeAttributes.id] : null;

// // 			if (nodeId === 'root') {
// // 				if (palette.root && typeof palette.root.buildStyles === 'function') {
// // 					graph.setNodeAttribute(nodeId, 'style', {
// // 						...attributes.style,
// // 						...palette.root.buildStyles(),
// // 					});
// // 				}
// // 				return;
// // 			}

// // 			if (!parentColor) {
// // 				colorMap[nodeId] = palette.colors[colorIndex];
// // 				colorIndex = (colorIndex + 1) % palette.colors.length;
// // 			} else {
// // 				colorMap[nodeId] = parentColor;
// // 			}

// // 			const color = colorMap[nodeId];

// // 			graph.setNodeAttribute(nodeId, 'style', {
// // 				...attributes.style,
// // 				...palette.node.buildStyles(color),
// // 			});
// // 		});

// // 		graph.forEachEdge((edgeId, attributes) => {
// // 			const sourceColor = colorMap[attributes.source];
// // 			const targetColor = colorMap[attributes.target];

// // 			const color = sourceColor || targetColor;

// // 			graph.mergeEdgeAttributes(attributes.source, attributes.target, {
// // 				...attributes,
// // 				type: 'customizable',
// // 				animated: false,
// // 				style: {
// // 					...attributes.style,
// // 					...palette.edge.buildStyles(color),
// // 				},
// // 			});
// // 		});

// // 		const exported = graph.export();

// // 		const newNodes = exported.nodes.map((node) => node.attributes) as Node[];
// // 		const newEdges = exported.edges.map((edge) => edge.attributes) as Edge[];

// // 		set({ nodes: newNodes, edges: newEdges });
// // 	},
// // 	createInitialNode: (projectName: string) => {
// // 		const id = nextId();
// // 		const initialNode: Node = {
// // 			id,
// // 			type: 'initialNodeType',
// // 			position: { x: 0, y: 0 },
// // 			data: { text: 'Initial Node' },
// // 		};

// // 		set({
// // 			nodes: [initialNode],
// // 			edges: [],
// // 			viewport: { x: 0, y: 0, zoom: 1 },
// // 		});

// // 		saveProjectKey('map', {
// // 			nodes: [initialNode],
// // 			edges: [],
// // 			viewport: { x: 0, y: 0, zoom: 1 },
// // 			projectName,
// // 		});
// // 	},
// // 	addNode: (type: string, position: { x: number, y: number }) => {
// // 		const id = nextId();
// // 		const newNode: Node = {
// // 			id,
// // 			position,
// // 			data: { type: "2", parentId: "root", text: "sub" },
// // 			type: type,
// // 			style: {
// // 				backgroundColor: "#fff",
// // 				borderColor: "#0b132b",
// // 				borderRadius: "10px",
// // 				borderStyle: "solid",
// // 				borderWidth: 1,
// // 				color: "#1E293B",
// // 			}
// // 		};

// // 		set({
// // 			nodes: get().nodes.concat(newNode),
// // 		});
// // 	},
// // }));

// // export default useMapStore;


// // stores/mapStore.ts

// import { create } from 'zustand';
// import {
// 	applyEdgeChanges,
// 	applyNodeChanges,
// 	Edge,
// 	EdgeChange,
// 	Node,
// 	NodeChange,
// 	OnNodesChange,
// 	OnEdgesChange,
// 	OnConnectStartParams,
// 	ReactFlowInstance,
// 	Viewport,
// 	OnConnect,
// 	HandleElement,
// } from 'reactflow';
// import Graph from 'graphology';

// import { findLeafNodes, generateEdges, generateNodes } from '@/utils/node';
// import { MouseEvent as ReactMouseEvent, RefObject, TouchEvent as ReactTouchEvent } from 'react';
// import { SUBTOPIC } from '@/utils/constants/headerTypes';
// import { nextId } from '@/utils/id';
// import { getConfigKey, loadMapData, updateConfig, saveProjectKey } from '@/utils/storage';
// import { PaletteElement } from '@/utils/types';
// import { palettes } from '@/data/defaultPalettes';

// type ColorMap = {
// 	[key: string]: string;
// };

// export type RFState = {
// 	instance: ReactFlowInstance | null;
// 	onInit: (instance: ReactFlowInstance) => void;
// 	nodes: Node[];
// 	edges: Edge[];
// 	loadFromStorage: () => void;
// 	viewport: Viewport;
// 	connectionNodeId: string | null;
// 	reactFlowWrapper: RefObject<HTMLDivElement | undefined> | null;
// 	setReactFlowWrapper: (ref: RefObject<HTMLDivElement | undefined>) => void;
// 	onNodesChange: OnNodesChange;
// 	onEdgesChange: OnEdgesChange;
// 	onConnectStart: (event: ReactMouseEvent | ReactTouchEvent, params: OnConnectStartParams) => void;
// 	onConnectEnd: (event: MouseEvent | TouchEvent) => void;
// 	onConnect: OnConnect;
// 	updateText: (nodeId: string, text: string) => void;
// 	updateInnerType: (nodeId: string, text: string) => void;
// 	addChildrenNodes: (nodeId: string, type: string, data: Array<any>) => void;
// 	getNodeContext: (nodeId: string) => { main: string; context: Array<string> };
// 	removeElement: (nodeId: string) => void;
// 	applyPalette: (palette: PaletteElement) => void;
// 	createInitialNode: (projectName: string) => void;
// 	addNode: (type: string, position: { x: number, y: number }) => void;
// };

// const useMapStore = create<RFState>((set, get) => ({
// 	instance: null,
// 	onInit: (instance: ReactFlowInstance) => {
// 		set({
// 			instance,
// 		});

// 		get().loadFromStorage();
// 	},
// 	viewport: {
// 		x: 0,
// 		y: 0,
// 		zoom: 1,
// 	},
// 	nodes: [],
// 	edges: [],
// 	reactFlowWrapper: null,
// 	connectionNodeId: null,
// 	loadFromStorage: () => {
// 		const data = loadMapData();

// 		const instance = get().instance;
// 		if (!instance) {
// 			return;
// 		}

// 		set({
// 			nodes: data.nodes,
// 			edges: data.edges,
// 			viewport: data.viewport,
// 		});

// 		const selectedPaletteId = getConfigKey('palette');
// 		let selectedPalette = palettes.find((palette) => palette.id === selectedPaletteId)!;

// 		get().applyPalette(selectedPalette);
// 	},
// 	getNodeContext: (nodeId: string) => {
// 		const nodes = findLeafNodes(get().nodes, nodeId).reverse();

// 		const rootNode = nodes.shift()!;
// 		const main = rootNode.data.text;
// 		const context = nodes.map((node) => node.data.text);

// 		return {
// 			main,
// 			context,
// 		};
// 	},
// 	setReactFlowWrapper: (ref: RefObject<HTMLDivElement | undefined>) => {
// 		set({
// 			reactFlowWrapper: ref,
// 		});
// 	},
// 	onNodesChange: (changes: Array<NodeChange>) => {
// 		const sureChanges = changes.filter((change) => !(change.type === 'remove' && change.id === 'root'));
// 		const newNodes = applyNodeChanges(sureChanges, get().nodes);

// 		set({
// 			nodes: newNodes,
// 		});
// 	},
// 	onEdgesChange: (changes: Array<EdgeChange>) => {
// 		const newEdges = applyEdgeChanges(changes, get().edges);
// 		set({
// 			edges: newEdges,
// 		});
// 	},
// 	onConnectStart: (event: ReactMouseEvent | ReactTouchEvent, params: OnConnectStartParams) => {
// 		if ((event.target as any).classList.contains('source')) {
// 			set({
// 				connectionNodeId: params.nodeId,
// 			});
// 		}
// 	},
// 	onConnectEnd: (event: any) => {
// 		const targetIsPane = event.target.classList.contains('react-flow__pane');
// 		const connectingNodeId = get().connectionNodeId!;
// 		const reactFlowWrapper = get().reactFlowWrapper;

// 		const selectedPaletteId = getConfigKey('palette');
// 		let selectedPalette = palettes.find((palette) => palette.id === selectedPaletteId)!;

// 		if (targetIsPane && connectingNodeId && reactFlowWrapper?.current) {
// 			// we need to remove the wrapper bounds, in order to get the correct position
// 			const { top, left } = reactFlowWrapper.current.getBoundingClientRect();

// 			const { project } = get().instance!;
// 			const id = nextId();

// 			const newNode: Node = {
// 				id,
// 				type: 'topicNode',
// 				// we are removing the half of the node width (75) to center the new node
// 				position: project({
// 					x: event.clientX - left - 100,
// 					y: event.clientY - top,
// 				}),
// 				data: {
// 					text: 'sub',
// 					type: SUBTOPIC,
// 					parentId: connectingNodeId,
// 				},
// 			};

// 			set({
// 				nodes: get().nodes.concat(newNode),
// 				edges: get().edges.concat({
// 					id: nextId(),
// 					source: connectingNodeId,
// 					target: id,
// 				}),
// 				connectionNodeId: null,
// 			});

// 			get().applyPalette(selectedPalette);
// 		}
// 	},
// 	onConnect: ({ source, target }) => {
// 		const { nodes, edges } = get();

// 		// Check if the target node already has a parent
// 		const targetNode = nodes.find(node => node.id === target);
// 		if (targetNode?.data?.parentId) {
// 			console.warn(`Node ${target} already has a parent.`);
// 			return;
// 		}

// 		// Create a new edge
// 		const newEdge: Edge = {
// 			id: nextId(),
// 			source,
// 			target
// 		};

// 		// Find the source node
// 		const parentNode = nodes.find(node => node.id === source);
// 		const childNodeIndex = nodes.findIndex(node => node.id === target);

// 		if (parentNode && childNodeIndex !== -1) {
// 			// Update the child node's style to match the parent node's style
// 			const updatedChildNode = {
// 				...nodes[childNodeIndex],
// 				style: {
// 					...parentNode.style,
// 				},
// 				data: {
// 					...nodes[childNodeIndex].data,
// 					parentId: source,
// 				},
// 			};

// 			const updatedNodes = [...nodes];
// 			updatedNodes[childNodeIndex] = updatedChildNode;

// 			set({
// 				nodes: updatedNodes,
// 				edges: [...edges, newEdge],
// 			});
// 		}
// 	},

// 	updateInnerType: (nodeId: string, type: string) => {
// 		const newNodes = get().nodes.map((node) => {
// 			if (node.id === nodeId) {
// 				node.data = { ...node.data, type };
// 			}

// 			return node;
// 		});

// 		set({
// 			nodes: newNodes,
// 		});
// 	},
// 	updateText: (nodeId: string, text: string) => {
// 		const newNodes = get().nodes.map((node) => {
// 			if (node.id === nodeId) {
// 				node.data = { ...node.data, text };
// 			}

// 			return node;
// 		});

// 		set({
// 			nodes: newNodes,
// 		});
// 	},
// 	addChildrenNodes: (nodeId: string, type: string, data: Array<any>) => {
// 		const node = get().nodes.find((node) => node.id == nodeId)!;

// 		const selectedPaletteId = getConfigKey('palette');
// 		let selectedPalette = palettes.find((palette) => palette.id === selectedPaletteId)!;

// 		if (data.length === 0) {
// 			return;
// 		}

// 		const newNodes = generateNodes(type, node, data);

// 		const newEdges = generateEdges(node.id, newNodes);

// 		const allNodes = [...get().nodes, ...newNodes];
// 		const allEdges = [...get().edges, ...newEdges];

// 		set({ nodes: [...allNodes] });
// 		set({ edges: [...allEdges] });

// 		get().applyPalette(selectedPalette);
// 	},
// 	removeElement: (nodeId: string) => {
// 		const node = get().nodes.find((node) => node.id == nodeId)!;

// 		const instance = get().instance;
// 		if (!instance) {
// 			return;
// 		}

// 		instance.deleteElements({ nodes: [node] });
// 	},
// 	applyPalette: (palette: PaletteElement) => {
// 		const instance = get().instance;
// 		if (!instance) {
// 			return;
// 		}

// 		const graph = new Graph();

// 		const nodes = get().nodes;
// 		const edges = get().edges;

// 		nodes.forEach((node) => {
// 			graph.addNode(node.id, node);
// 		});

// 		edges.forEach((edge) => {
// 			graph.addEdge(edge.source, edge.target, {
// 				...edge,
// 			});
// 		});

// 		const colorMap: ColorMap = {};
// 		let colorIndex = 0;

// 		graph.forEachNode((nodeId, attributes) => {
// 			const parentNodeAttributes = attributes.data.parentId ? graph.getNodeAttributes(attributes.data.parentId) : null;

// 			const parentColor = parentNodeAttributes ? colorMap[parentNodeAttributes.id] : null;

// 			if (nodeId === 'root') {
// 				if (palette.root && typeof palette.root.buildStyles === 'function') {
// 					graph.setNodeAttribute(nodeId, 'style', {
// 						...attributes.style,
// 						...palette.root.buildStyles(),
// 					});
// 				}
// 				return;
// 			}

// 			if (!parentColor) {
// 				colorMap[nodeId] = palette.colors[colorIndex];
// 				colorIndex = (colorIndex + 1) % palette.colors.length;
// 			} else {
// 				colorMap[nodeId] = parentColor;
// 			}

// 			const color = colorMap[nodeId];

// 			graph.setNodeAttribute(nodeId, 'style', {
// 				...attributes.style,
// 				...palette.node.buildStyles(color),
// 			});
// 		});

// 		graph.forEachEdge((edgeId, attributes) => {
// 			const sourceColor = colorMap[attributes.source];
// 			const targetColor = colorMap[attributes.target];

// 			const color = sourceColor || targetColor;

// 			graph.mergeEdgeAttributes(attributes.source, attributes.target, {
// 				...attributes,
// 				type: 'customizable',
// 				animated: false,
// 				style: {
// 					...attributes.style,
// 					...palette.edge.buildStyles(color),
// 				},
// 			});
// 		});

// 		const exported = graph.export();

// 		const newNodes = exported.nodes.map((node) => node.attributes) as Node[];
// 		const newEdges = exported.edges.map((edge) => edge.attributes) as Edge[];

// 		set({ nodes: newNodes, edges: newEdges });
// 	},
// 	createInitialNode: (projectName: string) => {
// 		const id = nextId();
// 		const initialNode: Node = {
// 			id,
// 			type: 'initialNodeType',
// 			position: { x: 0, y: 0 },
// 			data: { text: 'Initial Node' },
// 		};

// 		set({
// 			nodes: [initialNode],
// 			edges: [],
// 			viewport: { x: 0, y: 0, zoom: 1 },
// 		});

// 		saveProjectKey('map', {
// 			nodes: [initialNode],
// 			edges: [],
// 			viewport: { x: 0, y: 0, zoom: 1 },
// 			projectName,
// 		});
// 	},
// 	addNode: (type: string, position: { x: number, y: number }) => {
// 		const id = nextId();
// 		const newNode: Node = {
// 			id,
// 			type: type,
// 			position,
// 			data: { type: "2", text: "sub" },
// 			style: {
// 				backgroundColor: "#fff",
// 				borderColor: "#0b132b",
// 				borderRadius: "10px",
// 				borderStyle: "solid",
// 				borderWidth: 1,
// 				color: "#1E293B",
// 			}
// 		};

// 		set({
// 			nodes: get().nodes.concat(newNode),
// 		});
// 	},
// }));

// export default useMapStore;


import { create } from 'zustand';
import {
	applyEdgeChanges,
	applyNodeChanges,
	Edge,
	EdgeChange,
	Node,
	NodeChange,
	OnNodesChange,
	OnEdgesChange,
	OnConnectStartParams,
	ReactFlowInstance,
	Viewport,
	OnConnect,
	HandleElement,
} from 'reactflow';
import Graph from 'graphology';

import { findLeafNodes, generateEdges, generateNodes } from '@/utils/node';
import { MouseEvent as ReactMouseEvent, RefObject, TouchEvent as ReactTouchEvent } from 'react';
import { SUBTOPIC } from '@/utils/constants/headerTypes';
import { nextId } from '@/utils/id';
import { getConfigKey, loadMapData, updateConfig, saveProjectKey, createNewProject } from '@/utils/storage';
import { PaletteElement } from '@/utils/types';
import { palettes } from '@/data/defaultPalettes';

type ColorMap = {
	[key: string]: string;
};

export type RFState = {
	instance: ReactFlowInstance | null;
	onInit: (instance: ReactFlowInstance) => void;
	configuration: Record<string, any>;
	RequestContent: string
	OpenAIContent: string
	DefaultAssistantContent: string
	DefaultThreadIDContent: string
	Commands: Array<any>
	nodes: Node[];
	edges: Edge[];
	loadFromStorage: () => void;
	loadFreemind: () => void;
	viewport: Viewport;
	connectionNodeId: string | null;
	reactFlowWrapper: RefObject<HTMLDivElement | undefined> | null;
	setReactFlowWrapper: (ref: RefObject<HTMLDivElement | undefined>) => void;
	onNodesChange: OnNodesChange;
	onEdgesChange: OnEdgesChange;
	onConnectStart: (event: ReactMouseEvent | ReactTouchEvent, params: OnConnectStartParams) => void;
	onConnectEnd: (event: MouseEvent | TouchEvent) => void;
	onConnect: OnConnect;
	updateText: (nodeId: string, text: string) => void;
	updateInnerType: (nodeId: string, text: string) => void;
	addChildrenNodes: (nodeId: string, type: string, data: Array<any>) => void;
	getNodeContext: (nodeId: string) => { main: string; context: Array<string> };
	removeElement: (nodeId: string) => void;
	applyPalette: (palette: PaletteElement) => void;
	createInitialNode: (projectName: string, type: string) => void;
	addNode: (type: string, position: { x: number, y: number }, text: string) => void;
};

const useMapStore = create<RFState>((set, get) => ({
	instance: null,
	onInit: (instance: ReactFlowInstance) => {
		set({
			instance,
		});

		get().loadFromStorage();
	},
	viewport: {
		x: 0,
		y: 0,
		zoom: 1,
	},
	nodes: [],
	edges: [],
	configuration: {},
	RequestContent: '',
	OpenAIContent: "",
	DefaultAssistantContent: "",
	DefaultThreadIDContent: "",
	Commands: [],
	reactFlowWrapper: null,
	connectionNodeId: null,
	loadFromStorage: () => {
		const data = loadMapData();

		const instance = get().instance;
		if (!instance) {
			return;
		}

		set({
			nodes: data.nodes,
			edges: data.edges,
			viewport: data.viewport,
		});

		const selectedPaletteId = getConfigKey('palette');
		let selectedPalette = palettes.find((palette) => palette.id === selectedPaletteId)!;

		get().applyPalette(selectedPalette);
	},
	loadFreemind: () => {
		const data = loadMapData();

		const instance = get().instance;
		if (!instance) {
			return;
		}

		set({
			nodes: data.nodes,
			edges: data.edges,
			viewport: data.viewport,
			configuration: {
				RequestContent: "",
				OpenAIContent: "",
				DefaultAssistantContent: "",
				DefaultThreadIDContent: "",
				Commands: []
			}
		});

		const selectedPaletteId = getConfigKey('palette');
		let selectedPalette = palettes.find((palette) => palette.id === selectedPaletteId)!;

		get().applyPalette(selectedPalette);
	},
	getNodeContext: (nodeId: string) => {
		const nodes = findLeafNodes(get().nodes, nodeId).reverse();

		const rootNode = nodes.shift()!;
		const main = rootNode.data.text;
		const context = nodes.map((node) => node.data.text);

		return {
			main,
			context,
		};
	},
	setReactFlowWrapper: (ref: RefObject<HTMLDivElement | undefined>) => {
		set({
			reactFlowWrapper: ref,
		});
	},
	onNodesChange: (changes: Array<NodeChange>) => {
		const sureChanges = changes.filter((change) => !(change.type === 'remove' && change.id === 'root'));
		const newNodes = applyNodeChanges(sureChanges, get().nodes);

		set({
			nodes: newNodes,
		});
	},
	onEdgesChange: (changes: Array<EdgeChange>) => {
		const newEdges = applyEdgeChanges(changes, get().edges);
		set({
			edges: newEdges,
		});
	},
	onConnectStart: (event: ReactMouseEvent | ReactTouchEvent, params: OnConnectStartParams) => {
		if ((event.target as any).classList.contains('source')) {
			set({
				connectionNodeId: params.nodeId,
			});
		}
	},
	onConnectEnd: (event: any) => {
		const targetIsPane = event.target.classList.contains('react-flow__pane');
		const connectingNodeId = get().connectionNodeId!;
		const reactFlowWrapper = get().reactFlowWrapper;

		const selectedPaletteId = getConfigKey('palette');
		let selectedPalette = palettes.find((palette) => palette.id === selectedPaletteId)!;

		if (targetIsPane && connectingNodeId && reactFlowWrapper?.current) {
			const { top, left } = reactFlowWrapper.current.getBoundingClientRect();

			const { project } = get().instance!;
			const id = nextId();

			const newNode: Node = {
				id,
				type: 'topicNode',
				position: project({
					x: event.clientX - left,
					y: event.clientY - top,
				}),
				data: {
					text: 'sub',
					type: SUBTOPIC,
					parentId: connectingNodeId,
				},
			};

			set({
				nodes: get().nodes.concat(newNode),
				edges: get().edges.concat({
					id: nextId(),
					source: connectingNodeId,
					target: id,
				}),
				connectionNodeId: null,
			});

			get().applyPalette(selectedPalette);
		}
	},
	onConnect: ({ source, target }) => {
		const { nodes, edges } = get();

		const targetNode = nodes.find(node => node.id === target);
		if (targetNode?.data?.parentId) {
			console.warn(`Node ${target} already has a parent.`);
			return;
		}

		const newEdge: Edge = {
			id: nextId(),
			source,
			target
		};

		const parentNode = nodes.find(node => node.id === source);
		const childNodeIndex = nodes.findIndex(node => node.id === target);

		if (parentNode && childNodeIndex !== -1) {
			const updatedChildNode = {
				...nodes[childNodeIndex],
				style: {
					...parentNode.style,
				},
				data: {
					...nodes[childNodeIndex].data,
					parentId: source,
				},
			};

			const updatedNodes = [...nodes];
			updatedNodes[childNodeIndex] = updatedChildNode;

			set({
				nodes: updatedNodes,
				edges: [...edges, newEdge],
			});
		}
	},
	updateInnerType: (nodeId: string, type: string) => {
		const newNodes = get().nodes.map((node) => {
			if (node.id === nodeId) {
				node.data = { ...node.data, type };
			}

			return node;
		});

		set({
			nodes: newNodes,
		});
	},
	updateText: (nodeId: string, text: string) => {
		const newNodes = get().nodes.map((node) => {
			if (node.id === nodeId) {
				node.data = { ...node.data, text };
			}

			return node;
		});

		set({
			nodes: newNodes,
		});
	},
	addChildrenNodes: (nodeId: string, type: string, data: Array<any>) => {
		const node = get().nodes.find((node) => node.id == nodeId)!;

		const selectedPaletteId = getConfigKey('palette');
		let selectedPalette = palettes.find((palette) => palette.id === selectedPaletteId)!;

		if (data.length === 0) {
			return;
		}

		const newNodes = generateNodes(type, node, data);

		const newEdges = generateEdges(node.id, newNodes);

		const allNodes = [...get().nodes, ...newNodes];
		const allEdges = [...get().edges, ...newEdges];

		set({ nodes: [...allNodes] });
		set({ edges: [...allEdges] });

		get().applyPalette(selectedPalette);
	},
	removeElement: (nodeId: string) => {
		const node = get().nodes.find((node) => node.id == nodeId)!;

		const instance = get().instance;
		if (!instance) {
			return;
		}

		instance.deleteElements({ nodes: [node] });
	},
	applyPalette: (palette: PaletteElement) => {
		const instance = get().instance;
		if (!instance) {
			return;
		}

		const graph = new Graph();

		const nodes = get().nodes;
		const edges = get().edges;

		nodes.forEach((node) => {
			graph.addNode(node.id, node);
		});

		edges.forEach((edge) => {
			graph.addEdge(edge.source, edge.target, {
				...edge,
			});
		});

		const colorMap: ColorMap = {};
		let colorIndex = 0;

		graph.forEachNode((nodeId, attributes) => {
			const parentNodeAttributes = attributes.data.parentId ? graph.getNodeAttributes(attributes.data.parentId) : null;

			const parentColor = parentNodeAttributes ? colorMap[parentNodeAttributes.id] : null;

			if (nodeId === 'root') {
				graph.setNodeAttribute(nodeId, 'style', {
					backgroundColor: "#fff",
					borderColor: "#0b132b",
					borderRadius: "10px",
					borderStyle: "solid",
					borderWidth: 1,
					color: "#1E293B",
				});

				return;
			}

			if (!parentColor) {
				colorMap[nodeId] = palette.colors[colorIndex];
				colorIndex = (colorIndex + 1) % palette.colors.length;
			} else {
				colorMap[nodeId] = parentColor;
			}

			const color = colorMap[nodeId];

			graph.setNodeAttribute(nodeId, 'style', {
				...attributes.style,
				...palette.node.buildStyles(color),
			});
		});

		graph.forEachEdge((edgeId, attributes) => {
			const sourceColor = colorMap[attributes.source];
			const targetColor = colorMap[attributes.target];

			const color = sourceColor || targetColor;

			graph.mergeEdgeAttributes(attributes.source, attributes.target, {
				...attributes,
				type: 'customizable',
				animated: false,
				style: {
					...attributes.style,
					...palette.edge.buildStyles(color),
				},
			});
		});

		const exported = graph.export();

		const newNodes = exported.nodes.map((node) => node.attributes) as Node[];
		const newEdges = exported.edges.map((edge) => edge.attributes) as Edge[];

		set({ nodes: newNodes, edges: newEdges });
	},
	createInitialNode: (projectName: string, type: string) => {
		const newProject = createNewProject(projectName, type);

		set({
			nodes: newProject.map.nodes,
			edges: newProject.map.edges,
			viewport: newProject.map.viewport,
		});
	},
	addNode: (type: string, position: { x: number, y: number }, text: string) => {
		const id = nextId();
		const newNode: Node = {
			id,
			type: type,
			position,
			data: { type: "2", text: text },
			style: {
				backgroundColor: "#fff",
				borderColor: "#0b132b",
				borderRadius: "10px",
				borderStyle: "solid",
				borderWidth: 1,
				color: "#1E293B",
			}
		};

		set({
			nodes: get().nodes.concat(newNode),
		});
	},
}));

export default useMapStore;
