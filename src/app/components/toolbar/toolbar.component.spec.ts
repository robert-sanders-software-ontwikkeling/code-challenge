import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SearchModule } from '../search/search.module';
import { ToolbarComponent } from './toolbar.component';


describe('Toolbar', () => {
    let component: ToolbarComponent;
    let fixture: ComponentFixture<ToolbarComponent>;

    beforeEach(() => {
        return TestBed.configureTestingModule({
            imports: [
                FormsModule,
                MatToolbarModule,
                MatSelectModule,
                SearchModule
            ],
            declarations: [
                ToolbarComponent
            ]
        })
        .compileComponents();
    });

    beforeEach(async () => {
        fixture = TestBed.createComponent(ToolbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        await fixture.whenStable();
    });

    it('Can create without errors', () => {
        expect(component).toBeTruthy();
    });

    // TODO add more unit tests
});
