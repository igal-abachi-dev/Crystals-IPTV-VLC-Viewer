import React, {useState,useCallback} from 'react';


import {row, counterTheme} from './ChessGraph.css';
import {vcn} from 'vanilla-classnames'

import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks";

export type nullable<T> = (T | null | undefined);

import ReactFlow, {MiniMap, Controls, applyEdgeChanges, applyNodeChanges ,ReactFlowProvider, useReactFlow ,FitViewOptions,Node,Edge} from 'react-flow-renderer';

function FlowControlled({nodes, edges, onNodesChange, onEdgesChange, onConnect}) {

    const [nodes_, setNodes] = useState(nodes);
    const [edges_, setEdges] = useState(edges);

    const onNodesChange_ = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [setNodes]
    );
    const onEdgesChange_ = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [setEdges]
    );

    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
        >
            <MiniMap/>
            <Controls/>
        </ReactFlow>
    );
}

function FlowUncontrolled({nodes, edges}) {
    const [nodes_, setNodes] = useState<Node[]>(nodes);
    const [edges_, setEdges] = useState<Edge[]>(edges);

    //const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    //const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    //const reactFlowInstance = useReactFlow();
    const edgeOptions = {
        animated: true,
        style: {
            stroke: 'white',
        },
    };
    const fitViewOptions: FitViewOptions = {
        padding: 0.5
    }
    const connectionLineStyle = { stroke: 'blue' };
    return (
        <ReactFlow defaultNodes={nodes_} defaultEdges={edges_} fitView

                   fitViewOptions={fitViewOptions}
                   // defaultEdgeOptions={edgeOptions}
                   style={{
                       backgroundColor: '#D3D2E5',
                   }}
                   connectionLineStyle={connectionLineStyle}>
            {/*<MiniMap/>*/}
            {/*<Controls/>*/}
        </ReactFlow>
    );
}

export function ChessGraph({nodes, edges}) {
    //
    // type NodeData = {
    //     value: number;
    // };
    //
    // type CustomNode = Node<NodeData>;
    return (
        // <div className={counterTheme}>
        //     <div className={row }>
        //     </div>
        // </div>

        <div style={{height:"300px"}}>
            <ReactFlowProvider>
                <FlowUncontrolled nodes={nodes} edges={edges}/>
            </ReactFlowProvider>
        </div>
    );

}


