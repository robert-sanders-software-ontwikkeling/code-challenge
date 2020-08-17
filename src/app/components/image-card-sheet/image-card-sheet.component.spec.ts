import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImageCardModule } from '../image-card/image-card.module';
import { ImageCardSheetComponent } from './image-card-sheet.component';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

describe('Image card sheet' , () => {
    let component: ImageCardSheetComponent;
    let fixture: ComponentFixture<ImageCardSheetComponent>;

    beforeEach(() => {
        return TestBed.configureTestingModule({
            imports: [
                ImageCardModule
            ],
            providers: [

                {
                    provide: MAT_BOTTOM_SHEET_DATA,
                    useValue: {}
                }

            ],
            declarations: [
                ImageCardSheetComponent
            ]
        })
        .compileComponents();
    });

    beforeEach(async () => {
        fixture = TestBed.createComponent(ImageCardSheetComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        await fixture.whenStable();
    });

    it('Can create without errors', () => {
        expect(component).toBeTruthy();
    });

    // TODO add more unit tests
});
