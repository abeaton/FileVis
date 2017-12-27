import { getValuesSum, getSum, getAverage } from "../Utilities/NumberToNumberMapUtility";
import * as _ from "lodash";

describe("Test getValuesSum", () => {
	test("Empty numberToNumberMap returns zero", () => {
		expect(getValuesSum({})).toEqual(0);
	});

	test("Uses values and not keys", () => {
		expect(getValuesSum({1: 2})).toEqual(2);
	});

	test("Sums multiple values", () => {
		const numberToNumberMap = {
			1: 2,
			2: 7,
			3: 12
		};

		expect(getValuesSum(numberToNumberMap)).toEqual(21);
	});
});

describe("Test getSum", () => {
	test("Empty numberToNumberMap returns zero", () => {
		expect(getSum({})).toEqual(0);
	});

	test("Uses values and keys", () => {
		expect(getSum({2: 2})).toEqual(4);
	});

	test("Sums products of keys and values", () => {
		const numberToNumberMap = {
			1: 2,
			2: 7,
			3: 12
		};

		expect(getSum(numberToNumberMap)).toEqual(2 + 14 + 36);
	});
});

describe("Test getAverage", () => {
	test("Empty numberToNumberMap returns zero", () => {
		expect(getAverage({})).toEqual(0);
	});

	test("Single entry", () => {
		expect(getAverage({3: 2})).toEqual(3);
	});

	test("Averages multiple keys and values", () => {
		const numberToNumberMap = {
			1: 2,
			2: 7,
			3: 12
		};

		const roundedAverage = _.round(getAverage(numberToNumberMap), 8);

		expect(roundedAverage).toEqual(2.47619048);
	});
});