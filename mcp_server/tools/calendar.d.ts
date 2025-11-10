import { ZodRawShape } from "zod";
interface Tool {
    function: (args: any) => any;
    declaration: {
        name: string;
        description: string;
        parameters?: ZodRawShape;
    };
}
declare const allDefinitions: Tool[];
export { allDefinitions };
//# sourceMappingURL=calendar.d.ts.map