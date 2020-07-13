import { Component, OnInit, Input, ViewChild, Inject } from '@angular/core';
import { DishService } from '../services/dish.service';
import { Dish } from '../shared/dish';
import { switchMap } from 'rxjs/operators';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../shared/comment';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  providers: []
})
export class DishdetailComponent implements OnInit {
    
  @ViewChild('cform') commentFormDirective;

  commentForm: FormGroup;
  comment: Comment;
  dish: Dish;
  dishIds: string[];
  prev: string;
  next: string;
  date: string;

  formErrors = {
    'author': '',
    'comment': '',
  };

  validationMessages = {
    'author': {
      'required':  'Author Name is required.',
      },
    'comment': {
      'required':  'Comment is required.',
      },
  }
    
    constructor(private dishService: DishService,
      private route: ActivatedRoute,
      private location: Location,
      @Inject('baseURL') private baseURL,
      private fb: FormBuilder) {
        this.createForm();
        this.commentForm.patchValue({slider: '5'});
       }

    ngOnInit(): void {
      // Using Promises/Observables
      // const id = this.route.snapshot.params['id'];
      // Using Promises
      // this.dishService.getDish(id)
      //   .then(dish => this.dish = dish); 
      
      // Using Observables
      // this.dishService.getDish(id).subscribe(dish => this.dish = dish); 

      this.dishService.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
      this.route.params.pipe(switchMap((params: Params) => this.dishService.getDish(params['id'])))
        .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); });
    }

    setPrevNext(dishId: string) {
      const index = this.dishIds.indexOf(dishId);
      this.prev = this.dishIds[(this.dishIds.length + index-1) % this.dishIds.length];
      this.next = this.dishIds[(this.dishIds.length + index+1) % this.dishIds.length];
    }

    goBack (): void {
      this.location.back()
    }

    createForm() {
      this.commentForm = this.fb.group({
        author: ['', Validators.required],
        comment: ['', Validators.required],
        rating: '5'
        
      })
      
      this.commentForm.valueChanges.subscribe(data => this.onValueChanged(data));
      this.onValueChanged(); // (re)set validation messages now
    }

    onValueChanged(data?: any) {
      if (!this.commentForm) { return; }
      const form = this.commentForm;
      for (const field in this.formErrors) {
        if (this.formErrors.hasOwnProperty(field)) {
          // clear previous error message (if any)
          this.formErrors[field] = '';
          const control = form.get(field);
          if (control && control.dirty && !control.valid) {
            const messages = this.validationMessages[field];
            for (const key in control.errors) {
              if (control.errors.hasOwnProperty(key)) {
                this.formErrors[field] += messages[key] + ' ';
              }
            }
          }
        }
      }
    }

    onSubmit() {
      this.comment = this.commentForm.value;
      this.date = new Date().toISOString();
      this.comment.date = this.date
      this.dish.comments.push(this.comment)
      console.log(this.comment);
      this.commentForm.reset({
        author: '',
        comment: '',
      });      
      this.commentFormDirective.resetForm();
      this.commentForm.patchValue({rating: '5'});
    }

    get authorname() { return this.commentForm.get('author').value; }
    get comment_input() { return this.commentForm.get('comment').value; }
    get slider() { return this.commentForm.get('rating').value; }
}
