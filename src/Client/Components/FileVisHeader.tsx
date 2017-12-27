import * as React from 'react';
import styled from 'styled-components';
import { AccentColor } from "../Constants/Constants";

const Header = styled.div`
	width: 100%;
	padding: 2px;
`;

const HeaderText = styled.span`
	font-family: 'Bungee', cursive;
	font-size: 64px;
	vertical-align: middle;
`;

const Button = styled.span`
	background: ${AccentColor};
	border-radius: 0.5em;
	padding: 8px;
	text-align: center;
	vertical-align: middle;
	margin-left: 48px;
	&:hover {
		cursor: pointer;
	}
`;

interface Props {
	onButtonClick(): void;
	buttonText: string;
	isButtonVisible: boolean;
}

export default class FileVisHeader extends React.PureComponent<Props> {
	public render(): JSX.Element {
		return (
			<Header>
				<HeaderText>filevis</HeaderText>
				{this.props.isButtonVisible && <Button onClick={this.props.onButtonClick}>{this.props.buttonText}</Button>}
			</Header>
		);
	}
}