import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImageComponent } from './image.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

describe('Image', () => {
    let component: ImageComponent;
    let fixture: ComponentFixture<ImageComponent>;

    beforeEach(() => {
        return TestBed.configureTestingModule({
            imports: [
                MatProgressSpinnerModule
            ],
            declarations: [
                ImageComponent
            ]
        })
        .compileComponents();
    });

    beforeEach(async () => {
        fixture = TestBed.createComponent(ImageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        await fixture.whenStable();
    });

    it('Can create without errors', () => {
        expect(component).toBeTruthy();
    });

    // TODO add more unit tests
});
