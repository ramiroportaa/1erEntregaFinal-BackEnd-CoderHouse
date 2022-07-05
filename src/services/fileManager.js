import fs from "fs";
import __dirname from "../utils.js";

const read = async( fileName )=>{
    try {
        const data = await fs.promises.readFile(`${__dirname}/db/${fileName}`, "utf-8") || "[]";
        const dataJSON = JSON.parse(data);
        return dataJSON;
    } catch (error) {
        console.log(`error reading file "${fileName}": ${error}`);
    }
}

const write = async( fileName, data )=>{
    try {
        await fs.promises.writeFile(`${__dirname}/db/${fileName}`, JSON.stringify(data, null, 2));
    } catch (error) {
        console.log(`error writing file "${fileName}": ${error}`);
    }
}


export default {
    read,
    write
}