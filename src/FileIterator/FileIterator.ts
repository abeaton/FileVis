import * as fs from "fs";

export function getAllFilePaths(rootDirectory: string): Array<string> {
	const directoryContents = fs.readdirSync(rootDirectory);
	const filePaths = new Array<string>();

	directoryContents.forEach((file) => {
		const path = `${rootDirectory}/${file}`;
		const isDirectory = fs.statSync(path).isDirectory();

		if(isDirectory) {
			filePaths.push(...getAllFilePaths(path));
		} else {
			filePaths.push(path);
		}
	});

	return filePaths;
}

export interface IFileIterator {
	next(): string;
	isDone(): boolean;
}

export default class FileIterator implements IFileIterator {
	private index: number;
	private filePaths: string[];

	constructor(rootDirectory: string){
		this.index = 0;
		this.filePaths = getAllFilePaths(rootDirectory).sort();
	}

	public next(): string {
		if(this.isDone()) {
			throw new Error("You cannot call next once all files have been iterated over");
		}

		const nextFilePath = this.filePaths[this.index];
		this.index++;

		return nextFilePath;
	}

	public isDone(): boolean {
		return this.index === this.filePaths.length;
	}
}