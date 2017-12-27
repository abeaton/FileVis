import * as React from 'react';
import styled from 'styled-components';
import { XYPlot, AreaSeries, HorizontalGridLines, XAxis, YAxis } from 'react-vis';
import { NumberToNumberMap } from '../../FileStatisticsSummarizer/NumberToNumberMap/NumberToNumberMap';
import Graph from "./Graph";
import { FileStatisticsSummary } from '../../FileStatisticsSummarizer/FileStatisticsSummaryAccessor/FileStatisticsSummaryAccessor';

const GraphContainer = styled.div`
	width: 100%;
	display: flex;
	flex-wrap: wrap;
`;

interface Props {
	fileStatisticsSummary: FileStatisticsSummary;
}

export default class Graphs extends React.PureComponent<Props> {
	render(): JSX.Element {
		const { fileStatisticsSummary } = this.props;
		return (
			<GraphContainer>
				<Graph numberToNumberMap={fileStatisticsSummary.fileLengthsToCount} xAxisTitle={"File Lengths"} />
				<Graph numberToNumberMap={fileStatisticsSummary.lineLengthsToCount} xAxisTitle={"Line Lengths"} />
			</GraphContainer>
		);
	}
}