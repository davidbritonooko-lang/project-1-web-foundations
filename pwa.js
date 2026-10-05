const installButton = document.querySelector('#install-app-button');
const installStatus = document.querySelector('#install-status');
let installPrompt;

if ('serviceWorker' in navigator && window.isSecureContext) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js').catch((error) => {
      console.error('Unable to register the offline app worker:', error);
    });
  });
}

function isRunningAsInstalledApp() {
  return window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone === true;
}

if (installButton && installStatus) {
  const userAgent = navigator.userAgent;
  const isAppleMobile = /iPhone|iPad|iPod/.test(userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const isSafari = /Safari/.test(userAgent) && !/CriOS|FxiOS|EdgiOS|OPiOS/.test(userAgent);

  if (isRunningAsInstalledApp()) {
    installButton.hidden = true;
    installStatus.textContent = 'Quick Notes is installed on this device.';
  } else if (isAppleMobile) {
    installButton.hidden = true;
    installStatus.textContent = isSafari
      ? 'To install on iPhone or iPad, tap Share in Safari, then choose Add to Home Screen.'
      : 'To install on iPhone or iPad, open this page in Safari, tap Share, then choose Add to Home Screen.';
  } else {
    window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault();
      installPrompt = event;
      installButton.hidden = false;
      installStatus.textContent = 'Quick Notes is ready to install on this device.';
    });

    window.addEventListener('appinstalled', () => {
      installPrompt = null;
      installButton.hidden = true;
      installStatus.textContent = 'Quick Notes is installed on this device.';
    });

    installButton.addEventListener('click', async () => {
      if (!installPrompt) {
        installStatus.textContent = 'Use your browser menu and choose Install app or Add to Home Screen.';
        return;
      }

      installButton.disabled = true;
      try {
        await installPrompt.prompt();
        const choice = await installPrompt.userChoice;
        installStatus.textContent = choice.outcome === 'accepted'
          ? 'Quick Notes is being installed.'
          : 'Installation was cancelled. You can install it later from your browser menu.';
        installPrompt = null;
      } catch (error) {
        console.error('Unable to show the app installation prompt:', error);
        installStatus.textContent = 'The installation prompt could not be opened. Use your browser menu to install the app.';
      } finally {
        installButton.disabled = false;
      }
    });
  }
}
