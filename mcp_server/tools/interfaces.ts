import type { ZodRawShape } from "zod";
import { z } from "zod";

export interface Tool {
  function: (args: any) => any,
  declaration: {
    name: string,
    description: string,
    parameters?: ZodRawShape
  }
}