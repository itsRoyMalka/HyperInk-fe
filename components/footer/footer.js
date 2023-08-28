
document.addEventListener('DOMContentLoaded', async () => {
    try {

        const response = await fetch('components/footer/footer.html');

        // Check if the fetch was successful
        if (!response.ok) {
            throw new Error('Failed to load footer.html');
        }

        // Get the HTML content
        const navbarHtml = await response.text();

        // Insert the navbar HTML into the container element
        const navbarContainer = document.getElementById('footer-container');
        navbarContainer.innerHTML = navbarHtml;
    } catch (error) {
        console.error('An error occurred while loading the footer:', error);
    }
});
