import * as React from 'react';
import styled from 'styled-components';
import { FileStatisticsSummary } from "../../FileStatisticsSummarizer/FileStatisticsSummaryAccessor/FileStatisticsSummaryAccessor";
import StatisticsCard from "./StatisticCard";
import { NumberToNumberMap } from '../../FileStatisticsSummarizer/NumberToNumberMap/NumberToNumberMap';
import { getValuesSum, getSum, getAverage } from "../Utilities/NumberToNumberMapUtility";
import { stddevFromNumberToNumberMap } from "../Utilities/StdDev";
import * as _ from "lodash";

const StatisticsCards = styled.div`
	width: 100%;
	display: flex;
	flex-wrap: wrap;
`;

interface Props {
	fileStatisticsSummary: FileStatisticsSummary;
}

export default class HighLevelStatistics extends React.PureComponent<Props> {
	render(): JSX.Element {
		const { fileStatisticsSummary } = this.props;
		const { fileLengthsToCount, lineLengthsToCount, numFileCharactersToCount } = fileStatisticsSummary;

		const numberOfFiles = getValuesSum(fileLengthsToCount);
		const numberOfLines = getValuesSum(lineLengthsToCount);
		const numberOfCharacters = getSum(numFileCharactersToCount);
		const avgFileLength = _.round(getAverage(fileLengthsToCount), 1);
		const avgLineLength = _.round(getAverage(lineLengthsToCount), 1);
		const avgNumCharactersPerFile = _.round(numberOfCharacters / numberOfFiles);
		const stdDevFileLengths = _.round(stddevFromNumberToNumberMap(fileLengthsToCount), 1);
		const stdDevLineLengths = _.round(stddevFromNumberToNumberMap(lineLengthsToCount), 1);

		return (
			<StatisticsCards>
				<StatisticsCard title={"Number of Files"} value={this.toConciseFormat(numberOfFiles)} />
				<StatisticsCard title={"Number of Lines"} value={this.toConciseFormat(numberOfLines)} />
				<StatisticsCard title={"Number of Characters"} value={this.toConciseFormat(numberOfCharacters)} />
				<StatisticsCard title={"File length Avg."} value={this.toConciseFormat(avgFileLength)} />
				<StatisticsCard title={"Line length Avg."} value={this.toConciseFormat(avgLineLength)} />
				<StatisticsCard title={"Characters per File Avg."} value={this.toConciseFormat(avgNumCharactersPerFile)} />
				<StatisticsCard title={"File length StdDev."} value={this.toConciseFormat(stdDevFileLengths)} />
				<StatisticsCard title={"Line length StdDev."} value={this.toConciseFormat(stdDevLineLengths)} />
			</StatisticsCards>
		);
	}

	private toConciseFormat(value: number){
		if(value > 1000000){
			return `${_.round((value / 1000000), 0)}M`;
		}

		return value.toString();
	}
}