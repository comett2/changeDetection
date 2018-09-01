import {
	AfterContentChecked,
	AfterContentInit,
	AfterViewChecked,
	AfterViewInit, ChangeDetectorRef,
	Component,
	DoCheck, ElementRef,
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
import { filter, takeUntil } from 'rxjs/operators';
import { LinkManager } from '../link/LinkManager';
import { Link } from '../link/Link';
import { DestroyService } from '../leftsidebar/destroy/DestroyService';
import { Card } from './Card';
import { Subject } from 'rxjs/Subject';

@Component({
	selector: 'regular-card',
	template: `
		<div #cardTitleContainer
			 class="card-container">
			<div class="events far fa-hand-pointer"
				 (click)="click()">

			</div>
			<div class="title">
				{{id}}
			</div>
			<card-creation-actions
					class="card-creation-actions"
					(action)="resolveAction($event)">
			</card-creation-actions>
		</div>

		<div class="cards-container"
			 [class.have-at-least-one-child]="cards.length > 0">
			<ng-container *ngFor="let card of cards">
				<regular-card *ngIf="card.type === 0"
							  [id]="card.id"
							  [parent]="cardTitleContainer">
				</regular-card>
				<onpush-card *ngIf="card.type === 1"
							 [id]="card.id"
							 [parent]="cardTitleContainer">
				</onpush-card>
			</ng-container>
		</div>

	`,
	styleUrls: [`Card.css`, `RegularCard.css`]
})
export class RegularCard implements OnInit, OnChanges, DoCheck, AfterViewInit, AfterViewChecked, AfterContentInit, AfterContentChecked {

	@ViewChild('cardTitleContainer') cardTitleContainer;
	// @ViewChildren(RegularCard) regularCards: QueryList<RegularCard>;
	// @ViewChildren(OnpushCardComponent) onpushCards: QueryList<OnpushCardComponent>;

	@Input()
	parent: any;

	@Input()
	id: any;

	cards: Array<Card> = [];
	id: number;

	private actualCycle: Cycle;
	private destroy$ = new Subject();
	private link: Link;

	constructor(private lifecycleHooksManagerService: LifecycleHooksManagerService,
				private lifecycleStreamManager: LifecycleStreamManager,
				private renderer: Renderer2,
				private changeDetectorRef: ChangeDetectorRef,
				private zone: NgZone,
				private elRef: ElementRef,
				private linkManager: LinkManager,
				private destroyService: DestroyService) {

		this.lifecycleStreamManager
			.onStackRelease()
			.pipe(
				filter((cycle: Cycle) => {
					return cycle.id === this.id;
				}),
				takeUntil(this.destroy$)
			)
			.subscribe((cycle: Cycle) => {
				if (this.lifecycleHooksManagerService.isActive(cycle.hookName)) {
					this.actualCycle = cycle;

					this.renderer.addClass(this.cardTitleContainer.nativeElement, cycle.hookName);
					this.zone.runOutsideAngular(() => {
						setTimeout(() => {
							this.renderer.removeClass(this.cardTitleContainer.nativeElement, cycle.hookName);
						}, 600);
					});
				}
			});

		this.destroyService
			.selectDestroy()
			.pipe(
				takeUntil(this.destroy$)
			)
			.subscribe((id: number) => {
				let indexToDelete = this.cards.findIndex((card: Card) => card.id === id);
				if (indexToDelete >= 0) {
					this.cards.splice(indexToDelete, 1);
					this.changeDetectorRef.detectChanges();
				}
			});
	}

	ngOnInit() {
		if (this.id === undefined) {
			this.id = this.lifecycleStreamManager.counter++;
		}
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
		if (this.parent) {
			this.link = new Link(this.parent, this.cardTitleContainer.nativeElement);
			this.linkManager.addLink(this.link);
		}
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
		this.destroy$.next();
		this.linkManager.removeLink(this.link);
	}

	click(): void {
		console.log('click');
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
		let id = this.lifecycleStreamManager.counter;
		this.lifecycleStreamManager.counter++;
		this.cards.push(new Card(id, CardType.DEFAULT));
	}

	private addOnPushCard(): void {
		let id = this.lifecycleStreamManager.counter;
		this.lifecycleStreamManager.counter++;
		this.cards.push(new Card(id, CardType.ONPUSH));
	}
}
