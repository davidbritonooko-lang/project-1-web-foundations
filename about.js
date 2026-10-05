const feedbackForm = document.querySelector('#feedback-form');
const feedbackStatus = document.querySelector('#feedback-status');

if (feedbackForm && feedbackStatus) {
  feedbackForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!feedbackForm.reportValidity()) return;

    const submitButton = feedbackForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Sending…';
    feedbackStatus.textContent = 'Sending your feedback…';
    feedbackStatus.classList.remove('form-status-error');

    try {
      const response = await fetch(feedbackForm.action, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(Object.fromEntries(new FormData(feedbackForm))),
      });
      const result = await response.json();

      if (!response.ok || result.success !== 'true' && result.success !== true) {
        throw new Error(result.message || 'The feedback service could not accept your message.');
      }

      feedbackForm.reset();
      feedbackStatus.textContent = 'Thanks for your feedback. Your message has been sent.';
    } catch (error) {
      console.error('Unable to send feedback:', error);
      feedbackStatus.textContent = 'We could not send your feedback. Please try again in a moment.';
      feedbackStatus.classList.add('form-status-error');
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
    }
  });
}
