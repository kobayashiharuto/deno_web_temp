import {
  Application,
  Router,
  send,
} from "https://deno.land/x/oak@v6.2.0/mod.ts";
import {
  adapterFactory,
  engineFactory,
  viewEngine,
} from "https://deno.land/x/view_engine@v1.4.5/mod.ts";

const oakAdapter = adapterFactory.getOakAdapter();
const ejsEngine = engineFactory.getEjsEngine();

const app = new Application();
const router = new Router();

app.use(viewEngine(oakAdapter, ejsEngine));

// Static content
app.use(async (context, next) => {
  await send(context, context.request.url.pathname, {
    root: `${Deno.cwd()}/public/static`,
  });
  next();
});

router.get("/", (context) => {
  context.render("public/views/index.html");
});

app.use(router.routes());
app.use(router.allowedMethods());
app.listen({ port: 8000 });
