import {
	AfterContentChecked,
	AfterContentInit,
	AfterViewChecked,
	AfterViewInit,
	Component,
	DoCheck,
	Input, OnChanges,
	OnInit,
	QueryList,
	ViewChild,
	ViewChildren
} from '@angular/core';
import { CardType } from './CardType';
import { OnpushCardComponent } from './onpush-card.component';

@Component({
	selector: 'regular-card',
	template: `		
		REGULAR
		<div #buttons
			 class="buttons">
			<button class="k-button regular fab fa-angellist"
					(click)="addDefaultCard()">
			</button>
			<button class="k-button onpush fas fa-ambulance"
					(click)="addOnPushCard()">
			</button>
		</div>
		<div class="cards-container"
			 [class.have-at-least-one-child]="cards.length > 0">
			<ng-container *ngFor="let cardType of cards">
				<regular-card *ngIf="cardType === 0"></regular-card>
				<onpush-card *ngIf="cardType === 1"></onpush-card>
			</ng-container>
		</div>

	`,
	styles: [`
		:host {
			display: flex;
			align-items: center;
			flex-direction: column;
			padding-left: 10px;
			padding-right: 10px;
			border: 1px solid #ccc;
			border-radius: 5px;
		}

		regular-card {
			margin-right: 10px;
		}

		onpush-card {
			margin-right: 10px;
		}

		regular-card:last-of-type {
			margin-right: 0;
		}

		onpush-card:last-of-type {
			margin-right: 0;
		}

		.have-at-least-one-child {
			padding-bottom: 10px;
		}

		.cards-container {
			display: flex;
			margin-top: 20px;
			justify-content: space-around;
		}

		.k-button {
			height: 30px;
			color: white;
			font-size: 16px;
			border-radius: 6px;
			border-color: black;
		}

		.onpush {
			background: #c57792;
		}

		.regular {
			background: #5a9445;
		}
	`]
})
export class RegularCard implements OnInit, OnChanges, DoCheck, AfterViewInit, AfterViewChecked, AfterContentInit, AfterContentChecked {

	// @ViewChild('buttons') buttons;
	// @ViewChildren(RegularCard) regularCards: QueryList<RegularCard>;
	// @ViewChildren(OnpushCardComponent) onpushCards: QueryList<OnpushCardComponent>;

	cards: Array<CardType> = [];

	constructor() {
	}

	ngOnInit() {
	}

	ngOnChanges() {
	}

	ngDoCheck() {
	}

	ngAfterContentInit() {
	}

	ngAfterContentChecked() {
	}

	ngAfterViewInit() {
	}

	ngAfterViewChecked() {
	}

	ngOnDestroy() {
	}

	addDefaultCard() {
		this.cards.push(CardType.DEFAULT);
		// this.drawLine();
	}

	addOnPushCard() {
		this.cards.push(CardType.ONPUSH);
		// this.drawLine();
	}

	drawLine() {
		// var canvas = document.getElementById('canvas');
		// var ctx = canvas.getContext('2d');
		// ctx.beginPath();
		// ctx.moveTo(50, 50);
		// ctx.lineTo(100, 100);
		// ctx.stroke();
		//
		// setTimeout(() => {
		// 	ctx.clearRect(0, 0, canvas.width, canvas.height);
		// }, 3000)
	}
}
