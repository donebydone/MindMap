import { palettes } from '@/data/defaultPalettes';
import { loadFromJSON, loadFromMM, saveAsJSON, saveProjectAsJSON } from '@/utils/data';
import { restoreProject, readFullContentArray } from '@/utils/storage';

export const actionSaveFileToDisk = async () => {
	const data = readFullContentArray();

	await saveAsJSON('New Freemind', data[0].version, data[0].map, data[0].config, 'mm');
};

export const actionSaveProjectFileToDisk = async () => {
	const data = readFullContentArray();

	await saveProjectAsJSON('New Project', data[0].version, data[0].map, data[0].config, data[0].configuration, data[0].projectName, 'json');
};

export const actionLoadFileFromDisk = async () => {
	try {
		const data = await loadFromMM();

		if (data.config?.palette == null) {
			data.config = {
				...data.config,
				palette: palettes[0].id,
			};
		}

		restoreProject(data);

		return true;
	} catch (error) {
		console.error(error);
	}

	return false;
};

export const actionLoadProjectFileFromDisk = async () => {
	try {
		const data = await loadFromJSON();

		restoreProject(data);

		return true;
	} catch (error) {
		console.error(error);
	}

	return false;
};
