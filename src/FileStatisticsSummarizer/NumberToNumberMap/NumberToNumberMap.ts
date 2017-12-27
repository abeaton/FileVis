import * as _ from "lodash";

export interface NumberToNumberMap {
	[key: number]: number 
}

export default class NumberToNumberMapAccessor {
	private map: { [key: number]: number };

	constructor(){
		this.map = {};
	}

	public getMap(): NumberToNumberMap {
		return this.map;
	}

	private tryInitializeKeyToZero(key: number) {
		if(!_.has(this.map, key)){
			this.map[key] = 0;
		}
	}

	public incrementValueAtKey(key: number) {
		this.tryInitializeKeyToZero(key);
		this.map[key]++;
	}
}