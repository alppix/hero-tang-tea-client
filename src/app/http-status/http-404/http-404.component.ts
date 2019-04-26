import { Component, Inject, OnInit, Optional } from '@angular/core';
import { RESPONSE } from '@nguniversal/express-engine/tokens';
import { Response } from 'express';

@Component({ templateUrl: './http-404.component.html' })
export class Http404Component implements OnInit {
  constructor(@Optional() @Inject(RESPONSE) private response: Response) {}

  ngOnInit(): void {
    this.setResponseStatus(404);
  }

  private setResponseStatus(statusCode: number): void {
    this.response.status(statusCode);
  }
}
