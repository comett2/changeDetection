import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { LifecycleStreamManager } from '../../streammanager/LifecycleStreamManager';

@Component({
	selector: 'sp-player',
	templateUrl: `PlayerComponent.html`,
	styleUrls: [`PlayerComponent.css`],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerComponent implements OnInit {

	constructor(private streamManager: LifecycleStreamManager) {

	}

	ngOnInit() {

	}

	previous(): void {
		this.streamManager.previus();
	}

	next(): void {
		this.streamManager.next();
	}
}
