const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const logger = require('../utils/logger');

class AudioService {
  constructor() {
    this.audioDir = path.join(process.cwd(), 'temp', 'audio');
    this.ensureAudioDirectory();
  }

  ensureAudioDirectory() {
    if (!fs.existsSync(this.audioDir)) {
      fs.mkdirSync(this.audioDir, { recursive: true });
    }
  }

  async saveAudio(buffer, extension = 'ogg') {
    const filename = `${uuidv4()}.${extension}`;
    const filepath = path.join(this.audioDir, filename);
    
    try {
      await fs.promises.writeFile(filepath, buffer);
      return filepath;
    } catch (error) {
      logger.error('Error saving audio file:', error);
      throw error;
    }
  }

  async convertToWav(inputPath) {
    const outputPath = inputPath.replace(/\.[^.]+$/, '.wav');
    
    return new Promise((resolve, reject) => {
      ffmpeg(inputPath)
        .toFormat('wav')
        .on('end', () => {
          fs.unlink(inputPath, (err) => {
            if (err) logger.error('Error deleting original audio file:', err);
          });
          resolve(outputPath);
        })
        .on('error', (error) => {
          logger.error('Error converting audio:', error);
          reject(error);
        })
        .save(outputPath);
    });
  }

  async cleanupFile(filepath) {
    try {
      await fs.promises.unlink(filepath);
    } catch (error) {
      logger.error('Error cleaning up audio file:', error);
    }
  }
}

module.exports = AudioService;