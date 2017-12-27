import NumberToNumberMapAccessor, { NumberToNumberMap } from "../../NumberToNumberMap/NumberToNumberMap";
import { ITotalCharacterCountDeterminer } from "../../../FileSummarizer/FileSummarizer";

export const DEFAULT_MAX_CHARACTERS= 75000;

export default class NumFileCharactersToCountAccessor {
	private numFileCharactersToCount: NumberToNumberMapAccessor;

	constructor(){
		this.numFileCharactersToCount = new NumberToNumberMapAccessor();
	}

	public getNumFileCharactersToCount(): NumberToNumberMap {
		return this.numFileCharactersToCount.getMap();
	}

	public updateFromTotalCharacterCountDeterminer(totalCharacterCountDeterminer: ITotalCharacterCountDeterminer){
		let numFileCharacters = totalCharacterCountDeterminer.getTotalCharacterCount();

		if(numFileCharacters > DEFAULT_MAX_CHARACTERS) {
			numFileCharacters = DEFAULT_MAX_CHARACTERS + 1;
		}

		this.numFileCharactersToCount.incrementValueAtKey(numFileCharacters);
	}
}