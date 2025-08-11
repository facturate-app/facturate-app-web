import { useEffect } from 'react';

const GoogleLogin = ({ clientId, onSuccess, onError }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: (response) => {
          if (response.credential) {
            onSuccess(response.credential); // idToken
          } else {
            onError?.('No credential returned');
          }
        },
      });

      // Renderiza el botón de Google dentro del div con ID "google-button"
      window.google.accounts.id.renderButton(
        document.getElementById('google-button'),
        {
          theme: 'outline',
          size: 'large',
          type: 'standard',
        }
      );
    };
    document.body.appendChild(script);
  }, []);

  return <div id="google-button" />;
};

export default GoogleLogin;
