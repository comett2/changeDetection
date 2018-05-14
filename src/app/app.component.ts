import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	template: `
		<lifecycle-hooks></lifecycle-hooks>
		<canvas id="canvas"
				class="canvas">
		</canvas>
		<regular-card class="root-card"></regular-card>

	`,
	styles: [`
		:host {
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.canvas {
			position: absolute;
		}

		.app-container {
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.root-card {
			z-index: 10;
		}
	`]
})
export class AppComponent {


}
