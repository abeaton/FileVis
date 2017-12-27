import * as React from 'react';
import styled from 'styled-components';
import { XYPlot, AreaSeries, HorizontalGridLines, XAxis, YAxis } from 'react-vis';
import { NumberToNumberMap } from '../../FileStatisticsSummarizer/NumberToNumberMap/NumberToNumberMap';
import { AccentColor } from "../Constants/Constants";
import { getFullyPopulatedLineSeries, LineSeriesData } from "../Utilities/LineSeriesDataUtility";
import * as _ from "lodash";

const GraphContainer = styled.div`
	margin: 16px;
`;

interface Props {
	numberToNumberMap: NumberToNumberMap;
	xAxisTitle: string;
}

export default class Graph extends React.PureComponent<Props> {
	render(): JSX.Element {
		const { xAxisTitle } = this.props;
		return (
			<GraphContainer>
				<h3>{xAxisTitle}</h3>
				<XYPlot height={500} width={500}>
					<HorizontalGridLines />
					<AreaSeries data={this.getLineSeriesData()} color={AccentColor} />
					<XAxis title={xAxisTitle} />	
					<YAxis />
				</XYPlot>
			</GraphContainer>
		);
	}

	private getLineSeriesData(): Array<LineSeriesData> {
		const { numberToNumberMap } = this.props;
		const lineSeriesData = getFullyPopulatedLineSeries(numberToNumberMap);

		return _.orderBy(lineSeriesData, "x");
	}
}