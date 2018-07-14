import { Injectable, NgZone } from '@angular/core';
import { Cycle } from './Cycle';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { LifecycleHooksManagerService } from '../leftsidebar/hooksmanager/lifecycle-hooks-manager.service';
import { CollectingTypeService } from '../leftsidebar/collectingstrategy/CollectingTypeService';
import { CollectingType } from '../leftsidebar/collectingstrategy/CollectingType';
import { DelayService } from '../leftsidebar/delay/DelayService';
import { DelayType } from '../leftsidebar/delay/DelayType';

@Injectable()
export class LifecycleStreamManager {

	counter = 0;
	private stack: Array<Cycle> = [];
	private stackReleaser$ = new ReplaySubject<Cycle>(1);
	private started = false;

	private releaseInProgress;
	private collectingType: CollectingType;

	private delayType: DelayType;
	private releaseIndex: number = 0; //refactor;

	constructor(private zone: NgZone,
				private lifecycleHooksManagerService: LifecycleHooksManagerService,
				private collectingTypeService: CollectingTypeService,
				private delayService: DelayService) {

		this.delayService
			.getDelayType()
			.subscribe((type: DelayType) => {
				this.delayType = type;
				this.stack = [];
			});

	}

	hookFired(cycle: Cycle) {
		if (!this.lifecycleHooksManagerService.isActive(cycle.hookName)) {
			return;
		}
		cycle.withTime(new Date());
		this.stack.push(cycle);
		if (this.collectingTypeService.isLive() && this.delayType === DelayType.TIME) {
			this.releaseStack();
		}
	}

	onStackRelease(): Observable<Cycle> {
		return this.stackReleaser$
				   .asObservable();
	}

	start() {
		this.zone.runOutsideAngular(() => {
			setTimeout(() => {
				this.started = true;
			}, 100);
		});
	}

	release(): void {
		this.releaseStack();
	}

	private releaseStack(): void {
		if (this.releaseInProgress) {
			return;
		}
		this.releaseInProgress = true;
		let releaseStackInterval = setInterval(() => {
			if (this.stack.length === 0) {
				clearInterval(releaseStackInterval);
				this.releaseInProgress = false;
				return;
			}
			this.stackReleaser$.next(this.stack[0]);
			this.stack = this.stack.slice(1);
		}, this.delayService.getDelay());
	}

	next(): void {
		this.stackReleaser$.next(this.stack[this.releaseIndex]);
		this.releaseIndex++;
	}

	previus(): void {
		this.releaseIndex--;
		this.stackReleaser$.next(this.stack[this.releaseIndex]);
	}
}