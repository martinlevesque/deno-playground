// Intro:
// https://deno.land/std/manual.md

import { httpServe, last }  from "./package.js";

// importing 



console.log("testttt last of [1,2,3,4]")
console.log(last([1,2,3,4]));

const s = httpServe({ port: 8000 });

console.log("http://localhost:8000/");

async function getReqFile(path) {
  const response = {
    status: 200,
    body: ""
  };

  try {
    response.body = await Deno.readFile(path)
  } catch(err) {
    response.status = 404;
    response.body = `${err}`
  }
  
  return response
}

function internalRenderedFile(method, url) {
  const parts = url.split("/");

  return "." + parts.map((part, index) => {
    return index === parts.length - 1 ? `${method}.${part}` : part
  })
  .join("/")
}

const router = {
  what: {
    is: {
      that: {
        html: {
          GET: async (params) => {
            console.log(`hi world...`)

            return {
              nothing: true
            }
          }
        }
      }
    }
  }
}

function route(method, url) {
  const objectPath = "router" + url
    .split("/")
    .join(".")
    + `.${method}`


  console.log(`objectPath `, objectPath)
}

for await (const req of s) {
  console.log(`reqo`)

  const toRender = internalRenderedFile(req.method, req.url)
  route(req.method, req.url)

  console.log(`req -> `, req.headers)

  console.log(`ff `, toRender);

  req.respond(await getReqFile(toRender));
}
