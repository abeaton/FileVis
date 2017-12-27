import { IFileSummarizer, IFileSummarizerCreator } from "../FileSummarizer/FileSummarizer";
import MockedFileSummarizer, { MockedLineLengths } from "../FileSummarizer/MockedFileSummarizer";
import { IFileIterator } from "../FileIterator/FileIterator";
import * as _ from "lodash";
import { FilePath } from "../Domain/FilePath";
import FileStatisticsSummarizer from "./FileStatisticsSummarizer";
import { NumberToNumberMap } from "./NumberToNumberMap/NumberToNumberMap";
import ExludedExtensionDeterminer from "../ExcludedExtensions/ExcludedExtensionDeterminer";

class MockedFileSummarizerCreator implements IFileSummarizerCreator {
	getFileSummarizer(path: FilePath): IFileSummarizer {
		return new MockedFileSummarizer();
	}
}

const mockedFilePaths = ["UNUSED FILE PATH 1", "UNUSED FILE PATH 2", "UNUSED FILE PATH 3"];

class MockedFileIterator implements IFileIterator {
	private index: number;
	private filePaths: Array<string>;

	constructor() {
		this.index = 0;
		this.filePaths = mockedFilePaths;
	}

	public next(): string {
		if(this.isDone()) {
			throw new Error("This error should never be hit while testing");
		}

		const filePath = this.filePaths[this.index];
		this.index++;

		return filePath;
	}

	public isDone(): boolean {
		return this.filePaths.length === this.index;
	}
}

describe("Test FileStatisticsSummarizer", () => {
	test("Use mocked FileSummarizer and FileIterator to getFileStatisticsSummary", () => {
		const mockedFileIterator = new MockedFileIterator();
		const mockedFileSummarizerCreator = new MockedFileSummarizerCreator();

		// using an empty string so that I can get all files in the test case
		const excludedExtensionDeterminer = new ExludedExtensionDeterminer("");

		const fileStatisticsSummarizer = new FileStatisticsSummarizer(mockedFileIterator, mockedFileSummarizerCreator, excludedExtensionDeterminer);

		const fileStatisticsSummary = fileStatisticsSummarizer.getFileStatisticsSummary();

		const expectedFileLengthsToCount: NumberToNumberMap = {};
		expectedFileLengthsToCount[MockedLineLengths.length] = mockedFilePaths.length;

		const expectedLineLengthsToCount: NumberToNumberMap = {};
		MockedLineLengths.forEach((value) => {
			expectedLineLengthsToCount[value] = expectedLineLengthsToCount[value] | 0;
			expectedLineLengthsToCount[value] += mockedFilePaths.length;
		});

		const expectedNumFileCharactersToCount: NumberToNumberMap = {};
		expectedNumFileCharactersToCount[_.sum(MockedLineLengths)] = mockedFilePaths.length;

		expect(fileStatisticsSummary.fileLengthsToCount).toEqual(expectedFileLengthsToCount);
		expect(fileStatisticsSummary.lineLengthsToCount).toEqual(expectedLineLengthsToCount);
		expect(fileStatisticsSummary.numFileCharactersToCount).toEqual(expectedNumFileCharactersToCount);
	});

	test("Use mocked FileSummarizer and FileIterator to getFileStatisticsSummary - extension exludes all", () => {
		const mockedFileIterator = new MockedFileIterator();
		const mockedFileSummarizerCreator = new MockedFileSummarizerCreator();

		// using all the file names so that I can remove all files in the test case
		const excludedExtensionDeterminer = new ExludedExtensionDeterminer(mockedFilePaths.join(","));

		const fileStatisticsSummarizer = new FileStatisticsSummarizer(mockedFileIterator, mockedFileSummarizerCreator, excludedExtensionDeterminer);

		const fileStatisticsSummary = fileStatisticsSummarizer.getFileStatisticsSummary();

		expect(fileStatisticsSummary.fileLengthsToCount).toEqual({});
		expect(fileStatisticsSummary.lineLengthsToCount).toEqual({});
		expect(fileStatisticsSummary.numFileCharactersToCount).toEqual({});
	});
});