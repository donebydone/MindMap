import { ReactFlowJsonObject } from 'reactflow';
import { loadFromBlob, normalizeFile } from './blob';
import { EXPORT_DATA_TYPES, MIME_TYPES } from './constants/export';
import { fileOpen, fileSave } from './filesystem';
import { Config, Configuration, ExportedDataState, ImportedDataState, MapState } from './types';
import { useState } from 'react';

export const serializeAsJSON = (map: MapState, version: string, config: Config | undefined): string => {
	const data: ExportedDataState = {
		type: EXPORT_DATA_TYPES.mentalist,
		version,
		map,
		config,
	};

	return JSON.stringify(data, null, 2);
};

export const saveAsJSON = async (fileName: string, version: string, map: MapState, config: Config | undefined, extension: string): Promise<void> => {
	const json = JSON.stringify({ version, map, config });
	const blob = new Blob([json], { type: 'application/json' });
	const url = URL.createObjectURL(blob);

	const a = document.createElement('a');
	a.href = url;
	a.download = `${fileName}.${extension}`;
	a.click();
	URL.revokeObjectURL(url);
};

export const saveProjectAsJSON = async (fileName: string, version: string, map: MapState, config: Config | undefined, configuration: Configuration | undefined, projectName: string, extension: string): Promise<void> => {
	const json = JSON.stringify({ version, map, config, projectName, configuration });
	const blob = new Blob([json], { type: 'application/json' });
	const url = URL.createObjectURL(blob);

	const a = document.createElement('a');
	a.href = url;
	a.download = `${fileName}.${extension}`;
	a.click();
	URL.revokeObjectURL(url);
};

export const loadFromJSON = async (): Promise<ImportedDataState> => {
	return new Promise((resolve, reject) => {
		const input = document.createElement('input');
		input.type = 'file';
		input.accept = 'application/json';

		input.onchange = (event: Event) => {
			const file = (event.target as HTMLInputElement).files?.[0];

			if (!file) {
				reject(new Error('No file selected'));
				return;
			}

			const reader = new FileReader();
			reader.onload = (e: ProgressEvent<FileReader>) => {
				try {
					const data = JSON.parse(e.target?.result as string);
					resolve(data as ImportedDataState);
				} catch (err) {
					reject(err);
				}
			};
			reader.readAsText(file);
		};

		input.click();
	});
};

export const loadFromMM = async (): Promise<ImportedDataState> => {
	return new Promise((resolve, reject) => {
		const input = document.createElement('input');
		input.type = 'file';
		input.accept = 'application/mm';

		input.onchange = (event: Event) => {
			const file = (event.target as HTMLInputElement).files?.[0];

			if (!file) {
				reject(new Error('No file selected'));
				return;
			}

			const reader = new FileReader();
			reader.onload = (e: ProgressEvent<FileReader>) => {
				try {
					const data = JSON.parse(e.target?.result as string);
					resolve(data as ImportedDataState);
				} catch (err) {
					reject(err);
				}
			};
			reader.readAsText(file);
		};

		input.click();
	});
};


export const ideas = ['Brother', 'Parent'];
export const defaultIdeasCheckedList = ['Brother', 'Parent'];
export const context = ['Brother', 'Parent'];
export const defaultContextCheckedList = ['Brother', 'Parent'];
export const content = ['Brother', 'Parent'];
export const defaultContentCheckedList = ['Brother', 'Parent'];
