import * as _ from "lodash";
import { NumberToNumberMap } from "../../FileStatisticsSummarizer/NumberToNumberMap/NumberToNumberMap";

export interface LineSeriesData {
	x: number;
	y: number;
}

export function getMaxKey(numberToNumberMap: NumberToNumberMap): number {
	const max = _(numberToNumberMap)
		.keys()
		.map((key) => parseInt(key, 10))
		.max();

	return max || 0;
}

export function getFullyPopulatedLineSeries(numberToNumberMap: NumberToNumberMap): Array<LineSeriesData> {
	const lineSeriesData = _(numberToNumberMap)
		.keys()
		.map((key: string) => parseInt(key, 10))
		.map((key: number) => {
			return {
				x: key,
				y: numberToNumberMap[key]
			};
		})
		.value();

	_.range(0, getMaxKey(numberToNumberMap)).forEach((val) => {
		if(!_.some(lineSeriesData, { "x": val })) {
			lineSeriesData.push({ x: val, y: 0 });
		}
	});

	return lineSeriesData;
}