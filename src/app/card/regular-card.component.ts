import {
	AfterContentChecked,
	AfterContentInit,
	AfterViewChecked,
	AfterViewInit, ChangeDetectorRef,
	Component,
	DoCheck,
	Input, NgZone, OnChanges,
	OnInit,
	QueryList, Renderer2,
	ViewChild,
	ViewChildren
} from '@angular/core';
import { CardType } from './CardType';
import { OnpushCardComponent } from './onpush-card.component';
import { CardCreationEvent } from './cardcreationactions/CardCreationEvent';
import { LifecycleHooksManagerService } from '../leftsidebar/hooksmanager/lifecycle-hooks-manager.service';
import { Hook } from '../leftsidebar/hooksmanager/Hook';
import { LifecycleStreamManager } from '../streammanager/LifecycleStreamManager';
import { Cycle } from '../streammanager/Cycle';
import { filter } from 'rxjs/operators';

@Component({
	selector: 'regular-card',
	template: `
		<div class="card-container">
			<div class="events far fa-hand-pointer"
				(click)="click()">
				
			</div>
			<div #cardTitleContainer
				 class="title">
				default {{id}}
			</div>
			<card-creation-actions
					class="card-creation-actions"
					(action)="resolveAction($event)">
			</card-creation-actions>
		</div>

		<div class="cards-container"
			 [class.have-at-least-one-child]="cards.length > 0">
			<ng-container *ngFor="let cardType of cards">
				<regular-card *ngIf="cardType === 0"></regular-card>
				<onpush-card *ngIf="cardType === 1"></onpush-card>
			</ng-container>
		</div>

	`,
	styleUrls: [`Card.css`, `RegularCard.css`]
})
export class RegularCard implements OnInit, OnChanges, DoCheck, AfterViewInit, AfterViewChecked, AfterContentInit, AfterContentChecked {

	@ViewChild('cardTitleContainer') cardTitleContainer;
	// @ViewChildren(RegularCard) regularCards: QueryList<RegularCard>;
	// @ViewChildren(OnpushCardComponent) onpushCards: QueryList<OnpushCardComponent>;

	cards: Array<CardType> = [];
	id: number;
	private actualCycle: Cycle;

	constructor(private lifecycleHooksManagerService: LifecycleHooksManagerService,
				private lifecycleStreamManager: LifecycleStreamManager,
				private renderer: Renderer2,
				private changeDetectorRef: ChangeDetectorRef,
				private zone: NgZone) {

		this.id = lifecycleStreamManager.counter + 1;
		lifecycleStreamManager.counter ++;

		this.lifecycleStreamManager
			.onStackRelease()
			.pipe(
				filter((cycle: Cycle) => {
					return cycle.id === this.id;
				})
			)
			.subscribe((cycle: Cycle) => {
				if (this.lifecycleHooksManagerService.isActive(cycle.hookName)) {
					this.actualCycle = cycle;

					this.renderer.addClass(this.cardTitleContainer.nativeElement, cycle.hookName);
					this.zone.runOutsideAngular(() => {
						setTimeout(() => {
							this.renderer.removeClass(this.cardTitleContainer.nativeElement, cycle.hookName);
						}, 600)
					});
				}
			});
	}

	ngOnInit() {
		if (this.lifecycleHooksManagerService.isActive('OnInit')) {
			this.lifecycleStreamManager.hookFired(new Cycle(this.id, 'OnInit'));
		}
	}

	ngOnChanges() {
		if (this.lifecycleHooksManagerService.isActive('OnChanges')) {
			this.lifecycleStreamManager.hookFired(new Cycle(this.id, 'OnChanges'));
		}
	}

	ngDoCheck() {
		if (this.lifecycleHooksManagerService.isActive('DoCheck')) {
			this.lifecycleStreamManager.hookFired(new Cycle(this.id, 'DoCheck'));
		}
	}

	ngAfterContentInit() {
		if (this.lifecycleHooksManagerService.isActive('AfterContentInit')) {
			this.lifecycleStreamManager.hookFired(new Cycle(this.id, 'AfterContentInit'));
		}
	}

	ngAfterContentChecked() {
		if (this.lifecycleHooksManagerService.isActive('AfterContentChecked')) {
			this.lifecycleStreamManager.hookFired(new Cycle(this.id, 'AfterContentChecked'));
		}
	}

	ngAfterViewInit() {
		if (this.lifecycleHooksManagerService.isActive('AfterViewInit')) {
			this.lifecycleStreamManager.hookFired(new Cycle(this.id, 'AfterViewInit'));
		}
	}

	ngAfterViewChecked() {
		if (this.lifecycleHooksManagerService.isActive('AfterViewChecked')) {
			this.lifecycleStreamManager.hookFired(new Cycle(this.id, 'AfterViewChecked'));
		}
	}

	ngOnDestroy() {
		if (this.lifecycleHooksManagerService.isActive('OnDestroy')) {
			this.lifecycleStreamManager.hookFired(new Cycle(this.id, 'OnDestroy'));
		}
	}

	click(): void {
		console.log('click')
	}

	resolveAction(event: CardCreationEvent) {
		if (event === CardCreationEvent.NEW_ONPUSH) {
			this.addOnPushCard();
		} else if (event === CardCreationEvent.NEW_DEFUALT) {
			this.addDefaultCard();
		} else if (event === CardCreationEvent.DELETE) {
			// this.remove()
		}
	}

	private addDefaultCard(): void {
		this.cards.push(CardType.DEFAULT);
	}

	private addOnPushCard(): void {
		this.cards.push(CardType.ONPUSH);
	}
}
