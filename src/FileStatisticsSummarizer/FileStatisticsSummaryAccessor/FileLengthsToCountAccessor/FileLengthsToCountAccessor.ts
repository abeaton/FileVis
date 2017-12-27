import NumberToNumberMapAccessor, { NumberToNumberMap } from "../../NumberToNumberMap/NumberToNumberMap";
import { INumberOfLinesDeterminer } from "../../../FileSummarizer/FileSummarizer";

export const DEFAULT_MAX_FILE_LENGTH = 5000;

export default class FileLengthsToCountAccessor {
	private fileLengthsToCount: NumberToNumberMapAccessor;

	constructor(){
		this.fileLengthsToCount = new NumberToNumberMapAccessor();
	}

	public getFileLengthsToCount(): NumberToNumberMap {
		return this.fileLengthsToCount.getMap();
	}

	public updateFromNumberOfLinesDeterminer(numberOfLinesDeterminer: INumberOfLinesDeterminer){
		let fileLength = numberOfLinesDeterminer.getNumberOfLines();

		if(fileLength > DEFAULT_MAX_FILE_LENGTH) {
			fileLength = DEFAULT_MAX_FILE_LENGTH + 1;
		}

		this.fileLengthsToCount.incrementValueAtKey(fileLength);
	}
}