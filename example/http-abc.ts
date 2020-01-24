
import { abc, Context } from "https://deno.land/x/abc/mod.ts";
import { renderFile } from "https://deno.land/x/dejs/mod.ts";

const app = abc();

app.renderer = {
  render<T>(name: string, data: T): Promise<Deno.Reader> {
    return renderFile(name, data);
  }
};

app
  .get("/", (c: Context): Promise<void> =>
    c.render("./index.html", { name: "asdf", aList: [1,2,3,4] })
  )
  .start({ port: 8000 });

console.log(`server listening on 8080`);