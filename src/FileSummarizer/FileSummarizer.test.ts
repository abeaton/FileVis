import { 
	FileSummarizer, 
	getLineLengthsFromFile, 
	getLineLengths, 
	getLineLength, 
	TAB_TO_SPACE 
} from "./FileSummarizer";

import * as _ from "lodash";

const dummyTestFileData = {
	path: `${__dirname}/DummyTestFiles/DummyTestFile.txt`,
	expectedLineLengths: [
		12, 
		TAB_TO_SPACE + 15, 
		0, 
		TAB_TO_SPACE + 36,
		(3 * TAB_TO_SPACE) + 16,
		TAB_TO_SPACE + 31,
		TAB_TO_SPACE + 33,
		(2 * TAB_TO_SPACE) + 30,
		TAB_TO_SPACE + 29,
		TAB_TO_SPACE + 31,
		(2 * TAB_TO_SPACE) + 13,
		TAB_TO_SPACE + 18
	]
};

describe("FileSummarizer tests", () => {
    test("Get file summary object from an actual file", () => {
		const fileSummarizer = new FileSummarizer(dummyTestFileData.path);

		const expectedLineLengths = dummyTestFileData.expectedLineLengths;

		expect(fileSummarizer.getLineLengths()).toEqual(expectedLineLengths);
		expect(fileSummarizer.getNumberOfLines()).toEqual(12);
		expect(fileSummarizer.getTotalCharacterCount()).toEqual(_.sum(expectedLineLengths));
    });
});

describe("getLineLengthsFromFile tests", () => {
    test("Get file summary data from an actual file", () => {
		const lineLengths = getLineLengthsFromFile(dummyTestFileData.path);

		expect(lineLengths).toEqual(dummyTestFileData.expectedLineLengths);
    });
});

/**
 * The formatting of multiLineTextInput is strange, but intentional.
 * It ensures that we don't add extra tabs and new lines.
 */
const multiLineTextInput = 
`public string IsGreaterThanZero(int x, int y)
{
\tif(x + y > 0)
\t{
\t\treturn "YAY";
\t}
\treturn "BOO";
}`;

describe("getLineLengths tests", () => {
    test("determines whether we determine the lengths of a set of lines correctly", () => {
        const lineLengths = getLineLengths(multiLineTextInput.split("\n"));
        const expectedLineLengths = [
			45, 
			1, 
			TAB_TO_SPACE + 13,
			TAB_TO_SPACE + 1,
			(2 * TAB_TO_SPACE) + 13, 
			TAB_TO_SPACE + 1, 
			TAB_TO_SPACE + 13, 
			1
		];
    
        expect(lineLengths).toEqual(expectedLineLengths);
    });
});

describe("getLineLength test", () => {
    test("determines no characters in line", () => {
        expect(getLineLength("")).toEqual(0);
    });
    
    test("equates a tab with default TAB_TO_SPACE characters", () => {
        expect(getLineLength("\t")).toEqual(TAB_TO_SPACE);
    });
    
    test("handles a typical code line-length correctly", () => {
        const line = "\t\tvar x = 3 + 2;"
        const expectedNumberOfCharacters = (TAB_TO_SPACE * 2) + 14;
        const lineCharacterCount = getLineLength(line);
    
        expect(lineCharacterCount).toEqual(expectedNumberOfCharacters);
    });
});