import * as _ from "lodash";
import { NumberToNumberMap } from "../../FileStatisticsSummarizer/NumberToNumberMap/NumberToNumberMap";

export function stddev(numbers: Array<number>): number {
	if(_.isEmpty(numbers) || numbers.length === 1){
		return NaN;
	}

	const average = _.sum(numbers) / numbers.length;
	const numerator = _.sumBy(numbers, (n) => {
		const term = n - average;
		return term * term;
	});
	const denominator = numbers.length - 1;

	return Math.sqrt(numerator / denominator);
}

export function stddevFromNumberToNumberMap(numberToNumberMap: NumberToNumberMap): number {
	const numbers = _(numberToNumberMap)
		.keys()
		.map((key: string) => {
			const keyAsNumber = parseInt(key, 10);
			const values = _.range(keyAsNumber, keyAsNumber + numberToNumberMap[keyAsNumber], 0);
			return values;
		})
		.flatten()
		.value();

	return stddev(numbers);
}