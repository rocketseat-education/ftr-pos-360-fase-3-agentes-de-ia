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

const supervisor = (state: typeof State.State) => {
    console.log("Supervisor escolhendo o próximo");
    return {
        executedNodes: 1,
        output: [new AIMessage("Olá da IA")],
    };
}

const financialSpecialist = (state: typeof State.State) => {
    console.log("Financial specialist chamado");
    return {
        executedNodes: 1,
        output: [new AIMessage("Olá da IA")],
    };
}

const schedulingSpecialist = (state: typeof State.State) => {
    console.log("Scheduling specialist chamado");
    return {
        executedNodes: 1,
        output: [new AIMessage("Olá da IA")],
    };
}

const commsSpecialist = (state: typeof State.State) => {
    console.log("Comms specialist chamado");
    return {
        executedNodes: 1,
        output: [new AIMessage("Olá da IA")],
    };
}

const graph = new StateGraph(State)
    .addNode("supervisor", supervisor)
    .addNode("financial_specialist", financialSpecialist)
    .addNode("scheduling_specialist", schedulingSpecialist)
    .addNode("comms_specialist", commsSpecialist)
    .addEdge(START, "supervisor")
    .addConditionalEdges("supervisor", (state: typeof State.State) => {
        if(state.executedNodes == 0) {
            return "financial_specialist";
        }else if(state.executedNodes == 1){
            return "scheduling_specialist";
        }else if(state.executedNodes == 2){
            return "comms_specialist";
        }else{
            return "END";
        }
    })
    .addEdge("financial_specialist", "supervisor")
    .addEdge("scheduling_specialist", "supervisor")
    .addEdge("comms_specialist", "supervisor")
    .compile()

const result = await graph.invoke({ input: new HumanMessage("olá!")});

console.log(result);

const drawableGraph = await graph.getGraphAsync();
const graphImage = await drawableGraph.drawMermaidPng();
const graphArrayBuffer = await graphImage.arrayBuffer();

fs.writeFileSync("./graph.png", new Uint8Array(graphArrayBuffer));
