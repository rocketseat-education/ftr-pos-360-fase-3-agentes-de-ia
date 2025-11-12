import { Annotation, StateGraph, START, END } from "@langchain/langgraph";
import fs from "fs";

const State = Annotation.Root({
    input: Annotation<string>,
    outMatheus: Annotation<string>,
    outJuliana: Annotation<string>
});

const mockAction = (state: typeof State) => {
    return {
        outMatheus: "Matheus disse 'oi!'",
    };
}

const mockAction2 = (state: typeof State) => {
    return {
        outJuliana: "Juliana disse 'oi!'",
    };
}

const graph = new StateGraph(State)
    .addNode("matheus", mockAction)
    .addNode("juliana", mockAction2)
    .addEdge(START, "matheus")
    .addEdge("matheus", "juliana")
    .addEdge("juliana", END)
    .compile()

const result = await graph.invoke({ input: "olá!"});

console.log(result);

const drawableGraph = await graph.getGraphAsync();
const graphImage = await drawableGraph.drawMermaidPng();
const graphArrayBuffer = await graphImage.arrayBuffer();

fs.writeFileSync("./graph.png", new Uint8Array(graphArrayBuffer));
