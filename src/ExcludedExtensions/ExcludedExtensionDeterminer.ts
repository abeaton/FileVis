import * as _ from "lodash";

export interface IExcludedExtensionDeterminer {
	endsWithExcludedExtension(filepath: string): boolean;
}

export default class ExludedExtensionDeterminer implements IExcludedExtensionDeterminer {
	private excludedExtensionsArray: Array<string>;

	constructor(excludedExtensions: string) {
		const splitByCommas = excludedExtensions.trim().split(",");
		const excludedExtensionsArray = splitByCommas.map((ext) => ext.trim()).filter((ext) => !_.isEmpty(ext));
		this.excludedExtensionsArray = excludedExtensionsArray;
	}

	public endsWithExcludedExtension(filePath: string): boolean {
		return !_.isEmpty(this.excludedExtensionsArray) 
			&& _.some(this.excludedExtensionsArray, (extension) => _.endsWith(filePath, extension));
	}
}