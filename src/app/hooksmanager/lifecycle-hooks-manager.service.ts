import { Injectable } from '@angular/core';
import { Hook } from './Hook';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class LifecycleHooksManagerService {

	private hookNames: Array<string> = ['OnInit', 'OnChanges', 'DoCheck', 'AfterViewInit', 'AfterViewChecked', 'AfterContentInit', 'AfterContentChecked'];
	private hooks: Array<Hook> = [];
	private hooks$ = new ReplaySubject(1);

	constructor() {
		this.hookNames.forEach((hook: string) => {
			this.hooks.push(new Hook(hook, false));
		});
		this.hooks$.next(this.hooks);
	}

	getHooks(): Observable<Array<Hook>> {
		return this.hooks$;
	}

	toggleHook(hook: Hook): void {
		let hookIndex = this.hooks.indexOf(hook);
		this.hooks[hookIndex].enabled = !this.hooks[hookIndex].enabled;
		this.hooks$.next(this.hooks);
	}
}