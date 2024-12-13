const twilio = require("twilio");
const dotenv = require("dotenv");

// Załaduj zmienne środowiskowe
dotenv.config();

// Walidacja wymaganych zmiennych środowiskowych
const requiredEnvVars = [
  'TWILIO_ACCOUNT_SID',
  'TWILIO_AUTH_TOKEN',
  'TWILIO_PHONE_NUMBER'
];

requiredEnvVars.forEach(varName => {
  if (!process.env[varName]) {
    throw new Error(`Brak wymaganej zmiennej środowiskowej: ${varName}`);
  }
});

const twilioConfig = {
  accountSid: process.env.TWILIO_ACCOUNT_SID,
  authToken: process.env.TWILIO_AUTH_TOKEN,
  phoneNumber: process.env.TWILIO_PHONE_NUMBER
};

const client = twilio(twilioConfig.accountSid, twilioConfig.authToken);

/**
 * Wysyła SMS używając Twilio
 * @param {string} to - Numer telefonu odbiorcy
 * @param {string} message - Treść wiadomości
 * @returns {Promise} Promise z rezultatem wysłania
 */
const sendSms = async (to, message) => {
  try {
    // Walidacja numeru telefonu
    const validatedNumber = await client.lookups.v1
      .phoneNumbers(to)
      .fetch({ countryCode: 'PL' });

    // Wysłanie wiadomości
    const result = await client.messages.create({
      body: message,
      from: twilioConfig.phoneNumber,
      to: validatedNumber.phoneNumber,
      statusCallback: process.env.TWILIO_STATUS_CALLBACK_URL
    });

    return result;
  } catch (error) {
    console.error('Błąd podczas wysyłania SMS:', error);
    throw new Error('Nie udało się wysłać wiadomości SMS');
  }
};

module.exports = {
  sendSms,
  twilioClient: client
};
