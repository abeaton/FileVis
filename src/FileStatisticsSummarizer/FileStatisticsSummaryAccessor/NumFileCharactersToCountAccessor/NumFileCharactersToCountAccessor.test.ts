import NumFileCharactersToCountAccessor, { DEFAULT_MAX_CHARACTERS } from "./NumFileCharactersToCountAccessor";
import MockedFileSummarizer, { MockedLineLengths } from "../../../FileSummarizer/MockedFileSummarizer";
import { ITotalCharacterCountDeterminer } from "../../../FileSummarizer/FileSummarizer";
import { NumberToNumberMap } from "../../NumberToNumberMap/NumberToNumberMap";
import * as _ from "lodash";

test("A super basic test", () => {
	const numFileCharactersToCountAccessor = new NumFileCharactersToCountAccessor();

	numFileCharactersToCountAccessor.updateFromTotalCharacterCountDeterminer(new MockedFileSummarizer());

	const numFileCharactersToCount = numFileCharactersToCountAccessor.getNumFileCharactersToCount();

	const expectedNumFileCharactersToCount = {} as NumberToNumberMap;
	expectedNumFileCharactersToCount[_.sum(MockedLineLengths)] = 1;

	expect(numFileCharactersToCount).toEqual(expectedNumFileCharactersToCount);
});

class NumFileCharactersToCountAccessorFileSummarizer implements ITotalCharacterCountDeterminer {
	public getTotalCharacterCount(): number {
		return DEFAULT_MAX_CHARACTERS + 1000;
	}
}

test("Test handles too long file length properly", () => {
	const numFileCharactersToCountAccessor = new NumFileCharactersToCountAccessor();

	numFileCharactersToCountAccessor.updateFromTotalCharacterCountDeterminer(new NumFileCharactersToCountAccessorFileSummarizer());

	const numFileCharactersToCount = numFileCharactersToCountAccessor.getNumFileCharactersToCount();

	const expectedNumFileCharactersToCount = {} as NumberToNumberMap;
	expectedNumFileCharactersToCount[DEFAULT_MAX_CHARACTERS + 1] = 1;

	expect(numFileCharactersToCount).toEqual(expectedNumFileCharactersToCount);
});

test("Test that multiple updates handled correctly", () => {
	const numFileCharactersToCountAccessor = new NumFileCharactersToCountAccessor();

	numFileCharactersToCountAccessor.updateFromTotalCharacterCountDeterminer(new MockedFileSummarizer());
	numFileCharactersToCountAccessor.updateFromTotalCharacterCountDeterminer(new NumFileCharactersToCountAccessorFileSummarizer());

	const numFileCharactersToCount = numFileCharactersToCountAccessor.getNumFileCharactersToCount();
	
	const expectedNumFileCharactersToCount = {} as NumberToNumberMap;
	expectedNumFileCharactersToCount[_.sum(MockedLineLengths)] = 1;
	expectedNumFileCharactersToCount[DEFAULT_MAX_CHARACTERS + 1] = 1;

	expect(numFileCharactersToCount).toEqual(expectedNumFileCharactersToCount);
});