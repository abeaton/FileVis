import * as fs from "fs";
import { FilePath } from "../Domain/FilePath";
import * as _ from "lodash";

export interface ILineLengthsDeterminer {
	getLineLengths(): Array<number>;
}

export interface INumberOfLinesDeterminer {
	getNumberOfLines(): number;
}

export interface ITotalCharacterCountDeterminer {
	getTotalCharacterCount(): number;
}

export interface IFileSummarizer extends ILineLengthsDeterminer, INumberOfLinesDeterminer, ITotalCharacterCountDeterminer{};

export class FileSummarizer implements IFileSummarizer {
	private lineLengths: Array<number>;

	constructor(path: FilePath){
		this.lineLengths = getLineLengthsFromFile(path);
	}

	public getLineLengths(): Array<number> {
		return this.lineLengths;
	}

	public getNumberOfLines(): number {
		return this.lineLengths.length;
	}

	public getTotalCharacterCount(): number {
		return _.sum(this.lineLengths);
	}
}

export interface IFileSummarizerCreator {
	getFileSummarizer(path: FilePath): IFileSummarizer;
}

export default class FileSummarizerCreator implements IFileSummarizerCreator {
	public getFileSummarizer(path: FilePath): FileSummarizer {
		return new FileSummarizer(path);
	}
}

export function getLineLengthsFromFile(path: FilePath): Array<number> {
    const file = fs.readFileSync(path, { encoding: 'utf-8' });
    const fileLines = file.split("\n");
    const lineLengths = getLineLengths(fileLines);
    
    return lineLengths;
}

export function getLineLengths(fileLines: Array<string>): Array<number> {
    const lineLengths = fileLines.map(getLineLength);

    return lineLengths;
}

export const TAB_TO_SPACE = 4;

export function getLineLength(fileLine: string): number {
    const characters = fileLine.split("");
    const lineLength = _.sumBy(characters, getLengthFromCharacter);

    return lineLength;
}

function getLengthFromCharacter(character: string): number {
    if(character === "\t"){
        return TAB_TO_SPACE;
    }

    return 1;
}