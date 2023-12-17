interface FirebaseCredentials {
  type: string;
  project_id: string;
  private_key_id: string;
  private_key: string;
  client_email: string;
  client_id: string;
  auth_uri: string;
  token_uri: string;
  auth_provider_x509_cert_url: string;
  client_x509_cert_url: string;
  universe_domain: string;
}

export const firebase_credentials = () => {
  const service_account = process.env['SERVICE_ACCOUNT'] + '';
  const credentials = JSON.parse(service_account) as FirebaseCredentials;
  credentials.private_key = credentials.private_key.replaceAll(/\\n/g, '\n');

  return credentials;
};
