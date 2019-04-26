import { Component, Inject, OnInit, Optional } from '@angular/core';
import { RESPONSE } from '@nguniversal/express-engine/tokens';
import { Response } from 'express';

@Component({ templateUrl: './http-500.component.html' })
export class Http500Component implements OnInit {
  constructor(@Optional() @Inject(RESPONSE) private response: Response) {}

  ngOnInit(): void {
    this.setResponseStatus(500);
  }

  private setResponseStatus(statusCode: number): void {
    this.response.status(statusCode);
  }
}
