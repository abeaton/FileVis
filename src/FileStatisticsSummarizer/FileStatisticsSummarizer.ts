import { IFileSummarizerCreator, IFileSummarizer } from "../FileSummarizer/FileSummarizer";
import { IFileIterator } from "../FileIterator/FileIterator";
import FileStatisticsSummaryAccessor, { FileStatisticsSummary } from "./FileStatisticsSummaryAccessor/FileStatisticsSummaryAccessor";
import * as _ from "lodash";
import { IExcludedExtensionDeterminer } from "../ExcludedExtensions/ExcludedExtensionDeterminer";

export default class FileStatisticsSummarizer {
	private fileStatisticsSummary: FileStatisticsSummary;

	constructor(fileIterator: IFileIterator, fileSummarizerCreator: IFileSummarizerCreator, excludedExtensionDeterminer: IExcludedExtensionDeterminer){
		const fileStatisticsSummaryAccessor = new FileStatisticsSummaryAccessor();

		while(!fileIterator.isDone()) {
			const filePath = fileIterator.next();

			if(!excludedExtensionDeterminer.endsWithExcludedExtension(filePath)) {
				const fileSummarizer = fileSummarizerCreator.getFileSummarizer(filePath);
				fileStatisticsSummaryAccessor.updateFileStatisticsSummaryFromFileSummarizer(fileSummarizer);
			}
		}

		this.fileStatisticsSummary = fileStatisticsSummaryAccessor.getFileStatisticsSummary();
	}

	public getFileStatisticsSummary(): FileStatisticsSummary {
		return this.fileStatisticsSummary;
	}
}