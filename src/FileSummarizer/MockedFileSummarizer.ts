import { IFileSummarizer } from "./FileSummarizer";
import * as _ from "lodash";

export const MockedLineLengths = [5, 10, 5, 12, 14, 13, 9];

export default class MockedFileSummarizer implements IFileSummarizer {
	private lineLengths: Array<number>;

	constructor() {
		this.lineLengths = MockedLineLengths;
	}

	public getLineLengths(): number[] {
		return this.lineLengths;
	}

	public getNumberOfLines(): number {
		return this.lineLengths.length;
	}

	public getTotalCharacterCount(): number {
		return _.sum(this.lineLengths);
	}
}