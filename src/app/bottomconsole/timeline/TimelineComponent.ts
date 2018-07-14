import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef, Renderer2 } from '@angular/core';
import { LifecycleStreamManager } from '../../streammanager/LifecycleStreamManager';
import { Cycle } from '../../streammanager/Cycle';

@Component({
	selector: 'sp-timeline',
	templateUrl: `TimelineComponent.html`,
	styleUrls: [`TimelineComponent.css`],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimelineComponent implements OnInit {


	cycles: Array<Cycle> = [];
	private availableSpace: number;

	constructor(private lifecycleStreamManager: LifecycleStreamManager,
				private changeDetectorRef: ChangeDetectorRef,
				private elementRef: ElementRef,
				private renderer: Renderer2) {

	}

	ngOnInit() {
		this.lifecycleStreamManager
			.onStackRelease()
			.subscribe((cycle: Cycle) => {
				this.cycles.push(cycle);
				this.changeDetectorRef.detectChanges();
				this.availableSpace = this.elementRef.nativeElement.offsetWidth - 50;
			});
	}
}
