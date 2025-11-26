document.addEventListener('DOMContentLoaded', function() {
  const nameElement = document.querySelector('.departure-mono-name');
  const jobTitleElement = document.querySelector('.departure-mono-job-title');
  if (!nameElement) return;
  
  // Check if animation is enabled from hugo.toml
  const animationEnabled = window.enableNameAnimation !== false;
  if (!animationEnabled) return;
  
  const originalText = nameElement.textContent;
  const originalJobTitle = jobTitleElement ? jobTitleElement.textContent : '';
  // Use only characters that are guaranteed to be same width
  const glitchChars = 'ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρστυφχψω';
  let glitchInterval = null;
  
  function startGlitch() {
    let animationTime = 0;
    const animationDuration = 3000; // 3 second glitch effect
    
    glitchInterval = setInterval(() => {
      if (animationTime >= animationDuration) {
        clearInterval(glitchInterval);
        nameElement.textContent = originalText;
        return;
      }
      
      let displayText = '';
      for (let i = 0; i < originalText.length; i++) {
        // Reduce glitch intensity as animation progresses
        const intensity = 1 - (animationTime / animationDuration);
        if (Math.random() < 0.2 * intensity) {
          displayText += glitchChars[Math.floor(Math.random() * glitchChars.length)];
        } else {
          displayText += originalText[i];
        }
      }
      nameElement.textContent = displayText;
      
      animationTime += 300; // Update every 300ms (slower)
    }, 300);
  }
  
  // Start glitch every 15 seconds
  setInterval(startGlitch, 15000);
  
  // Start first glitch immediately
  startGlitch();
});
