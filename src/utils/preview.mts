import termImg from 'term-img';
import sharp from 'sharp';
import { logger } from './logger.js';
import fetch from 'node-fetch';

export async function diplayPreview(previewUrls: string) {
  try {
    logger.info('Loading preview image... ⌚');
    const response = await fetch(previewUrls);
    const buffer = await response.buffer();

    const processedBuffer = await sharp(buffer)
      .resize({
        width: 120, // Adjust based on your needs
        height: 80,
        fit: 'inside',
        withoutEnlargement: true,
      })
      .toBuffer();

    termImg(buffer, {
      width: '25%',
      height: '25%',
      fallback: async () => {
        // Fallback to terminal-image if term-img fails
        // const terminalImage = (await import('terminal-image')).default;
        // console.log(
        //   await terminalImage.buffer(processedBuffer, {
        //     width: '100%',
        //     height: '100%',
        //   })
        // );
      },
    });
  } catch (error) {
    logger.error('Failed to load preview image');
    console.error(error);
  }
}
