import { AfterViewInit, ChangeDetectorRef, Component, ComponentFactoryResolver, ComponentRef, OnDestroy, OnInit, Type, ViewChild } from '@angular/core';
import { DialogConfig } from '../dialog-config';
import { DialogRef } from '../dialog-ref';
import { InsertionDirective } from '../insertion.directive';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-diolouge-comp',
  templateUrl: './diolouge-comp.component.html',
  styleUrls: ['./diolouge-comp.component.css']
})
export class DiolougeCompComponent implements AfterViewInit, OnDestroy {
   componentRef: ComponentRef<any>;
  @ViewChild(InsertionDirective)
  insertionPoint: InsertionDirective;
    childComponentType: Type<any>;
    private readonly _onClose = new Subject<void>();
  public onClose = this._onClose.asObservable();
  constructor(
     private componentFactoryResolver: ComponentFactoryResolver,
    public config: DialogConfig,
    private cd: ChangeDetectorRef,
    private dialogRef: DialogRef
  ) { }


      ngAfterViewInit() {
    console.log(this.config);
    this.loadChildComponent(this.childComponentType);
    this.cd.detectChanges();
  }
    onOverlayClicked(evt: MouseEvent) {
    this.dialogRef.close();
  }

    onDialogClicked(evt: MouseEvent) {
    evt.stopPropagation();
  }

  loadChildComponent(componentType: Type<any>) {
    let componentFactory =
      this.componentFactoryResolver.resolveComponentFactory(componentType);

    let viewContainerRef = this.insertionPoint.viewContainerRef;
    viewContainerRef.clear();

    this.componentRef = viewContainerRef.createComponent(componentFactory);
  }
    ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

close() {
  this._onClose.next(); // works
}

}
