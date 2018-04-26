import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	template: `
		<div class="app-container">
			<app-node [childrenNumber]="1"></app-node>
		</div>

	`,
	styles: [`
		.app-container {
			display: flex;
			align-items: center;
			justify-content: center;
		}
	`]
})
export class AppComponent {
	title = 'app';
}
