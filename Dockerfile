FROM node:18-slim

# Install system dependencies
RUN apt-get update && apt-get install -y \
    chromium \
    ffmpeg \
    python3 \
    python3-pip \
    && rm -rf /var/lib/apt/lists/*

# Create app directory
WORKDIR /app

# Install Python dependencies
COPY requirements.txt ./
RUN pip3 install -r requirements.txt

# Install app dependencies
COPY package*.json ./
RUN npm ci

# Bundle app source
COPY . .

# Create directory for temporary audio files
RUN mkdir -p temp/audio

EXPOSE 3000

CMD ["npm", "start"]