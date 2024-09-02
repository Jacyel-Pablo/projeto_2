import {resolve} from "path"
import { Database } from "sqlite-async"

// Indo para pasta principal
let path1 = process.cwd().split("\\")
let path = ""

for(let i = 0; i < path1.length - 3; i++) {
    if (i == 0) {
        path += path1[i]

    } else {
        path += "/" + path1[i]

    }
}

const banco = resolve("banco.sqlite")

export default async function conectar() {
    return await Database.open(banco)
}