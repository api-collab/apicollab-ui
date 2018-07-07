import { TestBed } from '@angular/core/testing';
import { IframeSafePipe } from './iframe-safe.pipe';
import { DomSanitizer } from '@angular/platform-browser';

describe('IframeSafePipe', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DomSanitizer]
    });
  });
  it('create an instance', () => {
    let sanitizer: DomSanitizer;
    sanitizer = TestBed.get(DomSanitizer);
    const pipe = new IframeSafePipe(sanitizer as DomSanitizer);
    expect(pipe).toBeTruthy();
  });
});
