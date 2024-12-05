const logger = require('../utils/logger');

class DelayService {
  constructor() {
    this.baseTypingSpeed = 200; // caracteres por minuto
    this.minDelay = 1000; // 1 segundo
    this.maxDelay = 5000; // 5 segundos
  }

  calculateDelay(message, context = {}) {
    try {
      // Cálculo base baseado no comprimento da mensagem
      const characters = message.length;
      const baseDelay = (characters / this.baseTypingSpeed) * 60 * 1000;

      // Ajuste baseado no contexto
      let multiplier = 1;
      
      // Mensagens complexas ou técnicas levam mais tempo
      if (context.isComplexResponse) {
        multiplier *= 1.5;
      }

      // Respostas curtas ou confirmações são mais rápidas
      if (characters < 20) {
        multiplier *= 0.7;
      }

      // Adiciona variabilidade aleatória (90% a 110%)
      const randomFactor = Math.random() * 0.2 + 0.9;
      
      // Calcula delay final
      const finalDelay = baseDelay * multiplier * randomFactor;

      // Garante que o delay está dentro dos limites
      return Math.min(Math.max(finalDelay, this.minDelay), this.maxDelay);
    } catch (error) {
      logger.error('Error calculating delay:', error);
      return this.minDelay;
    }
  }

  async simulateTyping(client, to, duration) {
    try {
      await client.sendPresenceAvailable(to);
      await client.sendPresenceTyping(to);

      return new Promise(resolve => {
        setTimeout(async () => {
          await client.sendPresencePaused(to);
          resolve();
        }, duration);
      });
    } catch (error) {
      logger.error('Error simulating typing:', error);
      throw error;
    }
  }
}

module.exports = DelayService;