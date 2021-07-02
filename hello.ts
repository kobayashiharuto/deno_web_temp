import { Application, Router } from "https://deno.land/x/oak@v7.7.0/mod.ts";

const router = new Router();

router
  .get("/", (context) => {
    context.response.body = "Hello Deno!";
  })
  .get("/fetch", async (context) => {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon/ditto/").then(
      (res) => res.json(),
    );
    context.response.body = JSON.stringify(res, null, 4);
  });

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8080 });
