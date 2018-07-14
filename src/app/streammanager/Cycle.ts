import { Hook } from '../leftsidebar/hooksmanager/Hook';

export class Cycle {
	private date: Date;

	constructor(public id: number,
				public hookName: string) {
	}

	withTime(date: Date): Cycle {
		this.date = date;
		return this;
	}
}