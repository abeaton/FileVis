import NumberToNumberMap from "./NumberToNumberMap";

test("NumberToNumberMap constructor", () => {
	const numberToNumberMap = new NumberToNumberMap();
	expect(numberToNumberMap.getMap()).toEqual({});
});

test("NumberToNumberMap initializes key once and increments properly", () => {
	const numberToNumberMap = new NumberToNumberMap();
	expect(numberToNumberMap.getMap()).toEqual({});

	const key = 50;

	numberToNumberMap.incrementValueAtKey(key);
	
	expect(numberToNumberMap.getMap()[key]).toEqual(1);

	numberToNumberMap.incrementValueAtKey(key);
	expect(numberToNumberMap.getMap()[key]).toEqual(2);
});

test("NumberToNumberMap sets multiple keys correctly", () => {
	const numberToNumberMap = new NumberToNumberMap();

	numberToNumberMap.incrementValueAtKey(1);
	numberToNumberMap.incrementValueAtKey(3);
	numberToNumberMap.incrementValueAtKey(2);
	numberToNumberMap.incrementValueAtKey(5);
	numberToNumberMap.incrementValueAtKey(4);
	
	expect(numberToNumberMap.getMap()).toEqual({
		1: 1,
		2: 1,
		3: 1,
		4: 1,
		5: 1
	});
});