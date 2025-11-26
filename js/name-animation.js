/**
 * Name glitch animation - creates a periodic glitch effect on the site name
 * The animation can be toggled via enableNameAnimation in the config
 */
document.addEventListener('DOMContentLoaded', function() {
  const nameElement = document.querySelector('.departure-mono-name');
  if (!nameElement) return;

  // Allow users to disable this via hugo.toml config
  const animationEnabled = window.enableNameAnimation !== false;
  if (!animationEnabled) return;

  const originalText = nameElement.textContent;
  // Greek letters give consistent width in monospace fonts, preventing layout shift
  const glitchChars = 'ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρστυφχψω';
  let glitchInterval = null;

  /**
   * Animates the name with a glitch effect for 3 seconds
   * Glitch intensity fades out over time to smoothly return to original text
   */
  function startGlitch() {
    // Clear any existing animation to prevent overlapping intervals
    if (glitchInterval) clearInterval(glitchInterval);

    let animationTime = 0;
    const animationDuration = 3000; // 3 second glitch effect

    glitchInterval = setInterval(() => {
      // Animation complete - restore original text and stop
      if (animationTime >= animationDuration) {
        clearInterval(glitchInterval);
        nameElement.textContent = originalText;
        return;
      }

      // Build the glitched text by randomly replacing characters
      let displayText = '';
      for (let i = 0; i < originalText.length; i++) {
        // Fade out the glitch effect as we approach the end
        const intensity = 1 - (animationTime / animationDuration);
        const shouldGlitch = Math.random() < 0.2 * intensity;

        if (shouldGlitch) {
          displayText += glitchChars[Math.floor(Math.random() * glitchChars.length)];
        } else {
          displayText += originalText[i];
        }
      }
      nameElement.textContent = displayText;

      animationTime += 300;
    }, 300);
  }

  // Trigger glitch animation every 15 seconds for that random cyber aesthetic
  setInterval(startGlitch, 15000);

  // Start the first glitch right away
  startGlitch();
});
