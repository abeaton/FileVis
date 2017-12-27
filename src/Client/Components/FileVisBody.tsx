import * as React from 'react';
import styled from 'styled-components';
import * as _ from "lodash";
import HighLevelStatistics from "./HighLevelStatistics";
import { FileStatisticsSummary } from "../../FileStatisticsSummarizer/FileStatisticsSummaryAccessor/FileStatisticsSummaryAccessor";
import Graphs from "./Graphs";
import { AccentColor } from "../Constants/Constants";

const Body = styled.div`
	width: 90%;
`;

const Warning = styled.div`
	border: 1px solid ${AccentColor};
	border-radius: 8px;
	text-align: center;
	padding: 8px;
	vertical-align: middle;
	color: #983454;
	width: 80%;
`;

interface FileVisBodyProps {
	fileStatisticsSummary: FileStatisticsSummary | null;
}

export default class FileVisPage extends React.PureComponent<FileVisBodyProps> {
	public render(): JSX.Element {
		return (
			<Body>
				{this.getBodyContent()}
			</Body>
		);
	}

	private getBodyContent(): JSX.Element | null {
		const { fileStatisticsSummary } = this.props;

		if(!fileStatisticsSummary){
			return <div>LOADING...</div>;
		} else if (_.isEmpty(fileStatisticsSummary.fileLengthsToCount)) {
			return <Warning>The directory or excluded extensions you've chosen have led to an empty result. Please edit your settings to use FILEVIS.</Warning>
		} else {
			return (
				<div>
					{/*<div>{JSON.stringify(fileStatisticsSummary)}</div>*/}
					<HighLevelStatistics fileStatisticsSummary={fileStatisticsSummary} />
					<Graphs fileStatisticsSummary={fileStatisticsSummary} />
				</div>
			);
		}
	}
}