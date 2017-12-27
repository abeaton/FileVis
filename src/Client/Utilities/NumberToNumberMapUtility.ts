import { NumberToNumberMap } from '../../FileStatisticsSummarizer/NumberToNumberMap/NumberToNumberMap';
import * as _ from "lodash";

export function getValuesSum(numberToNumberMap: NumberToNumberMap): number {
	return _(numberToNumberMap).values().sum();
}

export function getSum(numberToNumberMap: NumberToNumberMap): number {
	const sum = _(numberToNumberMap)
		.keys()
		.map((key: string) => parseInt(key, 10))
		.sumBy((key: number) => key * numberToNumberMap[key]);

	return sum;
}

export function getAverage(numberToNumberMap: NumberToNumberMap): number {
	if(_.isEmpty(numberToNumberMap)){
		return 0;
	}

	const sum = getSum(numberToNumberMap);
	const number = getValuesSum(numberToNumberMap);
	
	return sum / number;
}