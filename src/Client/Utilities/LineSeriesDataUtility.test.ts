import { getFullyPopulatedLineSeries, LineSeriesData } from "../Utilities/LineSeriesDataUtility";
import * as _ from "lodash";

describe("Test getFullyPopulatedLineSeries", () => {
	test("Doesn't break when empty NumberToNumberMap", () => {
		const lineSeriesData = getFullyPopulatedLineSeries({});
		expect(lineSeriesData).toEqual([]);
	});

	test("Basic NumberToNumberMap", () => {
		const lineSeriesData = getFullyPopulatedLineSeries({
			4: 4,
			6: 3,
			7: 6,
			10: 7,
			12: 1
		});

		const expectedLineSeriesData = [
			{ x: 0, y: 0 },
			{ x: 1, y: 0 },
			{ x: 2, y: 0 },
			{ x: 3, y: 0 },
			{ x: 4, y: 4 },
			{ x: 5, y: 0 },
			{ x: 6, y: 3 },
			{ x: 7, y: 6 },
			{ x: 8, y: 0 },
			{ x: 9, y: 0 },
			{ x: 10, y: 7 },
			{ x: 11, y: 0 },
			{ x: 12, y: 1 }
		];

		expect(_.differenceWith(lineSeriesData, expectedLineSeriesData, _.isEqual)).toEqual([]);
	});
});