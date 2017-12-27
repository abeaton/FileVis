import * as React from 'react';
import styled from 'styled-components';

const Body = styled.div``;
const TextInput = styled.input`
	margin: 1em;
`;

interface Props {
	excludedExtensions: string;
	directory: string;
	onExtensionsUpdate(excludedExtensions: string): void;
	onFilepathUpdate(filepath: string): void;
}

export default class FileVisInput extends React.PureComponent<Props> {
	public constructor(props: Props) {
		super(props);

		this.onExtensionsUpdate = this.onExtensionsUpdate.bind(this);
		this.onFilepathUpdate = this.onFilepathUpdate.bind(this);
	}

	public render(): JSX.Element {
		return (
			<Body>
				<div>
					<span>Directory path:</span>
					<TextInput 
						type="text" 
						placeholder="/PATH/TO/YOUR/REPOSITORY" 
						value={this.props.directory} 
						onChange={this.onFilepathUpdate}
						size={100} />
				</div>
				<div>
					<span>Extensions to exclude (comma-separated):</span>
					<TextInput 
						type="text" 
						placeholder=".ts,.js,.cs" 
						value={this.props.excludedExtensions} 
						onChange={this.onExtensionsUpdate}
						size={70} />
				</div>
			</Body>
		);
	}

	public onFilepathUpdate(event: React.FormEvent<HTMLInputElement>): void {
		const filepath = event.currentTarget.value;
		this.props.onFilepathUpdate(filepath);
		event.preventDefault();
	}

	public onExtensionsUpdate(event: React.FormEvent<HTMLInputElement>): void {
		const extensions = event.currentTarget.value;
		this.props.onExtensionsUpdate(extensions);
		event.preventDefault();
	}
}