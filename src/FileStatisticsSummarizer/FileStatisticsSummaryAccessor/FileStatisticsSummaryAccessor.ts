import { IFileSummarizer } from "../../FileSummarizer/FileSummarizer";
import NumberToNumberMapAccessor, { NumberToNumberMap } from "../NumberToNumberMap/NumberToNumberMap";
import FileLengthsToCountAccessor from "./FileLengthsToCountAccessor/FileLengthsToCountAccessor";
import LineLengthsToCountAccessor from "./LineLengthsToCountAccessor/LineLengthsToCountAccessor";
import NumFileCharactersToCountAccessor from "./NumFileCharactersToCountAccessor/NumFileCharactersToCountAccessor";

export interface FileStatisticsSummary {
	fileLengthsToCount: NumberToNumberMap;
	lineLengthsToCount: NumberToNumberMap;
	numFileCharactersToCount: NumberToNumberMap;
}

export default class FileStatisticsSummaryAccsesor {
	private fileLengthsToCountAccessor: FileLengthsToCountAccessor;
	private lineLengthsToCountAccessor: LineLengthsToCountAccessor;
	private numFileCharactersToCountAccessor: NumFileCharactersToCountAccessor;

	constructor(){
		this.fileLengthsToCountAccessor = new FileLengthsToCountAccessor();
		this.lineLengthsToCountAccessor = new LineLengthsToCountAccessor();
		this.numFileCharactersToCountAccessor = new NumFileCharactersToCountAccessor();
	}

	public getFileStatisticsSummary(): FileStatisticsSummary {
		return {
			fileLengthsToCount: this.fileLengthsToCountAccessor.getFileLengthsToCount(),
			lineLengthsToCount: this.lineLengthsToCountAccessor.getLineLengthsToCount(),
			numFileCharactersToCount: this.numFileCharactersToCountAccessor.getNumFileCharactersToCount()
		};
	}

	public updateFileStatisticsSummaryFromFileSummarizer(fileSummarizer: IFileSummarizer){
		this.fileLengthsToCountAccessor.updateFromNumberOfLinesDeterminer(fileSummarizer);
		this.lineLengthsToCountAccessor.updateFromLineLengthsDeterminer(fileSummarizer);
		this.numFileCharactersToCountAccessor.updateFromTotalCharacterCountDeterminer(fileSummarizer);
	}
}