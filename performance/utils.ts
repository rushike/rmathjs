import * as path from "https://deno.land/std@0.138.0/path/mod.ts";


export function getModuleDir(importMeta: ImportMeta): string {
  return path.resolve(path.dirname(path.fromFileUrl(importMeta.url)));
}

export async function writeJson(filePath : string, o : any) {
  try {
      await Deno.writeTextFile(filePath, JSON.stringify(o));
  } catch(e) {
      console.log(e);
  }
}

export async function readJson(filePath: string) {
  try {
      return JSON.parse(await Deno.readTextFile(filePath));
  } catch(e : any) {
      console.log(filePath+': ', e.message);
  }
}