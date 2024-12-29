// Test to show that JS file is working
console.log("JavaScript is connected and working!");

// Dynamically gets the current year for the footer
const footer = document.querySelector("footer");
const year = new Date().getFullYear();
footer.textContent = `© ${year} Kennan deAngelo Gauthier`;

/*
//////////////////////////////////////////////////////////////////////////////////
//////////////////////// Contact-form submission message ////////////////////////
//////////////////////////////////////////////////////////////////////////////////
*/
const form = document.getElementById('contact-form');
const responseMessage = document.getElementById('response-message');

form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Gather form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
        // Send the form data to the server
        const response = await fetch(form.action, {
        method: form.method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        });

        const result = await response.json();

        if (response.ok) {
        // Show success message
        responseMessage.style.display = 'block';
        responseMessage.style.color = 'green';
        responseMessage.textContent = result.message;

        // Reset the form
        form.reset();
        } else {
        // Show error message
        responseMessage.style.display = 'block';
        responseMessage.style.color = 'red';
        responseMessage.textContent = result.message;
        }
    } catch (error) {
        // Handle network errors
        responseMessage.style.display = 'block';
        responseMessage.style.color = 'red';
        responseMessage.textContent = 'An error occurred. Please try again later.';
        console.error('Error:', error);
    }
});


/*
//////////////////////////////////////////////////////////////////////////////////
//////////////////////// Character counter ///////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
*/

const textarea = document.getElementById('contact-message');
const charCounter = document.getElementById('char-counter');
const maxLength = textarea.getAttribute('maxlength');

// Display initial counter
charCounter.textContent = `0 / ${maxLength} characters`;

// Update counter on input
textarea.addEventListener('input', () => {
  const currentLength = textarea.value.length;

  // Update the character counter text
  charCounter.textContent = `${currentLength} / ${maxLength} characters`;

  // Add warning class if nearing the limit
  if (currentLength >= maxLength * 0.9) {
    charCounter.classList.add('warning');
  } else {
    charCounter.classList.remove('warning');
  }
});




























