import { Component, Directive, EventEmitter, Output } from '@angular/core';
import { CardCreationEvent } from './CardCreationEvent';

@Component({
	selector: 'card-creation-actions',
	template: `
		<div #buttons
			 class="buttons">
			<button class="k-button regular fas fa-recycle"
					(click)="addDefaultCard()">
			</button>
			<button class="k-button onpush fas fa-hand-paper"
					(click)="addOnPushCard()">
			</button>
		</div>
	`,
	styles: [`
		.buttons {
			display: flex;
			justify-content: space-around;
		}

		.k-button {
			color: white;
			font-size: 14px;
			border-radius: 50%;
			height: 32px;
			width: 32px;
			cursor: pointer;
			box-shadow: -1px 1px 4px 0px rgba(0, 0, 0, 0.75);
		}

		.onpush {
			background: #c57792;
			border-color: #c57792;
		}

		.regular {
			background: #5a9445;
			border-color: #5a9445;
		}
	`]
})
export class CardCreationActionsComponent {

	@Output('action')
	action$: EventEmitter<CardCreationEvent> = new EventEmitter<CardCreationEvent>();

	constructor() {
	}

	addDefaultCard(): void {
		this.action$.emit(CardCreationEvent.NEW_DEFUALT);
	}

	addOnPushCard(): void {
		this.action$.emit(CardCreationEvent.NEW_ONPUSH);
	}
}
