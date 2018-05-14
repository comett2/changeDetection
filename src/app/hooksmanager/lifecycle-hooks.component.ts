import { Component, OnInit } from '@angular/core';
import { LifecycleHooksManagerService } from './lifecycle-hooks-manager.service';
import { Hook } from './Hook';

@Component({
	selector: 'lifecycle-hooks',
	template: `
		<div *ngFor="let hook of hooks"
			 (click)="toggle(hook)"
			 class="hook-with-label">
			<input *ngIf="!hook.enabled" type="checkbox"/>
			<input *ngIf="hook.enabled" type="checkbox" checked/>
			<div class="label">{{hook.name}}</div>
		</div>
	`,
	styles: [`
		:host {
			position: fixed;
			right: 0;
			top: 0;
			padding: 10px;
			border: 1px solid #ccc;
			background: white;
			z-index: 11;
			border-radius: 0 0 0 5px;
			box-shadow: -5px 6px 23px 0px rgba(0,0,0,0.75);
			font-family: "Comic Sans MS", cursive, sans-serif;
		}

		.hook-with-label {
			display: flex;
			align-items: center;
			cursor: pointer;
		}
	`]
})
export class LifecycleHooksComponent implements OnInit {

	hooks: Array<Hook>;

	constructor(private lifecycleHooksManagerService: LifecycleHooksManagerService) {
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
}
