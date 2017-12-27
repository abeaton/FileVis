import ExludedExtensionDeterminer from "./ExcludedExtensionDeterminer";

describe("Test ExcludedExtensionDeteminer", () => {
	test("endsWithExcludedExtension returns false for empty string", () => {
		const excludedExtensionDeteminer = new ExludedExtensionDeterminer("");
		const endsWithExcludedExtension = excludedExtensionDeteminer.endsWithExcludedExtension("test/test.ts");
		expect(endsWithExcludedExtension).toBe(false);
	});

	test("endsWithExcludedExtension returns false for unmatched extension", () => {
		const excludedExtensionDeteminer = new ExludedExtensionDeterminer(".js");
		const endsWithExcludedExtension = excludedExtensionDeteminer.endsWithExcludedExtension("test/test.ts");
		expect(endsWithExcludedExtension).toBe(false);
	});

	test("endsWithExcludedExtension returns true for matched extension", () => {
		const excludedExtensionDeteminer = new ExludedExtensionDeterminer(".ts");
		const endsWithExcludedExtension = excludedExtensionDeteminer.endsWithExcludedExtension("test/test.ts");
		expect(endsWithExcludedExtension).toBe(true);
	});

	test("endsWithExcludedExtension returns true for matched extension - spaces between commas", () => {
		const excludedExtensionDeteminer = new ExludedExtensionDeterminer(".js, .ts , .sql");
		const endsWithExcludedExtension = excludedExtensionDeteminer.endsWithExcludedExtension("test/test.ts");
		expect(endsWithExcludedExtension).toBe(true);
	});

	test("endsWithExcludedExtension returns true for matched extension, multiple extensions", () => {
		const excludedExtensionDeteminer = new ExludedExtensionDeterminer(".js,.cs,.ts,.sql");
		const endsWithExcludedExtension = excludedExtensionDeteminer.endsWithExcludedExtension("test/test.ts");
		expect(endsWithExcludedExtension).toBe(true);
	});

	test("endsWithExcludedExtension returns false for unmatched extension, multiple extensions", () => {
		const excludedExtensionDeteminer = new ExludedExtensionDeterminer(".cs, .js, .sql");
		const endsWithExcludedExtension = excludedExtensionDeteminer.endsWithExcludedExtension("test/test.ts");
		expect(endsWithExcludedExtension).toBe(false);
	});

	test("endsWithExcludedExtension remove empty strings in comma delimited list", () => {
		const excludedExtensionDeteminer = new ExludedExtensionDeterminer(",.js");
		const endsWithExcludedExtension = excludedExtensionDeteminer.endsWithExcludedExtension("test/test.ts");
		expect(endsWithExcludedExtension).toBe(false);
	});
});