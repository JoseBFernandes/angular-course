import { COURSES } from 'src/db-data';
import { CoursesService } from '../courses.service';
import { HighlightedDirective } from './highlighted.directive';

describe('HighlightedDirective', () => {
  it('should create an instance', () => {
    const directive = new HighlightedDirective();
    expect(directive).toBeTruthy();
  });
});
