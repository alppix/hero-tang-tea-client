import { isPlatformServer } from '@angular/common';
import {
  Component,
  Inject,
  OnInit,
  Optional,
  PLATFORM_ID
} from '@angular/core';
import { RESPONSE } from '@nguniversal/express-engine/tokens';
import { Response } from 'express';

@Component({ templateUrl: './http-403.component.html' })
export class Http403Component implements OnInit {
  private readonly isPlatformServer: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    @Optional() @Inject(RESPONSE) private response: Response
  ) {
    this.isPlatformServer = isPlatformServer(platformId);
  }

  ngOnInit(): void {
    if (this.isPlatformServer) {
      this.setResponseStatus(403);
    }
  }

  /**
   * Set response status code.
   * @param statusCode - Status code.
   */
  private setResponseStatus(statusCode: number): void {
    this.response.status(statusCode);
  }
}
