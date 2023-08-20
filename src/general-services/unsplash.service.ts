import { Injectable } from '@nestjs/common';
import { createApi } from 'unsplash-js';

@Injectable()
export class UnsplashService {
  private unsplash;

  constructor() {
    this.unsplash = createApi({
      accessKey: process.env.UNSPLASH_ACCESS,
      fetch: fetch,
    });
  }

  async getImage(): Promise<string | undefined> {
    try {
      const res: any = await this.unsplash.photos.getRandom({
        query: 'love',
      });
      console.log(res);
      if (res.type === 'success') {
        const photo = res.response.urls.small;
        return photo;
      }
    } catch (err) {
      throw err;
    }
  }
}
