import { stddev, stddevFromNumberToNumberMap } from "./StdDev";
import * as _ from "lodash";

describe("Test Standard Deviation from NumberToNumberMap", () => {
	test("Typical standard deviation", () => {
		const numberToNumberMap = {
			1: 1,
			2: 3,
			3: 1,
			4: 3,
			5: 2,
			6: 1,
			8: 1,
			10: 1
		};

		const roundedStddev = _.round(stddevFromNumberToNumberMap(numberToNumberMap), 12);

		expect(roundedStddev).toEqual(2.562050460881);
	});
});

describe("Test Standard Deviation", () => {
	test("Empty array returns NaN", () => {
		expect(stddev([])).toEqual(NaN);
	});

	test("Array of size 1 returns NaN", () => {
		expect(stddev([1])).toEqual(NaN);
	});

	test("Standard deviation of multiple numbers", () => {
		const numbers = [1, 3, 7, 2, 4, 18, 5, 10, 24, 3, 5, 2, 1, 3];
		const roundedStddev = _.round(stddev(numbers), 12);

		expect(roundedStddev).toEqual(6.787188966423);
	});

	test("Standard deviation of long list of numbers", () => {
		const numbers = [24,9,84,7,33,8,47,0,10,80,5,56,1,39,2,14,4,93,3,9,6,20,2,89,1,88,6,58,9,18,6,14,1,75,7,40,1,1,32,5,16,5,69,2];
		const roundedStddev = _.round(stddev(numbers), 12);

		expect(roundedStddev).toEqual(29.463014762591);
	});
});