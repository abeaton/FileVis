import "promise/polyfill";
import "whatwg-fetch";

import FileIterator from "./FileIterator/FileIterator";
import FileSummarizerCreator from "./FileSummarizer/FileSummarizer";
import FileStatisticsSummarizer from "./FileStatisticsSummarizer/FileStatisticsSummarizer";
import * as express from "express";
import ExludedExtensionDeterminer from "./ExcludedExtensions/ExcludedExtensionDeterminer";

interface FileStatisticsSummaryGetRequestParam {
	excludedExtensions: string;
	directory: string;
}

const app = express();

function getFileStatisticsSummary(req: any, res: any) {
	const { excludedExtensions, directory } = req.query as FileStatisticsSummaryGetRequestParam;
	const fileIterator = new FileIterator(directory);
	const fileSummarizerCreator = new FileSummarizerCreator();
	const excludedExtensionsDetminer = new ExludedExtensionDeterminer(excludedExtensions);
	const fileStatisticsSummarizer = new FileStatisticsSummarizer(fileIterator, fileSummarizerCreator, excludedExtensionsDetminer);
	const fileStatisticsSummary = fileStatisticsSummarizer.getFileStatisticsSummary();

	res.json(fileStatisticsSummary);
}

app.get("/FileStatisticsSummary", (req, res) => {
	try {
		getFileStatisticsSummary(req, res);
	} catch {
		res.json({
			fileLengthsToCount: {},
			lineLengthsToCount: {},
			numFileCharactersToCount: {}
		});
	}
	
});

app.use("/", express.static(__dirname + './../public'));

app.listen(3000);
console.log("\nListening on port 3000\n");