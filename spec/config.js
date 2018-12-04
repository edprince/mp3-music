const config = {
  timeout: 16000,
  height: 600,
  width: 800,
  browserConfig: {
    headless: true,
    slowMo: 40,
    args: [`--window-size=${width},${height}`, '--disable-http2']
  }
}

module.exports = config;
