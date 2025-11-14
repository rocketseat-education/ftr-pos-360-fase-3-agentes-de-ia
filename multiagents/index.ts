import { Annotation, StateGraph, START, END } from "@langchain/langgraph";
import { BaseMessage, AIMessage, HumanMessage } from "@langchain/core/messages";
import fs from "fs";

const State = Annotation.Root({
    input: Annotation<HumanMessage>,
    executedNodes: Annotation<number>({
        reducer: (currExecuted, newExecution) => currExecuted + 1,
        default: () => 0
    }),
    output: Annotation<BaseMessage[]>({
        reducer: (currOutput, newOutput) => currOutput.concat(newOutput),
        default:  () => []
    }),
});

const mockAction = (state: typeof State) => {
    return {
        executedNodes: 1,
        output: [new AIMessage("Olá da IA")],
    };
}

const mockAction2 = (state: typeof State) => {
    return {
        executedNodes: 1,
        output: [new HumanMessage("Olá do humano")],
    };
}

const graph = new StateGraph(State)
    .addNode("matheus", mockAction)
    .addNode("juliana", mockAction2)
    .addEdge(START, "matheus")
    .addEdge("matheus", "juliana")
    .addEdge("juliana", END)
    .compile()

const result = await graph.invoke({ input: new HumanMessage("olá!")});

console.log(result);

const drawableGraph = await graph.getGraphAsync();
const graphImage = await drawableGraph.drawMermaidPng();
const graphArrayBuffer = await graphImage.arrayBuffer();

fs.writeFileSync("./graph.png", new Uint8Array(graphArrayBuffer));
