import FileIterator, { getAllFilePaths } from "./FileIterator";
import * as _ from "lodash";

const expectedFilePaths = [
	`${__dirname}/DummyTestRepo/A.txt`,
	`${__dirname}/DummyTestRepo/A/B.txt`,
	`${__dirname}/DummyTestRepo/A/B/C.txt`,
	`${__dirname}/DummyTestRepo/C/D/E/D.txt`,
	`${__dirname}/DummyTestRepo/C/F/E.txt`
].sort();

describe("Test FileIterator", () => {
	test("Visit each filepaths in DummyTestRepo", () => {
		const fileIterator = new FileIterator(`${__dirname}/DummyTestRepo`);

		let index = 0;
		while(!fileIterator.isDone()) {
			expect(fileIterator.next()).toEqual(expectedFilePaths[index]);
			index++;
		}

		expect(index).toEqual(expectedFilePaths.length);
		expect(() => fileIterator.next()).toThrowError("You cannot call next once all files have been iterated over");
	});
});

describe("Test getAllFilePaths", () => {
	test("Get all filepaths in DummyTestRepo", () => {
		const allFilePaths = getAllFilePaths(`${__dirname}/DummyTestRepo`).sort();

		expect(allFilePaths).toEqual(expectedFilePaths);
	});
})