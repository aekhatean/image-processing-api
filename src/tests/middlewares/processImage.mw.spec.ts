import path from 'path';

import {
  pathToImage,
  pathToThumbnail,
  imageExists,
  thumbnailDoesnotExist
} from '../../middlewares/processImage.mw';

describe('Test Image Processing process steps', (): void => {
  it('Should ensure every path is of string data type', (): void => {
    expect(pathToImage('fjord.jpg')).toBeInstanceOf(String);
    expect(pathToThumbnail('200-200-fjord.jpg')).toBeInstanceOf(String);
  });

  it('Should ensure every path is pointing to correct directory', (): void => {
    expect(pathToImage('fjord.jpg')).toContain(
      path.normalize(`/data/images/fjord.jpg`)
    );
    expect(pathToThumbnail('200-200-fjord.jpg')).toContain(
      path.normalize(`/data/thumbnails/200-200-fjord.jpg`)
    );
  });

  it('Should ensure checking for existance in data to be async', (): void => {
    expect(imageExists('fjord.jpg')).toBeInstanceOf(Promise);
    expect(thumbnailDoesnotExist('200-200-fjord.jpg')).toBeInstanceOf(Promise);
  });

  it('Should ensure checking for existance in data to return boolean evntually', async (done): Promise<void> => {
    expect(await imageExists('fjord.jpg')).toBeInstanceOf(Boolean);
    expect(await thumbnailDoesnotExist('200-200-fjord.jpg')).toBeInstanceOf(
      Boolean
    );
    done();
  });

  it('Should ensure checking for an existant image in data/ leads to finding it', async (done): Promise<void> => {
    expect(await imageExists('fjord.jpg')).toBeTrue();
    done();
  });

  it('Should ensure checking for a non-existant thumbnail in data/ to return true', async (done): Promise<void> => {
    expect(await thumbnailDoesnotExist('200-200-fjord.jpg')).toBeTrue();
    done();
  });
});
