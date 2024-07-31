document.getElementById('contentForm').addEventListener('submit', async function(event) {
    event.preventDefault();
  
    // Collect form data
    const ageRange = document.getElementById('ageRange').value;
    const gender = document.getElementById('gender').value;
    const location = document.getElementById('location').value;
    const medicationType = document.getElementById('medicationType').value;
    const studyDateRange = document.getElementById('studyDateRange').value;
    const keywords = document.getElementById('keywords').value;
  
    // Prepare data to send to the server
    const data = {
      ageRange,
      gender,
      location,
      medicationType,
      studyDateRange,
      keywords
    };

    // Show loading indicator
    document.getElementById('loading').style.display = 'block';
    document.getElementById('content-container').style.display = 'none';
  
    // Send the request to the server
    try {
      const response = await fetch('/generate-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }
  
      const result = await response.json();
      displayContent(result.text);
    } catch (error) {
      console.error('Error generating content:', error);
      displayContent('An error occurred while generating the content. Please try again.');
    }
});

function displayContent(content) {
    const generatedContentDiv = document.getElementById('generate-content-block');
    const loadingDiv = document.getElementById('loading');
    const contentContainer = document.getElementById('content-container');

    generatedContentDiv.innerHTML = content; 
    contentContainer.style.display = 'block'; 
    loadingDiv.style.display = 'none'; 

    generatedContentDiv.style.maxHeight = '300px'; 
    generatedContentDiv.style.overflowY = 'auto'; 
}
