import { readFileLines } from '../utils.ts';

export function day05_01() {
    const lines = readFileLines('/day05/input.txt');
    let stackSection = true;
    const stacks = [[] as string[]];

    for (const line of lines) {
        if (line === '') {
            stackSection = !stackSection;
            stacks.forEach((stack) => stack.reverse());
            continue;
        }

        // First section - storing stacks
        if (stackSection) {
            let index = 0;
            for (let i = index; i < line.length; i += 4) {
                let chunk = line.slice(i, i + 3);
                chunk = chunk.replaceAll(' ', '');
                if (stacks[index] === undefined) {
                    stacks[index] = [chunk];
                } else {
                    stacks[index].push(chunk);
                }

                index++;
            }
        } // second section - moving items
        else {
            const split: string[] = line.split(' ');
            const quantity = Number(split[1]);
            const from = Number(split[3]) - 1;
            const to = Number(split[5]) - 1;

            //console.log(stacks);
            //console.log('Take', quantity, 'x from', from, 'and put to', to);
            loopArray(stacks[from], stacks[to], quantity, stacks[from].length - 1, 0);
            //console.log('New Stack', stacks);
        }

        //console.log("==== EOL REACHED === \n\n")
    }

    let solution = ""
    for (const stack of stacks) {
        const index =
            stack.indexOf('') === -1 ? stack.length - 1 : stack.indexOf('') - 1;
        solution += stack[index].replace('[', '').replace(']', '');
    }

    console.log("Soltion:", solution);
    
}

export function day05_02() { }

function loopArray(fromArray: string[], toArray: string[], quantity: number, i: number, count: number): any {
    const elem = fromArray[i];
    //console.log('From:', fromArray, 'To:', toArray, 'Index:', i);
    //console.log('Element:', elem);
    if (elem === '' || undefined) {
        //console.log('Element empty, skip.');
        return loopArray(fromArray, toArray, quantity, i - 1, count);
    }

    if (count === quantity) {
        //console.log('Quantity reached, skip.');
        
        return;
    }

    //console.log('toArray[i]', toArray[i]);
    const firstFreeIndex = toArray.indexOf('');
    if (firstFreeIndex === -1) {
        //console.log("undefined, push new");
        
        toArray.push(elem);
        //console.log("New ToArray:", toArray);
    } else {
        toArray[firstFreeIndex] = elem
        
        //console.log('New ToArray:', toArray);
    }

    fromArray[i] = '';
    //console.log("Removed from FromArray:", fromArray);
    //console.log('------ ITERATION END --------------\n');

    return loopArray(fromArray, toArray, quantity, i - 1, count + 1);
}