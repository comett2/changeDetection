import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DestroyService } from './DestroyService';

@Component({
	selector: 'sp-destroy',
	templateUrl: `DestroyComponent.html`,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DestroyComponent implements OnInit {

	label: 'Destroy Component';

	id: number;

	constructor(private destroyService: DestroyService) {

	}

	ngOnInit() {

	}

	destroy() {
		this.destroyService.destroy(this.id);
	}
}
