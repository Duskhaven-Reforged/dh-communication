import * as fs from 'fs';
import * as readline from 'readline';

interface DataEntry {
    type: string;
    name: string;
    idStart: string;
}

const writtenTypes = new Map<string, DataEntry[]>([
    ['Spell', []],
    ['SkillLine', []],
    ['creature_template', []],
    ['item_template', []]
]);
const idsFilePath = './modules/default/datasets/dataset/ids.txt';
const addonsFilePath = './modules/dh-communication/addon/internal-ids.ts';

async function processFileSync(filePath: string) {
    // Create a read stream for the file
    const fileStream = fs.createReadStream(filePath);

    // Create an interface to read the file line by line
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    // Process each line
    rl.on('line', (line) => {
        const [type, name, idStart] = line.split('|');
        if (type && name && idStart) {
            const entries = writtenTypes.get(type);
            if (entries != null) {
                writtenTypes.get(type)?.push({ type, name, idStart });
            }
        }
    });

    rl.on('close', () => {
        fs.writeFile(addonsFilePath, mapToTypeScriptString(writtenTypes), (err) => { });
    });
}


function mapToTypeScriptString(map: Map<string, DataEntry[]>): string {
    let result = 'export const tooltipInfo = {\n';
    for (const [key, entries] of map) {
        result += `  ${key}: {\n`;
        const entriesById = entries.reduce((acc, entry) => {
            acc[entry.idStart] = { name: entry.name };
            return acc;
        }, {} as Record<string, { name: string }>);

        for (const [idStart, { name }] of Object.entries(entriesById)) {
            result += `    ${idStart}: "${name}",\n`;
        }
        result += `  },\n`;
    }
    result += '}';
    return result;
}


async function main() {
    try {
        if (fs.existsSync(idsFilePath))
            await processFileSync(idsFilePath);
    } catch (error) {
        console.error('Error reading file:', error);
    }
}

main();
