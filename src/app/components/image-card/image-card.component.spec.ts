import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImageCardComponent } from './image-card.component';
import { MatCardModule } from '@angular/material/card';
import { ImageModule } from '../image/image.module';

describe('Image card' , () => {
    let component: ImageCardComponent;
    let fixture: ComponentFixture<ImageCardComponent>;

    beforeEach(() => {
        return TestBed.configureTestingModule({
            imports: [
                MatCardModule,
                ImageModule
            ],
            declarations: [
                ImageCardComponent
            ]
        })
        .compileComponents();
    });

    beforeEach(async () => {
        fixture = TestBed.createComponent(ImageCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        await fixture.whenStable();
    });

    it('Can create without errors', () => {
        expect(component).toBeTruthy();
    });

    // TODO add more unit tests
});
