# Guia de Boas Práticas de Codificação

## 1. Organização de Arquivos e Módulos

### 1.1. Estrutura de Diretórios
```
src/
├── services/
│   ├── whatsapp/
│   │   ├── index.js           # Exportação principal
│   │   ├── messageHandler.js  # Processamento de mensagens
│   │   ├── qrHandler.js       # Gerenciamento de QR Code
│   │   └── utils.js          # Utilitários específicos
│   └── appointment/
│       ├── index.js           # Exportação principal
│       ├── scheduler.js       # Lógica de agendamento
│       ├── validation.js      # Validações específicas
│       └── notifications.js   # Sistema de notificações
```

### 1.2. Exemplo de Separação de Responsabilidades

❌ Ruim (Arquivo muito grande):
```javascript
// appointmentService.js
class AppointmentService {
  async createAppointment() { /* ... */ }
  async validateAvailability() { /* ... */ }
  async sendConfirmation() { /* ... */ }
  async sendReminder() { /* ... */ }
  async reschedule() { /* ... */ }
  async cancel() { /* ... */ }
  // + 20 outros métodos
}
```

✅ Bom (Separado em módulos):
```javascript
// services/appointment/scheduler.js
class AppointmentScheduler {
  async createAppointment() { /* ... */ }
  async reschedule() { /* ... */ }
  async cancel() { /* ... */ }
}

// services/appointment/validation.js
class AppointmentValidator {
  async validateAvailability() { /* ... */ }
  async validateProcedureTime() { /* ... */ }
}

// services/appointment/notifications.js
class AppointmentNotifier {
  async sendConfirmation() { /* ... */ }
  async sendReminder() { /* ... */ }
}
```

## 2. Tratamento de Mensagens

### 2.1. Separação de Handlers por Tipo

```javascript
// services/whatsapp/handlers/audioHandler.js
class AudioHandler {
  async process(message) {
    const audio = await this.downloadAudio(message);
    const transcription = await this.transcribe(audio);
    return transcription;
  }
}

// services/whatsapp/handlers/procedureHandler.js
class ProcedureHandler {
  async process(message) {
    const procedure = await this.identifyProcedure(message);
    const info = await this.getProcedureInfo(procedure);
    return this.formatResponse(info);
  }
}
```

### 2.2. Utilização de Serviços Especializados

```javascript
// services/lead/segmentation.js
class LeadSegmentation {
  async segmentByInterest(message) {
    const interests = await this.extractInterests(message);
    return this.categorize(interests);
  }

  async categorize(interests) {
    return {
      primaryInterest: this.getPrimaryInterest(interests),
      categories: this.getCategories(interests),
      priority: this.calculatePriority(interests)
    };
  }
}
```

## 3. Utilitários Reutilizáveis

### 3.1. Formatação de Mensagens

```javascript
// utils/messageFormatter.js
class MessageFormatter {
  static formatProcedureInfo(procedure) {
    return `
      *${procedure.name}*
      
      📝 Descrição: ${procedure.description}
      ⏱️ Duração: ${procedure.duration}
      💰 Investimento: ${this.formatPrice(procedure.price)}
      
      ℹ️ ${procedure.additionalInfo}
    `.trim();
  }

  static formatPrice(price) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  }
}
```

### 3.2. Validações Comuns

```javascript
// utils/validators.js
class Validators {
  static isValidPhoneNumber(phone) {
    return /^(\+55|0)?\d{2}9?\d{8}$/.test(phone);
  }

  static isBusinessHours() {
    const now = new Date();
    const hour = now.getHours();
    return hour >= 8 && hour < 18;
  }
}
```

## 4. Gerenciamento de Estado

### 4.1. Uso de Classes para Contexto

```javascript
// services/conversation/context.js
class ConversationContext {
  constructor() {
    this.state = new Map();
  }

  setContext(userId, context) {
    this.state.set(userId, {
      ...this.getContext(userId),
      ...context,
      updatedAt: new Date()
    });
  }

  getContext(userId) {
    return this.state.get(userId) || {};
  }

  clearContext(userId) {
    this.state.delete(userId);
  }
}
```

### 4.2. Gerenciamento de Sessão

```javascript
// services/session/manager.js
class SessionManager {
  constructor() {
    this.sessions = new Map();
    this.timeouts = new Map();
  }

  startSession(userId) {
    this.sessions.set(userId, {
      startedAt: new Date(),
      lastActivity: new Date()
    });
    this.setSessionTimeout(userId);
  }

  updateActivity(userId) {
    const session = this.sessions.get(userId);
    if (session) {
      session.lastActivity = new Date();
      this.resetSessionTimeout(userId);
    }
  }

  setSessionTimeout(userId) {
    const timeout = setTimeout(() => {
      this.endSession(userId);
    }, 30 * 60 * 1000); // 30 minutos
    this.timeouts.set(userId, timeout);
  }
}
```

## 5. Tratamento de Erros

### 5.1. Classes de Erro Personalizadas

```javascript
// errors/AppointmentError.js
class AppointmentError extends Error {
  constructor(message, code) {
    super(message);
    this.name = 'AppointmentError';
    this.code = code;
  }
}

// errors/ValidationError.js
class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
  }
}
```

### 5.2. Middleware de Erro

```javascript
// middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
  if (err instanceof AppointmentError) {
    return res.status(400).json({
      error: err.message,
      code: err.code
    });
  }

  if (err instanceof ValidationError) {
    return res.status(422).json({
      error: err.message,
      field: err.field
    });
  }

  // Log erro não esperado
  logger.error('Unexpected error:', err);
  res.status(500).json({
    error: 'Ocorreu um erro inesperado'
  });
};
```

## 6. Testes

### 6.1. Testes Unitários

```javascript
// tests/services/appointment/validation.test.js
describe('AppointmentValidator', () => {
  let validator;

  beforeEach(() => {
    validator = new AppointmentValidator();
  });

  describe('validateAvailability', () => {
    it('should return true for available slot', async () => {
      const date = new Date('2024-01-01T10:00:00');
      const result = await validator.validateAvailability(date);
      expect(result).toBe(true);
    });

    it('should return false for unavailable slot', async () => {
      const date = new Date('2024-01-01T10:00:00');
      // Simular agendamento existente
      await createAppointment(date);
      const result = await validator.validateAvailability(date);
      expect(result).toBe(false);
    });
  });
});
```

### 6.2. Mocks para Testes

```javascript
// tests/mocks/whatsapp.js
class WhatsAppClientMock {
  constructor() {
    this.messages = [];
    this.status = 'disconnected';
  }

  async sendMessage(to, content) {
    this.messages.push({ to, content });
    return { id: Date.now() };
  }

  async connect() {
    this.status = 'connected';
  }

  async disconnect() {
    this.status = 'disconnected';
  }
}
```

## 7. Documentação

### 7.1. Documentação de API

```javascript
/**
 * Cria um novo agendamento
 * @param {Object} appointmentData Dados do agendamento
 * @param {string} appointmentData.clientId ID do cliente
 * @param {string} appointmentData.procedureId ID do procedimento
 * @param {Date} appointmentData.date Data e hora do agendamento
 * @returns {Promise<Object>} Agendamento criado
 * @throws {ValidationError} Se os dados forem inválidos
 * @throws {AppointmentError} Se houver conflito de horário
 */
async createAppointment(appointmentData) {
  // Implementação
}
```

### 7.2. Comentários em Código Complexo

```javascript
// Implementa o algoritmo de Levenshtein para encontrar procedimentos
// similares quando o cliente digita com erro de digitação
function findSimilarProcedure(input, procedures) {
  const distances = procedures.map(proc => ({
    procedure: proc,
    distance: levenshteinDistance(input, proc.name)
  }));

  // Ordena por distância e retorna os mais próximos
  return distances
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 3)
    .map(d => d.procedure);
}
```