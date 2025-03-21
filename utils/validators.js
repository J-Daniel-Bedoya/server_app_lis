/**
 * Validadores para direcciones IP y MAC
 */

const validateIPAddress = (ip) => {
  const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
  if (!ipv4Regex.test(ip)) return false;
  
  const parts = ip.split('.');
  return parts.every(part => {
    const num = parseInt(part, 10);
    return num >= 0 && num <= 255;
  });
};

const validateMACAddress = (mac) => {
  // Acepta formatos: XX:XX:XX:XX:XX:XX o XX-XX-XX-XX-XX-XX
  const macRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
  return macRegex.test(mac);
};

module.exports = {
  validateIPAddress,
  validateMACAddress
};
