import * as React from 'react';
import styled from 'styled-components';
import FileVisHeader from "./FileVisHeader";
import FileVisBody from "./FileVisBody";
import FileVisInput from "./FileVisInput";
import { FileStatisticsSummary } from "../../FileStatisticsSummarizer/FileStatisticsSummaryAccessor/FileStatisticsSummaryAccessor";
import * as _ from "lodash";

enum Mode {
	EDITING,
	VISUALIZING
}

interface FileVisPageContainerProps{}

interface FileVisPageContainerState {
	fileStatisticsSummary: FileStatisticsSummary | null;
	mode: Mode;
	excludedExtensions: string;
	directory: string;
}

const PageWrapper = styled.div`
	width: 100%;
	height: 100%;
	padding: 2em;
	font-family: 'Source Sans Pro', sans-serif;
`;

export default class FileVisPageContainer extends React.Component<FileVisPageContainerProps, FileVisPageContainerState> {	
	public constructor(props: FileVisPageContainerProps){
		super(props);

		this.state = {
			fileStatisticsSummary: null,
			mode: Mode.EDITING,
			excludedExtensions: "",
			directory: ""
		};

		this.setFileStatisticsSummary = this.setFileStatisticsSummary.bind(this);
		this.goToEditMode = this.goToEditMode.bind(this);

		this.setFilepath = this.setFilepath.bind(this);
		this.setExcludedExtensions = this.setExcludedExtensions.bind(this);
	}

	public render(): JSX.Element {
		return (
			<PageWrapper>
				<FileVisHeader 
					onButtonClick={this.getOnButtonClick()} 
					buttonText={this.getButtonText()}
					isButtonVisible={this.getIsButtonVisible()} />
				{this.getBody()}
			</PageWrapper>
		);
	}

	private getBody(): JSX.Element {
		const { mode, excludedExtensions, directory, fileStatisticsSummary } = this.state;

		if( mode === Mode.EDITING) {
			return <FileVisInput 
				excludedExtensions={excludedExtensions}
				directory={directory}
				onFilepathUpdate={this.setFilepath}
				onExtensionsUpdate={this.setExcludedExtensions} />
		}

		return <FileVisBody fileStatisticsSummary={fileStatisticsSummary} />;
	}

	private setFilepath(directory: string): void {
		this.setState({
			directory: directory
		});
	}

	private setExcludedExtensions(excludedExtensions: string): void {
		this.setState({
			excludedExtensions: excludedExtensions
		});
	}

	private getOnButtonClick(): (() => void) {
		if(this.isLoading() || this.isStillEditing()){
			return () => {};
		}

		if(this.state.mode === Mode.EDITING) {
			return this.setFileStatisticsSummary;
		} else {
			return this.goToEditMode;
		}
	}

	private getButtonText(): string {
		switch (this.state.mode) {
			case Mode.EDITING:
				return "visualize";
			case Mode.VISUALIZING:
				return "edit";
		}
	}

	private getIsButtonVisible(): boolean {
		return !this.isLoading() && !this.isStillEditing();
	}

	private isLoading(): boolean {
		const { mode, fileStatisticsSummary } = this.state;

		return mode === Mode.VISUALIZING && _.isNull(fileStatisticsSummary);
	}

	private isStillEditing(): boolean {
		const { mode, directory } = this.state;

		return mode === Mode.EDITING && _.isEmpty(directory);
	}

	async setFileStatisticsSummary() {
		const { excludedExtensions, directory } = this.state;

		this.setState({ mode: Mode.VISUALIZING });

		const url = `/FileStatisticsSummary?excludedExtensions=${excludedExtensions}&directory=${directory}`;

		const fileStatisticsSummary = await window.fetch(url, {
				method: "GET"
			}).then(res => res.json());

		this.setState({ fileStatisticsSummary: fileStatisticsSummary as FileStatisticsSummary });
	}

	private goToEditMode(): void {
		this.setState({
			mode: Mode.EDITING,
			fileStatisticsSummary: null
		});
	}
}