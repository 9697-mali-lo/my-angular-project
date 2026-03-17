import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectList } from '../../Projects/project-list/project-list';

// import { ProjectList } from './task-list';
ProjectList
describe('ProjectList', () => {
  let component: ProjectList;
  let fixture: ComponentFixture<ProjectList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
