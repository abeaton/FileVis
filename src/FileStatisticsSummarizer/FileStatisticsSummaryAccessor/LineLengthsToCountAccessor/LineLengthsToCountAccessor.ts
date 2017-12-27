import NumberToNumberMapAccessor, { NumberToNumberMap } from "../../NumberToNumberMap/NumberToNumberMap";
import { ILineLengthsDeterminer } from "../../../FileSummarizer/FileSummarizer";

export const DEFAULT_MAX_LINE_LENGTH = 250;

export default class LineLengthsToCountAccessor {
	private lineLengthsToCount: NumberToNumberMapAccessor;

	constructor(){
		this.lineLengthsToCount = new NumberToNumberMapAccessor();
	}

	public getLineLengthsToCount(): NumberToNumberMap {
		return this.lineLengthsToCount.getMap();
	}

	public updateFromLineLengthsDeterminer(lineLengthsDeterminer: ILineLengthsDeterminer){
		let lineLengths = lineLengthsDeterminer.getLineLengths();

		lineLengths = lineLengths.map((lineLength) => {
			if(lineLength > DEFAULT_MAX_LINE_LENGTH){
				return DEFAULT_MAX_LINE_LENGTH + 1;
			}

			return lineLength;
		});

		lineLengths.forEach((lineLength) => {
			this.lineLengthsToCount.incrementValueAtKey(lineLength);
		});
	}
}