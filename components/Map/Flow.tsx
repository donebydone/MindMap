'use client';

import React, { useEffect, useRef, useState, DragEvent, MouseEvent } from 'react';
import 'reactflow/dist/style.css';
import ReactFlow, { Background, Controls, MiniMap, addEdge, OnConnect, Node, OnNodesChange, OnEdgesChange } from 'reactflow';
import useMapStore, { RFState } from '@/stores/mapStore';
import { shallow } from 'zustand/shallow';
import { nodeTypes } from '@/data/defaultNodes';
import { edgeTypes } from '@/data/defaultEdges';
import DataSaver from './Plugins/DataSaver';
import TopPanel from './Panel/TopPanel/TopPanel';
import NodePalette from './NodePalette';
import { MinusCircleOutlined, FullscreenOutlined, PlusCircleOutlined } from '@ant-design/icons';
import ContextMenu from './ContextMenu/ContextMenu';

const panOnDrag = [1, 2];

const selector = (state: RFState) => ({
	nodes: state.nodes,
	edges: state.edges,
	viewport: state.viewport,
	onNodesChange: state.onNodesChange,
	onEdgesChange: state.onEdgesChange,
	onConnectStart: state.onConnectStart,
	onConnectEnd: state.onConnectEnd,
	setReactFlowWrapper: state.setReactFlowWrapper,
	onInit: state.onInit,
	addNode: state.addNode,
	onConnect: state.onConnect,
});

const fitViewOptions = {
	padding: 3,
};

function Flow() {
	const reactFlowWrapper = useRef<HTMLDivElement | null>(null);
	const [firstItem, setFirstItem] = useState<any>(null);
	const [showCommandBar, setShowCommandBar] = useState<Boolean>(true);
	const [menuPosition, setMenuPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
	const [showMenu, setShowMenu] = useState(false);
	const [selectedNode, setSelectedNode] = useState<Node | null>(null);

	const {
		nodes,
		edges,
		viewport,
		onNodesChange,
		onEdgesChange,
		onConnectStart,
		onConnectEnd,
		setReactFlowWrapper,
		onInit,
		addNode,
		onConnect,
	} = useMapStore(selector, shallow);

	useEffect(() => {
		setReactFlowWrapper(reactFlowWrapper);
	}, [setReactFlowWrapper]);

	useEffect(() => {
		const updateLocalStorage = () => {
			const storedData = JSON.parse(localStorage.getItem('mentalist-data') || '[]');
			if (storedData.length > 0) {
				setFirstItem(storedData[0]);
			}
		};

		window.addEventListener('localStorageUpdate', updateLocalStorage);

		return () => {
			window.removeEventListener('localStorageUpdate', updateLocalStorage);
		};
	}, []);

	const onDragOver = (event: DragEvent) => {
		event.preventDefault();
		event.dataTransfer.dropEffect = 'move';
	};

	const onDrop = (event: DragEvent) => {
		event.preventDefault();

		if (!reactFlowWrapper.current) return;

		const { top, left } = reactFlowWrapper.current.getBoundingClientRect();
		const data = JSON.parse(event.dataTransfer.getData('application/reactflow'));

		const position = {
			x: event.clientX - left,
			y: event.clientY - top,
		};

		if (typeof data.type === 'undefined' || !data.type) {
			return;
		}

		addNode(data.type, position, data.CommandName);
	};

	const onNodeContextMenu = (event: MouseEvent, node: Node) => {
		event.preventDefault();
		setMenuPosition({ x: event.clientX, y: event.clientY });
		setSelectedNode(node);
		setShowMenu(true);
	};

	const onNodeClick = () => {
		setShowMenu(false);
	};

	const handleAddIdea = () => {
		// Add logic for adding an empty idea
	};

	const handleAddContext = () => {
		// Add logic for adding an empty context
	};

	const handleAddContent = () => {
		// Add logic for adding an empty content
	};

	const handleDelete = () => {
		// Add logic for deleting the selected node
	};

	const handleCommand1 = () => {
		// Add logic for Command1
	};

	return (
		<>
			<div className="absolute left-30 top-[150px] w-[280px] h-[400px] z-10">
				<div className="border-[1px] border-[solid] border-black h-[40px] w-full relative flex justify-center items-center bg-white">
					<h1>Command Bar</h1>
					<div className="absolute right-0 top-0 w-[75px] h-full flex justify-between items-center px-[15px]">
						{showCommandBar ? (
							<MinusCircleOutlined onClick={() => setShowCommandBar(false)} />
						) : (
							<PlusCircleOutlined onClick={() => setShowCommandBar(true)} />
						)}
						<FullscreenOutlined />
					</div>
				</div>
				{showCommandBar ? <NodePalette /> : <></>}
			</div>
			<div className="w-full h-full bg-slate-100" ref={reactFlowWrapper} onDragOver={onDragOver} onDrop={onDrop}>
				<ReactFlow
					onInit={onInit}
					nodeTypes={nodeTypes}
					edgeTypes={edgeTypes}
					nodes={nodes}
					edges={edges}
					defaultViewport={viewport}
					onNodesChange={onNodesChange as OnNodesChange}
					onEdgesChange={onEdgesChange as OnEdgesChange}
					selectionOnDrag
					fitView
					panOnDrag={panOnDrag}
					onConnectStart={onConnectStart}
					onConnectEnd={onConnectEnd}
					fitViewOptions={fitViewOptions}
					onConnect={onConnect as OnConnect}
					onNodeContextMenu={onNodeContextMenu}
					onNodeClick={onNodeClick}
				>
					<Background />
					<Controls />
					<MiniMap zoomable pannable />
					<DataSaver />
					<TopPanel />
				</ReactFlow>
				{showMenu && (
					<ContextMenu
						position={menuPosition}
						onClose={() => setShowMenu(false)}
						onAddIdea={handleAddIdea}
						onAddContext={handleAddContext}
						onAddContent={handleAddContent}
						onDelete={handleDelete}
						onCommand1={handleCommand1}
					/>
				)}
			</div>
		</>
	);
}

export default Flow;
