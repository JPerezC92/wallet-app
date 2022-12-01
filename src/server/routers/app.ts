import { ctx } from "@/src/server/context";
import { docsRouter } from "@/src/server/routers/docs";
import { frameworksRouter } from "@/src/server/routers/frameworks";

export const app = ctx.nextApp();

app.use("/api/v1", frameworksRouter, docsRouter);
