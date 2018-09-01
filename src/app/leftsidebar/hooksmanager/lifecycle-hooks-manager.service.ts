import { Injectable } from '@angular/core';
import { Hook } from './Hook';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class LifecycleHooksManagerService {

	private hooks: Array<Hook> = [
		new Hook('OnInit', false, '#afff4b'),
		new Hook('OnDestroy', false, 'red'),
		new Hook('OnChanges', false, '#ffaf31'),
		new Hook('DoCheck', false, '#00d8ff'),
		new Hook('AfterViewInit', false, '#c989ff'),
		new Hook('AfterViewChecked', false, '#ff7f65'),
		new Hook('AfterContentInit', false, '#ffc907'),
		new Hook('AfterContentChecked', false, '#0505ff')];
	private hooks$ = new ReplaySubject<Array<Hook>>(1);

	constructor() {
		this.hooks$.next(this.hooks);
	}

	getHooks(): Observable<Array<Hook>> {
		return this.hooks$.asObservable();
	}

	toggleHook(hook: Hook): void {
		let hookIndex = this.hooks.indexOf(hook);
		this.hooks[hookIndex].enabled = !this.hooks[hookIndex].enabled;
		this.hooks$.next(this.hooks);
	}

	isActive(hookName: string): boolean {
		let find = this.hooks.find((hook: Hook) => hook.name === hookName);
		return find.enabled;
	}
}