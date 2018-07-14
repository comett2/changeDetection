import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-root',
	template: `
		
		<sp-left-sidebar></sp-left-sidebar>
		<canvas id="canvas"
				class="canvas">
		</canvas>
		<card-root class="root-card"></card-root>
		<sp-bottom-console></sp-bottom-console>
	`,
	styles: [`
		:host {
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			font-family: Arial;
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
