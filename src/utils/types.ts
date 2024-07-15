import { CSSProperties } from 'react';
import { ReactFlowJsonObject } from 'reactflow';

export interface DataState {
	type: string;
	version: string;
	map: MapState;
	config?: Config;
	configuration: Configuration;
	projectName: string;
	requestContent: string
}

export interface ExportedDataState {
	type: string;
	version: string;
	map: MapState;
	config?: Config;
}

export interface Configuration {
	openAIContent: string;
	defaultAssistantContent: string;
	defaultThreadIDContent: string;
	commands: Commands[]
}

export interface checkState {
	context: boolean;
	content: boolean;
	idea: boolean
}

export interface Commands {
	commandName: string;
	commandShortcut: string;
	assistantId: string;
	threadId: string;
	commands: string;
	select: string;
	brothers: checkState;
	parent: checkState;
	all: checkState;
	commandKey: string;
}

export interface ReturnCommand {
	commandName: string;
	commandShortcut: string;
	assistantId: string;
	threadId: string;
	commands: string;
	select: string;
	ideas: string[];
	context: string[];
	content: string[];
};

export interface ImportedDataState {
	type?: string;
	version?: number;
	map?: MapState;
	config?: Config;
}

export interface MapState extends ReactFlowJsonObject {
	nodes: NodeElement[];
	edges: EdgeElement[];
	viewport: ViewportState;
}

export interface NodeElement {
	width: number;
	height: number;
	id: string;
	data: any;
	position: {
		x: number;
		y: number;
	};
	type: string;
	selected: boolean;
	dragging: boolean;
	positionAbsolute: {
		x: number;
		y: number;
	};
}

export interface EdgeElement {
	id: string;
	source: string;
	target: string;
	style: any;
}

export interface ViewportState {
	x: number;
	y: number;
	zoom: number;
}

export interface PaletteElement {
	id: string;
	name: string;
	colors: string[];
	root: {
		buildStyles: () => PaletteElementNodeStyles;
	};
	node: {
		buildStyles: (color: string) => PaletteElementNodeStyles;
	};
	edge: {
		buildStyles: (color: string) => PaletteElementEdgeStyles;
		type: string;
	};
}

export interface PaletteElementNodeStyles extends CSSProperties { }

export interface PaletteElementEdgeStyles extends CSSProperties { }

export interface Config {
	palette?: string;
}

export interface LocalStorageKeys {
	openKey: 'mentalist-openaiKey';
	apiModel: 'mentalist-apiModel';
}
