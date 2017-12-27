import LineLengthsToCountAccessor, { DEFAULT_MAX_LINE_LENGTH } from "./LineLengthsToCountAccessor";
import MockedFileSummarizer, { MockedLineLengths } from "../../../FileSummarizer/MockedFileSummarizer";
import { ILineLengthsDeterminer } from "../../../FileSummarizer/FileSummarizer";
import { NumberToNumberMap } from "../../NumberToNumberMap/NumberToNumberMap";
import * as _ from "lodash";

function getExpectedLineLengthsToCount(lineLengths: Array<number>): NumberToNumberMap{
	const expectedLineLengthsToCount = {} as NumberToNumberMap;
	lineLengths.forEach((value) => {
		expectedLineLengthsToCount[value] = expectedLineLengthsToCount[value] | 0;
		expectedLineLengthsToCount[value]++;
	});

	return expectedLineLengthsToCount;
}

test("A super basic test", () => {
	const lineLengthsToCountAccessor = new LineLengthsToCountAccessor();

	lineLengthsToCountAccessor.updateFromLineLengthsDeterminer(new MockedFileSummarizer());

	const lineLengthsToCount = lineLengthsToCountAccessor.getLineLengthsToCount();
	const expectedLineLengthsToCount = getExpectedLineLengthsToCount(MockedLineLengths);

	expect(lineLengthsToCount).toEqual(expectedLineLengthsToCount);
});

class MockedLineLengthsDeterminer implements ILineLengthsDeterminer {
	public getLineLengths(): number[] {
		return [DEFAULT_MAX_LINE_LENGTH + 1000];
	}
}

test("Test handles too long line properly", () => {
	const lineLengthsToCountAccessor = new LineLengthsToCountAccessor();

	lineLengthsToCountAccessor.updateFromLineLengthsDeterminer(new MockedLineLengthsDeterminer());

	const lineLengthsToCount = lineLengthsToCountAccessor.getLineLengthsToCount();

	const expectedLineLengthsToCount = getExpectedLineLengthsToCount([DEFAULT_MAX_LINE_LENGTH + 1]);

	expect(lineLengthsToCount).toEqual(expectedLineLengthsToCount);
});

test("Test that multiple updates handled correctly", () => {
	const lineLengthsToCountAccessor = new LineLengthsToCountAccessor();

	lineLengthsToCountAccessor.updateFromLineLengthsDeterminer(new MockedFileSummarizer());
	lineLengthsToCountAccessor.updateFromLineLengthsDeterminer(new MockedLineLengthsDeterminer());

	const lineLengthsToCount = lineLengthsToCountAccessor.getLineLengthsToCount();

	const expectedFromFirstUpdate = getExpectedLineLengthsToCount([DEFAULT_MAX_LINE_LENGTH + 1]);
	const expectedFromSecondUpdate = getExpectedLineLengthsToCount(MockedLineLengths);
	const expectedLineLengthsToCount = _.mergeWith(expectedFromFirstUpdate, expectedFromSecondUpdate, (a = 0, b = 0) => a + b);

	expect(lineLengthsToCount).toEqual(expectedLineLengthsToCount);
});