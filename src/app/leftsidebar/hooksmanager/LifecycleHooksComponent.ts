import { Component, NgZone, OnInit } from '@angular/core';
import { LifecycleHooksManagerService } from './lifecycle-hooks-manager.service';
import { Hook } from './Hook';
import { LifecycleStreamManager } from '../../streammanager/LifecycleStreamManager';

@Component({
	selector: 'lifecycle-hooks',
	templateUrl: `./LifecycleHooksComponent.html`,
	styles: [`

		.hook-with-label {
			display: flex;
			padding: 0 0 10px 0;
			align-items: center;
			cursor: pointer;
		}

		.label {
			margin-left: 5px;
		}

		.hook-color {
			width: 18px;
			height: 18px;
			border-radius: 100%;
			margin-left: 10px;
			border: 1px solid #ccc;
		}
	`]
})
export class LifecycleHooksComponent implements OnInit {

	hooks: Array<Hook>;
	label = 'Lifecycle hooks';

	constructor(private lifecycleHooksManagerService: LifecycleHooksManagerService,
				private lifecycleStreamManager: LifecycleStreamManager,
				private zone: NgZone) {
	}

	ngOnInit() {
		this.lifecycleHooksManagerService.getHooks()
			.subscribe((hooks: Array<Hook>) => {
				this.hooks = hooks;
			});
	}

	toggle(hook: Hook): void {
		this.lifecycleHooksManagerService.toggleHook(hook);
	}

	start(): void {
		this.zone.runOutsideAngular(() => {
			this.lifecycleStreamManager.start();
		});
	}
}
