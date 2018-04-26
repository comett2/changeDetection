import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-node',
	template: `
		<div class="node-container">
			<div class="root-node-container">
				<button>
					Action!
				</button>
			</div>

			<ng-container *ngIf="childrenNumber < maxChildren">
				<app-node *ngFor="let child of childrenNumber"
						[childrenNumber]="++childrenNumber">
				</app-node>
			</ng-container>
		</div>
	`,
	styleUrls: [
		`./node.component.css`
	]
})
export class NodeComponent implements OnInit {

	@Input()
	childrenNumber: number;

	maxChildren = 3;

	constructor() {
	}

	ngOnInit() {
	}

	ngOnChanges() {

	}
}
