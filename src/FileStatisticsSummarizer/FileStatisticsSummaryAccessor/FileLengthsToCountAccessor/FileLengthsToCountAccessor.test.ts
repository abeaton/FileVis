import FileLengthsToCountAccessor, { DEFAULT_MAX_FILE_LENGTH } from "./FileLengthsToCountAccessor";
import MockedFileSummarizer, { MockedLineLengths } from "../../../FileSummarizer/MockedFileSummarizer";
import { INumberOfLinesDeterminer } from "../../../FileSummarizer/FileSummarizer";
import { NumberToNumberMap } from "../../NumberToNumberMap/NumberToNumberMap";
import * as _ from "lodash";

test("A super basic test", () => {
	const fileLengthsToCountAccessor = new FileLengthsToCountAccessor();

	fileLengthsToCountAccessor.updateFromNumberOfLinesDeterminer(new MockedFileSummarizer());

	const fileLengthsToCount = fileLengthsToCountAccessor.getFileLengthsToCount();

	const expectedFileLengthsToCount = {} as NumberToNumberMap;
	expectedFileLengthsToCount[MockedLineLengths.length] = 1;

	expect(fileLengthsToCount).toEqual(expectedFileLengthsToCount);
});

class MockedNumberOfLinesDeterminer implements INumberOfLinesDeterminer {
	public getNumberOfLines(): number {
		return DEFAULT_MAX_FILE_LENGTH + 500;
	}
}

test("Test that getLineLengths and getTotalCharacterCount unused and handles too long file length properly", () => {
	const fileLengthsToCountAccessor = new FileLengthsToCountAccessor();

	fileLengthsToCountAccessor.updateFromNumberOfLinesDeterminer(new MockedNumberOfLinesDeterminer());

	const fileLengthsToCount = fileLengthsToCountAccessor.getFileLengthsToCount();

	const expectedFileLengthsToCount = {} as NumberToNumberMap;
	expectedFileLengthsToCount[DEFAULT_MAX_FILE_LENGTH + 1] = 1;

	expect(fileLengthsToCount).toEqual(expectedFileLengthsToCount);
});

test("Test that multiple updates handled correctly", () => {
	const fileLengthsToCountAccessor = new FileLengthsToCountAccessor();

	fileLengthsToCountAccessor.updateFromNumberOfLinesDeterminer(new MockedFileSummarizer());
	fileLengthsToCountAccessor.updateFromNumberOfLinesDeterminer(new MockedNumberOfLinesDeterminer());

	const fileLengthsToCount = fileLengthsToCountAccessor.getFileLengthsToCount();
	
	const expectedFileLengthsToCount = {} as NumberToNumberMap;
	expectedFileLengthsToCount[MockedLineLengths.length] = 1;
	expectedFileLengthsToCount[DEFAULT_MAX_FILE_LENGTH + 1] = 1;

	expect(fileLengthsToCount).toEqual(expectedFileLengthsToCount);
});