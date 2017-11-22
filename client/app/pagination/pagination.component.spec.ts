import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationComponent } from './pagination.component';

import { By } from '@angular/platform-browser';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PaginationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    component.page = 1
    component.count = 40
    component.perPage = 10
    component.loading = false
    component.pagesToShow = 4
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Should display correct page counts', () => {
    const el = fixture.debugElement.query(By.css('.page-counts')).nativeElement
    expect(el.textContent).toBe(component.getMin() + ' - ' + component.getMax() + ' of ' + component.count + ' | ')
  })
  it('Should display total pages', () => {
    const el = fixture.debugElement.query(By.css('.page-totals')).nativeElement
    expect(el.textContent).toContain('4 pages | ')
  })
  it('Should show total number of pages', () => {
    const el = fixture.debugElement.queryAll(By.css('.description span'))[2].nativeElement
    expect(el.textContent).toContain('Current page: 1')
  })
  it('Should call prev function', () => {
    const el = fixture.debugElement.queryAll(By.css('.numbers button'))[0]
    spyOn(component, 'onPrev');
    el.triggerEventHandler('click', null)
    expect(component.onPrev).toHaveBeenCalled()
  })
  it('Should call next function', () => {
    const el = fixture.debugElement.queryAll(By.css('.numbers button'))[5]
    spyOn(component, 'onNext');
    el.triggerEventHandler('click', null)
    expect(component.onNext).toHaveBeenCalled()
  })
  it('Should call onPage with correct parameter', () => {
    const el = fixture.debugElement.queryAll(By.css('.numbers button'))[4]
    spyOn(component, 'onPage');
    el.triggerEventHandler('click', null)
    expect(component.onPage).toHaveBeenCalledWith(4)
  })
});
