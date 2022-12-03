import { readFileLines } from "../utils.ts";

const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function day03_01() {
    const lines = readFileLines('/day03/input.txt');
    let sum = 0;
    for (const line of lines) {
        const share: string[] = []
        const firstComp = line.slice(0, line.length / 2)
        const secondComp = line.slice(line.length / 2).split('')        

        for (const char of firstComp) {
            if (secondComp.find(c => c === char) && !(share.find(c => c === char))) {
                share.push(char)
            }
        }

        for (const elem of share) {
            sum += chars.indexOf(elem) + 1;
        }
    }

    console.log(sum);
    
}

export function day03_02() {

}