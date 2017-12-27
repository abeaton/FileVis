import * as React from 'react';
import styled from 'styled-components';
import { FileStatisticsSummary } from "../../FileStatisticsSummarizer/FileStatisticsSummaryAccessor/FileStatisticsSummaryAccessor";

const Card = styled.div`
	width: 225px;
	min-width: 225px;
	height: 225px;
	min-height: 225px;
	border: 1px solid #E0E0E0;
	padding: 8px;
	margin: 8px;
`;

const Title = styled.div`
	margin-bottom: 60px;	
`;

const Value = styled.div`
	text-align: right;
	font-weight: bold;
	font-size: 60px;
`

interface Props {
	title: string;
	value: string;
}

export default class StatisticsCard extends React.PureComponent<Props> {
	render(): JSX.Element {
		const { title, value } = this.props;

		return (
			<Card>
				<Title>{title}</Title>
				<Value>{value}</Value>
			</Card>
		);
	}
}