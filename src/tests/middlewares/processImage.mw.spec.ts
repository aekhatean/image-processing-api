import app from '../../index';
import supertest from 'supertest';

import {
  pathToImage,
  pathToThumbnail,
  imageExists,
  thumbnailDoesnotExist
} from '../../middlewares/processImage.mw';

describe('Test Image Processing process steps', () => {
  it('Should ensure every path is of string data type', () => {
    expect(pathToImage('fjord.jpg')).toBeInstanceOf(String);
    expect(pathToThumbnail('200-200-fjord.jpg')).toBeInstanceOf(String);
  });

  it('Should ensure every path is pointing to correct directory', () => {
    expect(pathToImage('fjord.jpg')).toContain(`/data/images/fjord.jpg`);
    expect(pathToThumbnail('200-200-fjord.jpg')).toContain(
      `/data/thumbnails/200-200-fjord.jpg`
    );
  });

  it('Should ensure checking for existance in data to be async', () => {
    expect(imageExists('fjord.jpg')).toBeInstanceOf(Promise);
    expect(thumbnailDoesnotExist('200-200-fjord.jpg')).toBeInstanceOf(Promise);
  });

  it('Should ensure checking for existance in data to return boolean evntually', async (done) => {
    expect(await imageExists('fjord.jpg')).toBeInstanceOf(Boolean);
    expect(await thumbnailDoesnotExist('200-200-fjord.jpg')).toBeInstanceOf(
      Boolean
    );
    done();
  });

  it('Should ensure checking for an existant image in data/ leads to finding it', async (done) => {
    expect(await imageExists('fjord.jpg')).toBeTrue();
    done();
  });

  it('Should ensure checking for a non-existant thumbnail in data/ to return true', async (done) => {
    expect(await thumbnailDoesnotExist('200-200-fjord.jpg')).toBeTrue();
    done();
  });
});
