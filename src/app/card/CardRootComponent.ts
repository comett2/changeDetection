import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'card-root',
	template: `
		<regular-card class="root-card"></regular-card>
	`,
	styles: [`		
	`],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardRootComponent implements OnInit {

	constructor() {

	}

	ngOnInit() {

	}


}
